import { DrUtilsError } from '@/errors/dr-utils-error'
import { formatPlate } from './plate.formatter'

describe('formatPlate', () => {
	it('normalizes lowercase to uppercase', () => {
		expect(formatPlate('a123456')).toBe('A123456')
		expect(formatPlate('el12345')).toBe('EL12345')
	})

	it('returns already-uppercase plates unchanged', () => {
		expect(formatPlate('K123456')).toBe('K123456')
	})

	it.each([
		['A123456', 'A123456'],
		['G12345', 'G12345'],
		['RE123456', 'RE123456'],
	])('formatPlate("%s") → "%s"', (input, expected) => {
		expect(formatPlate(input)).toBe(expected)
	})

	it('throws DrUtilsError for invalid plates', () => {
		expect(() => formatPlate('123456')).toThrow(DrUtilsError)
		expect(() => formatPlate('ZZ12345')).toThrow(DrUtilsError)
	})

	it('thrown error has FORMAT_PLATE_FAILED code', () => {
		try {
			formatPlate('INVALID')
		} catch (e) {
			expect(e).toBeInstanceOf(DrUtilsError)
			expect((e as DrUtilsError).code).toBe('FORMAT_PLATE_FAILED')
		}
	})
})
