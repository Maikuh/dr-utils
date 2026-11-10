/**
 * Minimum contributory wage (salario mínimo cotizable) the TSS uses to compute contribution caps:
 * RD$23,223.00, effective 2026-02-01 (TSS Resolución 01-2025). Pass `minimumWage` to override when it changes.
 */
export const TSS_MINIMUM_WAGE = 23_223

export interface TSSRates {
	employee: { afp: number; sfs: number }
	employer: { afp: number; sfs: number; srl: number }
}

/**
 * TSS contribution rates under Ley 87-01. AFP = pensions (SVDS), SFS = health, SRL = occupational risk.
 * The employer SRL rate depends on the company's risk class (1.10%–1.30%); 1.10% is the default.
 */
export const TSS_RATES: TSSRates = {
	employee: { afp: 0.0287, sfs: 0.0304 },
	employer: { afp: 0.071, sfs: 0.0709, srl: 0.011 },
}

/** Monthly salary caps for each contribution, as multiples of `TSS_MINIMUM_WAGE`. */
export const TSS_CAP_MULTIPLIERS: { afp: number; sfs: number; srl: number } = {
	afp: 20,
	sfs: 10,
	srl: 4,
}

export interface ISRBracket {
	/** Annual taxable income above which this bracket applies. */
	over: number
	/** Marginal rate applied to the income above `over`. */
	rate: number
	/** Fixed amount owed for the brackets below this one. */
	fixed: number
}

/**
 * DGII annual income tax (ISR) scale for salaried individuals, in effect for 2026.
 * Income up to RD$416,220.00 is exempt. Ley 30-26 sets a new scale from 2027: pass your own
 * `ISRBracket[]` to the ISR functions to use it.
 */
export const ISR_SCALE_2026: readonly ISRBracket[] = [
	{ over: 416_220.01, rate: 0.15, fixed: 0 },
	{ over: 624_329.01, rate: 0.2, fixed: 31_216 },
	{ over: 867_123.01, rate: 0.25, fixed: 79_776 },
]
