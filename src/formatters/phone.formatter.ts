import {
	PHONE_NUMBER_EXTRACT_REGEX,
	PHONE_NUMBER_VALID_REGEX,
} from '@/constants/phone-number.regex'
import { DrUtilsError } from '@/errors/dr-utils-error'

/**
 * @param phoneNumber {string} the phone number
 * @param international {boolean} if the output should be the international format (E.164) or not (domestic)
 * @returns {string} the formatted phone number
 * @throws {DrUtilsError} if `phoneNumber` is not a valid DR phone number
 */
export function formatPhoneNumber(phoneNumber: string, international: boolean = false): string {
	const digitsOnly = phoneNumber.replace(PHONE_NUMBER_EXTRACT_REGEX, '')
	const matches = digitsOnly.match(PHONE_NUMBER_VALID_REGEX)

	if (!matches)
		throw new DrUtilsError('FORMAT_PHONE_FAILED', `Phone Number "${phoneNumber}" is not valid`)

	const areaCode = matches[1]
	const prefix = matches[2]
	const line = matches[3]

	if (!international) {
		return `(${areaCode}) ${prefix}-${line}`
	}

	return `+1${areaCode}${prefix}${line}`
}
