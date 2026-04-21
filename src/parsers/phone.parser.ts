import {
	PHONE_NUMBER_EXTRACT_REGEX,
	PHONE_NUMBER_VALID_REGEX,
} from '@/constants/phone-number.regex'
import { DrUtilsError } from '@/errors/dr-utils-error'
import { ParsedPhoneNumber } from '@/types/parsed-phone-number.type'

function extractParts(phoneNumber: string): [string, string, string] {
	const digits = phoneNumber.replace(PHONE_NUMBER_EXTRACT_REGEX, '')
	const matches = digits.match(PHONE_NUMBER_VALID_REGEX)
	if (!matches)
		throw new DrUtilsError(
			'INVALID_PHONE',
			`Phone number "${phoneNumber}" is not a valid DR phone number.`,
		)
	const [, areaCode, prefix, line] = matches as [string, string, string, string]
	return [areaCode, prefix, line]
}

/**
 * Normalizes a DR phone number to a plain 10-digit string (no formatting).
 * @param phoneNumber {string} a valid DR phone number (809/829/849 area codes)
 * @returns {string} 10-digit normalized number, e.g. `"8092201111"`
 * @throws {DrUtilsError} if the phone number is not a valid DR number
 */
export function normalizePhoneNumber(phoneNumber: string): string {
	const [areaCode, prefix, line] = extractParts(phoneNumber)
	return `${areaCode}${prefix}${line}`
}

/**
 * Parses a DR phone number into its components.
 * @param phoneNumber {string} a valid DR phone number (809/829/849 area codes)
 * @returns {ParsedPhoneNumber} structured components plus pre-built national and international strings
 * @throws {DrUtilsError} if the phone number is not a valid DR number
 */
export function parsePhoneNumber(phoneNumber: string): ParsedPhoneNumber {
	const [areaCode, prefix, line] = extractParts(phoneNumber)
	return {
		areaCode,
		prefix,
		line,
		national: `(${areaCode}) ${prefix}-${line}`,
		international: `+1${areaCode}${prefix}${line}`,
	}
}
