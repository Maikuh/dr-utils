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
 * @returns {string} e.g. `"RD$1,234.50"`
 */
export function formatDOP(value: number, options: FormatDOPOptions = {}): string {
	const { symbol = 'RD$', decimals = 2 } = options
	const formatted = formatNumberDR(value, decimals)
	return symbol === 'none' ? formatted : `${symbol}${formatted}`
}
