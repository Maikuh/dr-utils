import {
	PHONE_NUMBER_EXTRACT_REGEX,
	PHONE_NUMBER_VALID_REGEX,
} from '@/constants/phone-number.regex'
import { validateCedula } from '@/validators/cedula.validator'
import { validateRNC } from '@/validators/rnc.validator'

export function maskCedula(cedula: string): string {
	const digits = cedula.replace(/-/g, '')
	if (!validateCedula(digits)) throw new Error(`"${cedula}" is not a valid cedula.`)
	return `${digits.slice(0, 3)}-${'*'.repeat(7)}-${digits.slice(10)}`
}

export function maskRNC(rnc: string): string {
	const digits = rnc.replace(/\D/g, '')
	if (!validateRNC(digits)) throw new Error(`"${rnc}" is not a valid RNC or cedula.`)
	if (digits.length === 11) return maskCedula(digits)
	return `${digits.slice(0, 3)}-${'*'.repeat(5)}-${digits.slice(8)}`
}

export function maskPhoneNumber(phoneNumber: string): string {
	const stripped = phoneNumber.replace(PHONE_NUMBER_EXTRACT_REGEX, '')
	const matches = stripped.match(PHONE_NUMBER_VALID_REGEX)
	if (!matches) throw new Error(`"${phoneNumber}" is not a valid DR phone number.`)
	const [, areaCode, , line] = matches as [string, string, string, string]
	return `(${areaCode}) ***-${line}`
}
