import { DrUtilsError } from '@/errors/dr-utils-error'
import { formatCedula } from '@/formatters/cedula.formatter'
import { ParsedCedula } from '@/types/parsed-cedula.type'
import { validateCedula } from '@/validators/cedula.validator'

/**
 * Parses a Dominican Republic National ID (Cedula) into its components.
 * @param cedula {string} the person's Cedula (11 digits, dashes optional)
 * @returns {ParsedCedula} structured components plus pre-built formatted string
 * @throws {DrUtilsError} if `cedula` is not a valid cedula
 */
export function parseCedula(cedula: string): ParsedCedula {
	const digits = cedula.replace(/-/g, '')
	if (!validateCedula(digits))
		throw new DrUtilsError('INVALID_CEDULA', `"${cedula}" is not a valid cedula.`)
	return {
		municipioCode: digits.slice(0, 3),
		sequence: digits.slice(3, 10),
		checkDigit: digits.slice(10),
		formatted: formatCedula(digits),
	}
}
