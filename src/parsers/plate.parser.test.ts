import { DrUtilsError } from '@/errors/dr-utils-error'
import { parsePlate } from './plate.parser'

describe('parsePlate', () => {
	it('parses a single-letter category plate', () => {
		const result = parsePlate('A123456')
		expect(result.category).toBe('A')
		expect(result.categoryName).toBe('Automóvil')
		expect(result.sequence).toBe('123456')
		expect(result.formatted).toBe('A123456')
	})

	it('parses a two-letter category plate', () => {
		const result = parsePlate('WD1234')
		expect(result.category).toBe('WD')
		expect(result.categoryName).toBe('Diplomática')
		expect(result.sequence).toBe('1234')
		expect(result.formatted).toBe('WD1234')
	})

	it('parses lowercase input and normalizes to uppercase', () => {
		const result = parsePlate('k123456')
		expect(result.category).toBe('K')
		expect(result.categoryName).toBe('Motocicleta')
		expect(result.formatted).toBe('K123456')
	})

	it.each([
		['G12345', 'G', 'Jeep'],
		['L123456', 'L', 'Carga'],
		['I12345', 'I', 'Autobús privado'],
		['P12345', 'P', 'Autobús turístico'],
		['F123456', 'F', 'Remolque'],
		['EL12345', 'EL', 'Exonerada estatal'],
		['OE1234', 'OE', 'Ejército Nacional'],
		['DD12345', 'DD', 'Dealer'],
		['NZ1234', 'NZ', 'Exonerada'],
	])('parsePlate("%s") → category "%s" (%s)', (plate, category, categoryName) => {
		const result = parsePlate(plate)
		expect(result.category).toBe(category)
		expect(result.categoryName).toBe(categoryName)
	})

	it('throws DrUtilsError for invalid plates', () => {
		expect(() => parsePlate('123456')).toThrow(DrUtilsError)
		expect(() => parsePlate('ZZ12345')).toThrow(DrUtilsError)
		expect(() => parsePlate('CD1234')).toThrow(DrUtilsError)
		expect(() => parsePlate('RE123456')).toThrow(DrUtilsError)
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
