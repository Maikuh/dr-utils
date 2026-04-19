import { parseCedula } from './cedula.util'

describe('parseCedula', () => {
	it('parses a bare 11-digit cedula into components', () => {
		const result = parseCedula('40220579912')
		expect(result.municipioCode).toBe('402')
		expect(result.sequence).toBe('2057991')
		expect(result.checkDigit).toBe('2')
		expect(result.formatted).toBe('402-2057991-2')
	})

	it('accepts dashes and strips them before parsing', () => {
		const result = parseCedula('402-2057991-2')
		expect(result.municipioCode).toBe('402')
		expect(result.formatted).toBe('402-2057991-2')
	})

	it('throws on an invalid cedula', () => {
		expect(() => parseCedula('40213094215')).toThrow()
	})

	it('throws on wrong-length input', () => {
		expect(() => parseCedula('1234567890')).toThrow()
	})
})
