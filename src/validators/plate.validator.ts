// Single-letter: A B C D F G H I J K L M P R S T U X Z + 5–6 digits
// Two-letter: military, exoneradas estatales, diplomatic, exoneradas, dealers + 4–6 digits
const SINGLE_LETTER = /^[ABCDFGHIJKLMPRSTUXZ]\d{5,6}$/
const TWO_LETTER =
	/^(OE|OF|OM|OP|EA|ED|EG|EI|EL|EM|OI|VC|WD|EX|NZ|YX|DD)\d{4,6}$/

/**
 * Validates a Dominican Republic vehicle license plate.
 * Supports single-letter categories (A, B, C, D, F, G, H, I, J, K, L, M, P, R, S, T, U, X, Z)
 * and two-letter categories (OE, OF, OM, OP, EA, ED, EG, EI, EL, EM, OI, VC, WD, EX, NZ, YX, DD).
 * @param plate {string} the license plate to validate (case-insensitive)
 * @returns {boolean} `true` if `plate` matches a known INTRANT/DGII category and digit sequence
 */
export function validatePlate(plate: string): boolean {
	const normalized = plate.trim().toUpperCase()
	return SINGLE_LETTER.test(normalized) || TWO_LETTER.test(normalized)
}
