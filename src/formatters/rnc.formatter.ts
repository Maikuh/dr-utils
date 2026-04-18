import { FormatStyle } from '@/types/format-style.type'
import formatCedula from './cedula.formatter'

/**
 * @param rnc {string} the entity's RNC (9 digits) or Cedula (11 digits), dashes optional
 * @param style {FormatStyle} determines if dashes are to be removed or added
 * @returns {string} the formatted RNC or Cedula
 * @throws if `rnc` is not 9 or 11 digits after stripping dashes
 */
export function formatRNC(rnc: string, style: FormatStyle = 'with-dashes'): string {
	const digits = rnc.replace(/-/g, '')

	if (digits.length === 11) return formatCedula(digits, style)

	if (digits.length !== 9 || !/^\d{9}$/.test(digits)) {
		throw new Error(`Cannot format RNC "${rnc}": must be 9 or 11 digits.`)
	}

	if (style === 'with-dashes') {
		return `${digits.slice(0, 3)}-${digits.slice(3, 8)}-${digits.slice(8)}`
	}

	return digits
}

export default formatRNC
