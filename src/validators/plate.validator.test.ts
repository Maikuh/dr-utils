import { validatePlate } from './plate.validator'

describe('Plate Validator', () => {
	it.each([
		// Single-letter regular plates
		['A123456', 'Automóvil, 6 digits'],
		['A12345', 'Automóvil, 5 digits'],
		['B123456', 'Automóvil interurbano público'],
		['C123456', 'Automóvil turístico'],
		['D123456', 'Autobús público urbano'],
		['F123456', 'Remolque'],
		['G12345', 'Jeep, 5 digits'],
		['H123456', 'Ambulancia'],
		['I12345', 'Autobús privado'],
		['J123456', 'Montacargas'],
		['K123456', 'Motocicleta'],
		['L123456', 'Carga'],
		['M123456', 'Carro fúnebre'],
		['P12345', 'Autobús turístico'],
		['R12345', 'Autobús público interurbano'],
		['S123456', 'Volteo'],
		['T123456', 'Automóvil público urbano'],
		['U123456', 'Máquinas pesadas'],
		['X12345', 'Exhibición'],
		['Z123456', 'Exonerada single-letter'],
		// Two-letter — military / police
		['OE1234', 'Ejército Nacional'],
		['OF1234', 'Fuerza Aérea'],
		['OM1234', 'Marina de Guerra'],
		['OP1234', 'Policía Nacional'],
		// Two-letter — exoneradas estatales
		['EA12345', 'Exonerada estatal EA'],
		['ED12345', 'Exonerada estatal ED'],
		['EG12345', 'Exonerada estatal EG'],
		['EI12345', 'Exonerada estatal EI'],
		['EL12345', 'Exonerada estatal EL'],
		['EM12345', 'Exonerada estatal EM'],
		// Two-letter — diplomatic / consular / international
		['OI1234', 'Organismo internacional'],
		['VC1234', 'Consular'],
		['WD1234', 'Diplomática'],
		// Two-letter — exoneradas
		['EX1234', 'Exonerada EX'],
		['NZ1234', 'Exonerada NZ'],
		['YX1234', 'Exonerada YX'],
		// Two-letter — dealers
		['DD12345', 'Dealer'],
		['DD123456', 'Dealer, 6 digits'],
	])('valid plate "%s" (%s) should pass', (plate) => {
		expect(validatePlate(plate)).toBe(true)
	})

	it('accepts lowercase input', () => {
		expect(validatePlate('a123456')).toBe(true)
		expect(validatePlate('wd1234')).toBe(true)
	})

	it.each([
		['123456', 'no prefix'],
		['A1234', 'too few digits for single-letter'],
		['A1234567', 'too many digits'],
		['ZZ12345', 'ZZ is not a valid prefix'],
		['CD12345', 'CD was removed (use WD for diplomatic)'],
		['RE123456', 'RE is not a valid prefix'],
		['DL123456', 'DL is not a valid prefix'],
		['A12345A', 'non-numeric sequence'],
		['', 'empty string'],
	])('invalid plate "%s" (%s) should fail', (plate) => {
		expect(validatePlate(plate)).toBe(false)
	})
})
