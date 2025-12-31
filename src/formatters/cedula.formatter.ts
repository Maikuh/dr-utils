import { FormatStyle } from '@/types/format-style.type'

/**
 * @param cedula {string} the person's Cedula
 * @param style {FormatStyle} determines if dashes are to be removed or added. Defaults to 'with-dashes'.
 * @returns {string} the formatted cedula
 */
export function formatCedula(cedula: string, style: FormatStyle = 'with-dashes'): string {
	const isCedulaWithDashes = cedula.length === 13 && cedula[3] === '-' && cedula[11] === '-'

	if (style === 'with-dashes') {
		if (isCedulaWithDashes) return cedula

		return `${cedula.slice(0, 3)}-${cedula.slice(3, 10)}-${cedula.slice(10, 11)}`
	}

	const isCedulaWithoutDashes = cedula.length === 11 && !cedula.includes('-')

	if (style === 'without-dashes') {
		if (isCedulaWithoutDashes) return cedula

		return cedula.replaceAll('-', '')
	}

	throw new Error(`Cannot format cedula "${cedula}".`)
}

export default formatCedula
