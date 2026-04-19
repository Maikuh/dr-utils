import {
	PHONE_NUMBER_EXTRACT_REGEX,
	PHONE_NUMBER_VALID_REGEX,
} from '@/constants/phone-number.regex'
import { DrUtilsError } from '@/errors/dr-utils-error'
import { validateCedula } from '@/validators/cedula.validator'
import { validateRNC } from '@/validators/rnc.validator'

/**
 * Returns a masked version of a Cedula showing only the first 3 and last digit.
 * @param cedula {string} the person's Cedula (11 digits, dashes optional)
 * @returns {string} e.g. `"402-*******-2"`
 * @throws {DrUtilsError} if `cedula` is not a valid cedula
 */
export function maskCedula(cedula: string): string {
	const digits = cedula.replace(/-/g, '')
	if (!validateCedula(digits))
		throw new DrUtilsError('INVALID_CEDULA', `"${cedula}" is not a valid cedula.`)
	return `${digits.slice(0, 3)}-${'*'.repeat(7)}-${digits.slice(10)}`
}

/**
 * Returns a masked version of an RNC or Cedula showing only the first 3 and last digit.
 * @param rnc {string} the entity's RNC (9 digits) or Cedula (11 digits), dashes optional
 * @returns {string} e.g. `"130-*****-4"` or the masked Cedula form
 * @throws {DrUtilsError} if `rnc` is not a valid RNC or Cedula
 */
export function maskRNC(rnc: string): string {
	const digits = rnc.replace(/\D/g, '')
	if (!validateRNC(digits))
		throw new DrUtilsError('INVALID_RNC', `"${rnc}" is not a valid RNC or cedula.`)
	if (digits.length === 11) return maskCedula(digits)
	return `${digits.slice(0, 3)}-${'*'.repeat(5)}-${digits.slice(8)}`
}

/**
 * Returns a masked version of a DR phone number showing only the area code and last 4 digits.
 * @param phoneNumber {string} a valid DR phone number (809/829/849 area codes)
 * @returns {string} e.g. `"(809) ***-1111"`
 * @throws {DrUtilsError} if `phoneNumber` is not a valid DR phone number
 */
export function maskPhoneNumber(phoneNumber: string): string {
	const stripped = phoneNumber.replace(PHONE_NUMBER_EXTRACT_REGEX, '')
	const matches = stripped.match(PHONE_NUMBER_VALID_REGEX)
	if (!matches)
		throw new DrUtilsError('INVALID_PHONE', `"${phoneNumber}" is not a valid DR phone number.`)
	const [, areaCode, , line] = matches as [string, string, string, string]
	return `(${areaCode}) ***-${line}`
}
