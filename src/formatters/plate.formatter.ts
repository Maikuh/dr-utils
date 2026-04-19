import { DrUtilsError } from '@/errors/dr-utils-error'
import { validatePlate } from '@/validators/plate.validator'

/**
 * Normalizes a Dominican Republic license plate to uppercase.
 * @param plate {string} the license plate to format (case-insensitive)
 * @returns {string} the plate in canonical uppercase form, e.g. `"A123456"`
 * @throws {DrUtilsError} if `plate` is not a valid DR license plate
 */
export function formatPlate(plate: string): string {
	const normalized = plate.trim().toUpperCase()
	if (!validatePlate(normalized)) {
		throw new DrUtilsError('FORMAT_PLATE_FAILED', `Cannot format plate "${plate}": invalid format.`)
	}
	return normalized
}
