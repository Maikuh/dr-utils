import validateRNC from './rnc.validator'

describe('RNC Validator', () => {
	let rncs: string[]
	let cedulas: string[]

	beforeAll(async () => {
		rncs = await Bun.file('assets/rncs.json').json()
		cedulas = await Bun.file('assets/cedulas.json').json()
	})

	it('All RNCs should be valid', () => {
		const allValid = rncs.every((rnc) => {
			const isValid = validateRNC(rnc)

			if (!isValid) console.log('Failed RNC:', rnc)

			return isValid
		})

		expect(allValid).toBeTruthy()
	})

	it('All Cedulas should be valid', () => {
		const allValid = cedulas.slice(250, 750).every((cedula) => {
			const isValid = validateRNC(cedula)

			if (!isValid) console.log('Failed Cedula:', cedula)

			return isValid
		})

		expect(allValid).toBeTruthy()
	})

	it('RNC "130502395" should be invalid', () => {
		const result = validateRNC('130502395')

		expect(result).toBeFalsy()
	})

	it('Wrong length RNC "13050239" should be invalid', () => {
		const result = validateRNC('13050239')

		expect(result).toBeFalsy()
	})

	it('Cedula "40214094215" should be invalid', () => {
		const result = validateRNC('40214094215')

		expect(result).toBeFalsy()
	})

	it('Wrong length Cedula "4021409421" should be invalid', () => {
		const result = validateRNC('4021409421')

		expect(result).toBeFalsy()
	})
})
