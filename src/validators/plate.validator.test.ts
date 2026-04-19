import { validatePlate } from './plate.validator'

describe('Plate Validator', () => {
	it.each([
		['A123456', 'single-letter prefix, 6 digits'],
		['G12345', 'single-letter prefix, 5 digits'],
		['K123456', 'Alquiler'],
		['L123456', 'Carga'],
		['P12345', 'Público'],
		['I12345', 'Motocicleta'],
		['EL12345', 'Eléctrico, 5 digits'],
		['EL123456', 'Eléctrico, 6 digits'],
		['EX1234', 'Exonerado, 4 digits'],
		['RE123456', 'Remolque'],
		['CD1234', 'Diplomático CD'],
		['DD12345', 'Diplomático DD'],
		['DL123456', 'Diplomático DL'],
	])('valid plate "%s" (%s) should pass', (plate) => {
		expect(validatePlate(plate)).toBe(true)
	})

	it('accepts lowercase input', () => {
		expect(validatePlate('a123456')).toBe(true)
		expect(validatePlate('el12345')).toBe(true)
	})

	it.each([
		['123456', 'no prefix'],
		['A1234', 'too few digits for single-letter'],
		['A1234567', 'too many digits'],
		['ZZ12345', 'unknown two-letter prefix'],
		['B123456', 'unknown single-letter prefix'],
		['A12345A', 'non-numeric sequence'],
		['', 'empty string'],
	])('invalid plate "%s" (%s) should fail', (plate) => {
		expect(validatePlate(plate)).toBe(false)
	})
})
