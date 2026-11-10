import type { PlateCategoryCode } from '@/constants/plate-categories.constant'

export interface ParsedPlate {
	category: PlateCategoryCode
	categoryName: string
	sequence: string
	formatted: string
}
