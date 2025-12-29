import validateNCF from './ncf.validator'

describe('NCF Validator', () => {
	it('Physical NCF "B0183920391" should be valid', () => {
		const isNCFValid = validateNCF('B0183920391')

		expect(isNCFValid).toBeTruthy()
	})

	it('Electronic NCF (e-CF) "E319320341237" should be valid', () => {
		const isNCFValid = validateNCF('E319320341237')

		expect(isNCFValid).toBeTruthy()
	})

	it('Physical NCF "B0883920391" invalid set', () => {
		const isNCFValid = validateNCF('B0883920391')

		expect(isNCFValid).toBeFalsy()
	})

	it('Electronic NCF (e-CF) "E38932034123" invalid set', () => {
		const isNCFValid = validateNCF('E38932034123')

		expect(isNCFValid).toBeFalsy()
	})

	it('Physical NCF "B018392039" invalid sequence', () => {
		const isNCFValid = validateNCF('B088392039')

		expect(isNCFValid).toBeFalsy()
	})

	it('Electronic NCF (e-CF) "E3193203412" invalid sequence', () => {
		const isNCFValid = validateNCF('E3893203412')

		expect(isNCFValid).toBeFalsy()
	})

	it('NCF with invalid length "B0183920391234" should be invalid', () => {
		const isNCFValid = validateNCF('B0183920391234')

		expect(isNCFValid).toBeFalsy()
	})
})
