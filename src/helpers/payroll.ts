import {
	ISR_SCALE_2026,
	ISRBracket,
	TSS_CAP_MULTIPLIERS,
	TSS_MINIMUM_WAGE,
	TSS_RATES,
} from '@/constants/payroll.constant'
import { DrUtilsError } from '@/errors/dr-utils-error'

export interface TSSOptions {
	/** Salario mínimo cotizable used for the caps. Defaults to `TSS_MINIMUM_WAGE`. */
	minimumWage?: number
	/** Employer occupational-risk (SRL) rate for the company's risk class. Defaults to 0.011 (1.10%). */
	srlRate?: number
}

export interface TSSBreakdown {
	/** Withheld from the employee's salary. */
	employee: { afp: number; sfs: number; total: number }
	/** Paid by the employer on top of the salary. */
	employer: { afp: number; sfs: number; srl: number; total: number }
}

export interface NetSalaryOptions extends TSSOptions {
	/** ISR scale to apply. Defaults to `ISR_SCALE_2026`. */
	isrScale?: readonly ISRBracket[]
}

export interface NetSalaryBreakdown {
	gross: number
	afp: number
	sfs: number
	/** Monthly ISR withholding. */
	isr: number
	totalDeductions: number
	net: number
}

function round2(n: number): number {
	return Math.round(n * 100) / 100
}

function assertAmount(value: number, name: string): void {
	if (!Number.isFinite(value) || value < 0)
		throw new DrUtilsError(
			'PAYROLL_INVALID_AMOUNT',
			`${name} must be a finite, non-negative number.`,
		)
}

function assertOption(value: number, name: string): void {
	if (!Number.isFinite(value) || value < 0)
		throw new DrUtilsError(
			'PAYROLL_INVALID_OPTION',
			`${name} must be a finite, non-negative number.`,
		)
}

/**
 * Calculates the monthly TSS (social security) contributions for a salary, applying the
 * contribution caps (AFP 20×, SFS 10×, SRL 4× the minimum contributory wage).
 * @param monthlySalary {number} gross monthly salary in DOP
 * @param options {TSSOptions} override the minimum wage or the employer SRL rate
 * @returns {TSSBreakdown} employee deductions and employer contributions, rounded to cents
 * @throws {DrUtilsError} if `monthlySalary` or an option is negative or not finite
 */
export function calculateTSS(monthlySalary: number, options: TSSOptions = {}): TSSBreakdown {
	const { minimumWage = TSS_MINIMUM_WAGE, srlRate = TSS_RATES.employer.srl } = options
	assertAmount(monthlySalary, 'monthlySalary')
	assertOption(minimumWage, 'minimumWage')
	assertOption(srlRate, 'srlRate')

	const afpBase = Math.min(monthlySalary, minimumWage * TSS_CAP_MULTIPLIERS.afp)
	const sfsBase = Math.min(monthlySalary, minimumWage * TSS_CAP_MULTIPLIERS.sfs)
	const srlBase = Math.min(monthlySalary, minimumWage * TSS_CAP_MULTIPLIERS.srl)

	const employeeAfp = round2(afpBase * TSS_RATES.employee.afp)
	const employeeSfs = round2(sfsBase * TSS_RATES.employee.sfs)
	const employerAfp = round2(afpBase * TSS_RATES.employer.afp)
	const employerSfs = round2(sfsBase * TSS_RATES.employer.sfs)
	const employerSrl = round2(srlBase * srlRate)

	return {
		employee: {
			afp: employeeAfp,
			sfs: employeeSfs,
			total: round2(employeeAfp + employeeSfs),
		},
		employer: {
			afp: employerAfp,
			sfs: employerSfs,
			srl: employerSrl,
			total: round2(employerAfp + employerSfs + employerSrl),
		},
	}
}

/**
 * Calculates the annual income tax (ISR) owed on an annual taxable income.
 * @param annualTaxableIncome {number} annual income after TSS deductions, in DOP
 * @param scale {readonly ISRBracket[]} brackets sorted by `over`. Defaults to `ISR_SCALE_2026`.
 * @returns {number} annual ISR rounded to cents (0 if the income is exempt)
 * @throws {DrUtilsError} if `annualTaxableIncome` is negative or not finite
 */
export function calculateISR(
	annualTaxableIncome: number,
	scale: readonly ISRBracket[] = ISR_SCALE_2026,
): number {
	assertAmount(annualTaxableIncome, 'annualTaxableIncome')

	for (let i = scale.length - 1; i >= 0; i--) {
		const bracket = scale[i]!
		if (annualTaxableIncome > bracket.over) {
			return round2(bracket.fixed + (annualTaxableIncome - bracket.over) * bracket.rate)
		}
	}

	return 0
}

/**
 * Calculates an employee's monthly net salary: gross minus TSS (AFP, SFS) and the ISR withholding.
 * ISR is computed on the annualized salary after TSS, as DGII's withholding method does.
 * @param monthlySalary {number} gross monthly salary in DOP
 * @param options {NetSalaryOptions} override the minimum wage or ISR scale
 * @returns {NetSalaryBreakdown} each deduction and the net salary, rounded to cents
 * @throws {DrUtilsError} if `monthlySalary` or an option is negative or not finite
 */
export function calculateNetSalary(
	monthlySalary: number,
	options: NetSalaryOptions = {},
): NetSalaryBreakdown {
	const { employee } = calculateTSS(monthlySalary, options)
	const annualTaxable = (monthlySalary - employee.total) * 12
	const isr = round2(calculateISR(annualTaxable, options.isrScale) / 12)
	const totalDeductions = round2(employee.total + isr)

	return {
		gross: monthlySalary,
		afp: employee.afp,
		sfs: employee.sfs,
		isr,
		totalDeductions,
		net: round2(monthlySalary - totalDeductions),
	}
}
