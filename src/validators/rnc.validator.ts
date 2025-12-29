import { validateCedula } from './cedula.validator'

/**
 * Validates an RNC. Since RNCs can also be a Cedula, this uses the Cedula validator
 * conditionally behind the scenes.
 * @param rnc {string} the entities' RNC/Cedula
 * @returns {boolean} `true` if the RNC/Cedula is valid, `false` otherwise
 */
export function validateRNC(rnc: string): boolean {
	const rncNoDashes = rnc.trim().replace(/-/g, '')

	if (rncNoDashes.length === 11) return validateCedula(rnc)
	if (rncNoDashes.length !== 9) return false

	const baseRnc = [7, 9, 8, 6, 5, 4, 3, 2]
	let sum = 0
	let checker

	const digits = rnc.split('').map(Number)
	const checkDigit = digits[digits.length - 1]

	for (let i = baseRnc.length - 1; i >= 0; i -= 1) {
		sum += baseRnc[i]! * digits[i]!
	}

	const remainder = sum % 11

	switch (remainder) {
		case 0:
			checker = 2
			break
		case 1:
			checker = 1
			break
		default:
			checker = 11 - remainder
			break
	}

	return checker === checkDigit
}

export default validateRNC
