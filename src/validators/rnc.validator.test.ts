import validateRNC from './rnc.validator'

describe('RNC Validator', () => {
	let rncs: string[]

	beforeAll(async () => {
		rncs = await Bun.file('assets/rncs.json').json()
	})

	it('All RNCs should be valid', () => {
		const allValid = rncs.every((rnc) => {
			const isValid = validateRNC(rnc)

			if (!isValid) console.log('Failed RNC:', rnc)

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
})
