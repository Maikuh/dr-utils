import { stripDashes } from '@/internal/normalize'

// Digit sum of `2 * d` for d = 0..9 (Luhn doubling step)
const DOUBLED_DIGIT_SUM = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]

/**
 * Validates a Dominican Republic National ID (Cedula).
 * @param cedula {string} the person's Cedula (dashes and surrounding whitespace allowed)
 * @returns {boolean} `true` if `cedula` is valid, `false` otherwise
 */
export function validateCedula(cedula: string): boolean {
	const digits = stripDashes(cedula)

	if (digits.length !== 11 || digits === '00000000000') return false

	let total = 0

	for (let i = 0; i < 11; i++) {
		const digit = digits.charCodeAt(i) - 48

		if (digit < 0 || digit > 9) return false

		total += i % 2 === 1 ? DOUBLED_DIGIT_SUM[digit]! : digit
	}

	return total % 10 === 0
}
