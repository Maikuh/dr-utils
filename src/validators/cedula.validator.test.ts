import validateCedula from './cedula.validator'

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

	it('Cedula "40213094215" should be invalid', () => {
		const result = validateCedula('40213094215')

		expect(result).toBeFalsy()
	})

	it('Wrong length Cedula "4021309421" should be invalid', () => {
		const result = validateCedula('4021309421')

		expect(result).toBeFalsy()
	})
})
