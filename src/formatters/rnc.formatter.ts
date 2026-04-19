import { DrUtilsError } from '@/errors/dr-utils-error'
import { FormatOptions } from '@/types/format-style.type'
import { formatCedula } from './cedula.formatter'

/**
 * @param rnc {string} the entity's RNC (9 digits) or Cedula (11 digits), dashes optional
 * @param options {FormatOptions} controls dash insertion. Defaults to `{ dashes: true }`.
 * @returns {string} the formatted RNC or Cedula
 * @throws {DrUtilsError} if `rnc` is not 9 or 11 digits after stripping dashes
 */
export function formatRNC(rnc: string, options: FormatOptions = {}): string {
	const digits = rnc.replace(/-/g, '')

	if (digits.length === 11) return formatCedula(digits, options)

	if (digits.length !== 9 || !/^\d{9}$/.test(digits)) {
		throw new DrUtilsError(
			'FORMAT_RNC_FAILED',
			`Cannot format RNC "${rnc}": must be 9 or 11 digits.`,
		)
	}

	const { dashes = true } = options

	if (dashes) {
		return `${digits.slice(0, 3)}-${digits.slice(3, 8)}-${digits.slice(8)}`
	}

	return digits
}
