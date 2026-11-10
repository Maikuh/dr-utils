import { DrUtilsError } from '@/errors/dr-utils-error'

export interface FormatDOPOptions {
	symbol?: 'RD$' | '$' | 'none'
	decimals?: number
}

function formatNumberDR(value: number, decimals: number): string {
	const fixed = value.toFixed(decimals)
	const [intPart, decPart] = fixed.split('.')
	const grouped = intPart!.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	return decPart !== undefined ? `${grouped}.${decPart}` : grouped
}

/**
 * Formats a number as Dominican Peso (DOP) currency string.
 * @param value {number} the monetary amount to format
 * @param options {FormatDOPOptions} controls symbol prefix and decimal places. Defaults to `{ symbol: 'RD$', decimals: 2 }`.
 * @returns {string} e.g. `"RD$1,234.50"`, or `"-RD$1,234.50"` for negative amounts
 * @throws {DrUtilsError} if `value` is not a finite number
 */
export function formatDOP(value: number, options: FormatDOPOptions = {}): string {
	const { symbol = 'RD$', decimals = 2 } = options

	if (!Number.isFinite(value)) {
		throw new DrUtilsError('FORMAT_DOP_FAILED', `Cannot format "${value}": not a finite number.`)
	}

	const formatted = formatNumberDR(Math.abs(value), decimals)
	// Only show the sign when the rounded amount is non-zero (avoids "-RD$0.00")
	const sign = value < 0 && /[1-9]/.test(formatted) ? '-' : ''
	return symbol === 'none' ? `${sign}${formatted}` : `${sign}${symbol}${formatted}`
}
