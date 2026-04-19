import { PLATE_CATEGORIES, PlateCategoryCode } from '@/constants/plate-categories.constant'
import { DrUtilsError } from '@/errors/dr-utils-error'
import { formatPlate } from '@/formatters/plate.formatter'
import { ParsedPlate } from '@/types/parsed-plate.type'
import { validatePlate } from '@/validators/plate.validator'

/**
 * Parses a Dominican Republic license plate into its category and sequence components.
 * @param plate {string} the license plate (case-insensitive)
 * @returns {ParsedPlate} category code, category name, digit sequence, and formatted plate
 * @throws {DrUtilsError} if `plate` is not a valid DR license plate
 */
export function parsePlate(plate: string): ParsedPlate {
	const normalized = plate.trim().toUpperCase()
	if (!validatePlate(normalized)) {
		throw new DrUtilsError('INVALID_PLATE', `"${plate}" is not a valid DR license plate.`)
	}

	const twoLetter = normalized.slice(0, 2)
	const category: PlateCategoryCode =
		twoLetter in PLATE_CATEGORIES
			? (twoLetter as PlateCategoryCode)
			: (normalized.slice(0, 1) as PlateCategoryCode)

	const sequence = normalized.slice(category.length)

	return {
		category,
		categoryName: PLATE_CATEGORIES[category],
		sequence,
		formatted: formatPlate(normalized),
	}
}
