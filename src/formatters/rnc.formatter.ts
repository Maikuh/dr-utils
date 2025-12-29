import { FormatStyle } from '../types'
import { formatCedula } from './cedula.formatter'

/**
 * @param rnc {string} the entities' RNC/Cedula
 * @param style {FormatStyle} determines if dashes are to be removed or added
 * @returns {string} the formatted RNC/Cedula
 */
export function formatRNC(rnc: string, style: FormatStyle = 'with-dashes'): string {
	if (rnc.length === 9 && style === 'with-dashes') {
		return `${rnc.slice(0, 3)}-${rnc.slice(3, 8)}-${rnc.slice(8, 9)}`
	}

	const rncIsRNCWithDashes = rnc.length === 11 && rnc[3] === '-' && rnc[9] === '-'

	if (rncIsRNCWithDashes && style === 'without-dashes') {
		return rnc.replaceAll('-', '')
	}

	const rncIsCedula = rnc.length === 13 || rnc.length === 11

	if (rncIsCedula) return formatCedula(rnc, style)

	throw new Error(`Cannot format RNC "${rnc}".`)
}

export default formatRNC
