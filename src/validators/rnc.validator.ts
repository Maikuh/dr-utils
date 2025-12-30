import { validateCedula } from './cedula.validator'

/**
 * Validates an RNC. Since RNCs can also be a Cedula, this uses the Cedula validator
 * conditionally behind the scenes.
 * @param rnc {string} the entity's RNC/Cedula
 * @returns {boolean} `true` if the `rnc` is valid, `false` otherwise
 */
export function validateRNC(rnc: string): boolean {
	const cleanRnc = rnc.replace(/\D/g, '')

	if (cleanRnc.length === 11) return validateCedula(cleanRnc)
	else if (cleanRnc.length !== 9) return false

	const digits = cleanRnc.split('').map(Number)
	const checkDigit = digits[8]

	const multipliers = [7, 9, 8, 6, 5, 4, 3, 2]

	let sum = 0

	for (let i = 0; i < 8; i++) {
		sum += digits[i]! * multipliers[i]!
	}

	const remainder = sum % 11
	let calculatedCheckDigit = 11 - remainder

	if (calculatedCheckDigit === 10) {
		calculatedCheckDigit = 1
	} else if (calculatedCheckDigit === 11) {
		calculatedCheckDigit = 2
	}

	return calculatedCheckDigit === checkDigit
}

export default validateRNC
