import {
	PHONE_NUMBER_EXTRACT_REGEX,
	PHONE_NUMBER_VALID_REGEX,
} from '@/constants/phone-number.regex'
import { ParsedPhoneNumber } from '@/types/parsed-phone-number.type'

/**
 * Parses a DR phone number into its components.
 * @param phoneNumber {string} a valid DR phone number (809/829/849 area codes)
 * @returns {ParsedPhoneNumber} structured components plus pre-built national and international strings
 * @throws if the phone number is not a valid DR number
 */
export function normalizePhoneNumber(phoneNumber: string): string {
	const digits = phoneNumber.replace(PHONE_NUMBER_EXTRACT_REGEX, '')
	const matches = digits.match(PHONE_NUMBER_VALID_REGEX)
	if (!matches) throw new Error(`Phone number "${phoneNumber}" is not a valid DR phone number.`)
	const [, areaCode, prefix, line] = matches as [string, string, string, string]
	return `${areaCode}${prefix}${line}`
}

export function parsePhoneNumber(phoneNumber: string): ParsedPhoneNumber {
	const digits = phoneNumber.replace(PHONE_NUMBER_EXTRACT_REGEX, '')
	const matches = digits.match(PHONE_NUMBER_VALID_REGEX)

	if (!matches) throw new Error(`Phone number "${phoneNumber}" is not a valid DR phone number.`)

	const [, areaCode, prefix, line] = matches as [string, string, string, string]

	return {
		areaCode,
		prefix,
		line,
		national: `(${areaCode}) ${prefix}-${line}`,
		international: `+1${areaCode}${prefix}${line}`,
	}
}
