import { stripDashes } from '@/internal/normalize'
import { validateCedula } from './cedula.validator'

const RNC_WEIGHTS = [7, 9, 8, 6, 5, 4, 3, 2]

/**
 * Validates an RNC (9 digits, mod-11 check) or Cedula (11 digits, Luhn check).
 * Per DGII rules, an 11-digit input is treated as a Cedula.
 * @param rnc {string} the entity's RNC (9 digits) or Cedula (11 digits), dashes optional
 * @returns {boolean} `true` if the `rnc` is valid, `false` otherwise
 */
export function validateRNC(rnc: string): boolean {
	const digits = stripDashes(rnc)

	if (digits.length === 11) return validateCedula(digits)
	if (digits.length !== 9) return false

	let sum = 0
	let checkDigit = 0

	for (let i = 0; i < 9; i++) {
		const digit = digits.charCodeAt(i) - 48

		if (digit < 0 || digit > 9) return false

		if (i < 8) sum += digit * RNC_WEIGHTS[i]!
		else checkDigit = digit
	}

	let expected = 11 - (sum % 11)

	if (expected === 10) expected = 1
	else if (expected === 11) expected = 2

	return expected === checkDigit
}
