import { ISR_SCALE_2026, TSS_MINIMUM_WAGE } from '@/constants/payroll.constant'
import { DrUtilsError } from '@/errors/dr-utils-error'
import { calculateISR, calculateNetSalary, calculateTSS } from './payroll'

describe('calculateTSS', () => {
	it('applies employee and employer rates below the caps', () => {
		expect(calculateTSS(50_000)).toEqual({
			employee: { afp: 1435, sfs: 1520, total: 2955 },
			employer: { afp: 3550, sfs: 3545, srl: 550, total: 7645 },
		})
	})

	it('caps each contribution at its multiple of the minimum wage', () => {
		const { employee, employer } = calculateTSS(1_000_000)
		expect(employee.afp).toBe(13_330) // 464,460 × 2.87%
		expect(employee.sfs).toBe(7059.79) // 232,230 × 3.04%
		expect(employer.srl).toBe(1021.81) // 92,892 × 1.10%
	})

	it('accepts a custom minimum wage and SRL rate', () => {
		expect(calculateTSS(1_000_000, { minimumWage: 10_000 }).employee.afp).toBe(5740)
		expect(calculateTSS(50_000, { srlRate: 0.013 }).employer.srl).toBe(650)
	})

	it('returns zeros for a zero salary', () => {
		expect(calculateTSS(0).employee.total).toBe(0)
	})

	it('throws PAYROLL_INVALID_AMOUNT for negative or non-finite salaries', () => {
		for (const bad of [-1, Number.NaN, Number.POSITIVE_INFINITY]) {
			try {
				calculateTSS(bad)
				throw new Error('expected throw')
			} catch (e) {
				expect(e).toBeInstanceOf(DrUtilsError)
				expect((e as DrUtilsError).code).toBe('PAYROLL_INVALID_AMOUNT')
			}
		}
	})

	it('throws PAYROLL_INVALID_OPTION for invalid options', () => {
		expect(() => calculateTSS(1000, { minimumWage: Number.NaN })).toThrow(DrUtilsError)
		expect(() => calculateTSS(1000, { srlRate: -0.01 })).toThrow(DrUtilsError)
	})

	it('uses the 2026 minimum wage by default', () => {
		expect(TSS_MINIMUM_WAGE).toBe(23_223)
	})
})

describe('calculateISR', () => {
	it('is zero up to the exempt threshold', () => {
		expect(calculateISR(0)).toBe(0)
		expect(calculateISR(416_220)).toBe(0)
	})

	it('applies each bracket of the 2026 scale', () => {
		expect(calculateISR(500_000)).toBe(12_567) // 15% of the excess over 416,220.01
		expect(calculateISR(700_000)).toBe(46_350.2) // 31,216 + 20% over 624,329.01
		expect(calculateISR(1_000_000)).toBe(112_995.25) // 79,776 + 25% over 867,123.01
	})

	it('accepts a custom scale', () => {
		expect(calculateISR(200, [{ over: 100, rate: 0.1, fixed: 5 }])).toBe(15)
	})

	it('has three brackets in the 2026 scale', () => {
		expect(ISR_SCALE_2026).toHaveLength(3)
	})

	it('throws for negative income', () => {
		expect(() => calculateISR(-1)).toThrow(DrUtilsError)
	})
})

describe('calculateNetSalary', () => {
	it('deducts AFP, SFS and the monthly ISR withholding', () => {
		expect(calculateNetSalary(50_000)).toEqual({
			gross: 50_000,
			afp: 1435,
			sfs: 1520,
			isr: 1854,
			totalDeductions: 4809,
			net: 45_191,
		})
	})

	it('withholds no ISR for exempt salaries', () => {
		expect(calculateNetSalary(30_000).isr).toBe(0)
	})

	it('accepts a custom ISR scale', () => {
		expect(calculateNetSalary(50_000, { isrScale: [] }).isr).toBe(0)
	})
})
