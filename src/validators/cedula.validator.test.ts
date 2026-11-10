import { validateCedula } from './cedula.validator'

describe('Cedula Validator', () => {
	let cedulas: string[]

	beforeAll(async () => {
		cedulas = await Bun.file('assets/cedulas.json').json()
	})

	it('All Cedulas should be valid', () => {
		const allValid = cedulas.every((cedula) => {
			const isValid = validateCedula(cedula)

			if (!isValid) console.log('Failed cedula:', cedula)

			return isValid
		})

		expect(allValid).toBeTruthy()
	})

	it.each(['40220579912', '22500663228'])('Known valid cedula "%s" should pass', (cedula) => {
		expect(validateCedula(cedula)).toBe(true)
	})

	it.each([
		['40213094215', 'bad check digit'],
		['4021309421', 'too short'],
		['402135792110', 'too long'],
		['0000000000A', 'non-numeric'],
		['00000000000', 'all zeros'],
		['000-0000000-0', 'all zeros with dashes'],
		['402.2057991.2', 'dots'],
	])('Known invalid cedula "%s" (%s) should fail', (cedula) => {
		expect(validateCedula(cedula)).toBe(false)
	})

	it('accepts dashes and strips them before validating', () => {
		expect(validateCedula('402-2057991-2')).toBe(true)
	})

	it('trims surrounding whitespace', () => {
		expect(validateCedula('  402-2057991-2\n')).toBe(true)
	})

	it('accepts spaces as separators', () => {
		expect(validateCedula('402 2057991 2')).toBe(true)
	})

	it('rejects other non-digit characters', () => {
		expect(validateCedula('40220579912a')).toBe(false)
	})
})
