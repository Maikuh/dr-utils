const PLATE_REGEX = /^(A|G|I|K|L|P)\d{5,6}$|^(CD|DD|DL|EL|EX|RE)\d{4,6}$/

/**
 * Validates a Dominican Republic vehicle license plate.
 * Supports single-letter categories (A, G, I, K, L, P) and two-letter categories (CD, DD, DL, EL, EX, RE).
 * @param plate {string} the license plate to validate (case-insensitive)
 * @returns {boolean} `true` if `plate` matches a known INTRANT category and digit sequence, `false` otherwise
 */
export function validatePlate(plate: string): boolean {
	return PLATE_REGEX.test(plate.trim().toUpperCase())
}
