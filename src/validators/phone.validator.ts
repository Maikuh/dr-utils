import {
	PHONE_NUMBER_EXTRACT_REGEX,
	PHONE_NUMBER_VALID_REGEX,
} from '../constants/phone-number.regex'

/**
 * @param phoneNumber {string} the phone number
 * @returns {boolean} `true` if the number is valid, `false` otherwise
 */
export function validatePhoneNumber(phoneNumber: string): boolean {
	const stripped = phoneNumber.replace(PHONE_NUMBER_EXTRACT_REGEX, '')

	return stripped.match(PHONE_NUMBER_VALID_REGEX) !== null
}

export default validatePhoneNumber
