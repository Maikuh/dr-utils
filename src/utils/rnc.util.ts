import { DrUtilsError } from '@/errors/dr-utils-error'
import { formatRNC } from '@/formatters/rnc.formatter'
import { ParsedRNC } from '@/types/parsed-rnc.type'
import { validateRNC } from '@/validators/rnc.validator'
import { parseCedula } from './cedula.util'

/**
 * Parses a Dominican Republic RNC (tax ID) or Cedula into its components.
 * @param rnc {string} the entity's RNC (9 digits) or Cedula (11 digits), dashes optional
 * @returns {ParsedRNC} structured components; kind is `'rnc'` or `'cedula'`
 * @throws {DrUtilsError} if `rnc` is not a valid RNC or Cedula
 */
export function parseRNC(rnc: string): ParsedRNC {
	const digits = rnc.replace(/\D/g, '')
	if (!validateRNC(digits))
		throw new DrUtilsError('INVALID_RNC', `"${rnc}" is not a valid RNC or cedula.`)
	if (digits.length === 11) return { kind: 'cedula', ...parseCedula(digits) }
	return {
		kind: 'rnc',
		sequence: digits.slice(0, 8),
		checkDigit: digits.slice(8),
		formatted: formatRNC(digits),
	}
}
