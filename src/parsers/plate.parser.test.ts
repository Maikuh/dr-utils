import { DrUtilsError } from '@/errors/dr-utils-error'
import { parsePlate } from './plate.parser'

describe('parsePlate', () => {
	it('parses a single-letter category plate', () => {
		const result = parsePlate('A123456')
		expect(result.category).toBe('A')
		expect(result.categoryName).toBe('Privado')
		expect(result.sequence).toBe('123456')
		expect(result.formatted).toBe('A123456')
	})

	it('parses a two-letter category plate', () => {
		const result = parsePlate('EL12345')
		expect(result.category).toBe('EL')
		expect(result.categoryName).toBe('Eléctrico')
		expect(result.sequence).toBe('12345')
		expect(result.formatted).toBe('EL12345')
	})

	it('parses lowercase input and normalizes to uppercase', () => {
		const result = parsePlate('k123456')
		expect(result.category).toBe('K')
		expect(result.categoryName).toBe('Alquiler')
		expect(result.formatted).toBe('K123456')
	})

	it.each([
		['G12345', 'G', 'Gubernamental'],
		['L123456', 'L', 'Carga'],
		['P12345', 'P', 'Público'],
		['I12345', 'I', 'Motocicleta'],
		['CD1234', 'CD', 'Cuerpo Diplomático'],
		['RE123456', 'RE', 'Remolque'],
	])('parsePlate("%s") → category "%s" (%s)', (plate, category, categoryName) => {
		const result = parsePlate(plate)
		expect(result.category).toBe(category)
		expect(result.categoryName).toBe(categoryName)
	})

	it('throws DrUtilsError for invalid plates', () => {
		expect(() => parsePlate('123456')).toThrow(DrUtilsError)
		expect(() => parsePlate('ZZ12345')).toThrow(DrUtilsError)
	})

	it('thrown error has INVALID_PLATE code', () => {
		try {
			parsePlate('INVALID')
		} catch (e) {
			expect(e).toBeInstanceOf(DrUtilsError)
			expect((e as DrUtilsError).code).toBe('INVALID_PLATE')
		}
	})
})
