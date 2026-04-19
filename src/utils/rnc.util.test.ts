import { parseRNC } from './rnc.util'

describe('parseRNC', () => {
	it('parses a 9-digit RNC', () => {
		const result = parseRNC('130720754')
		expect(result.kind).toBe('rnc')
		if (result.kind === 'rnc') {
			expect(result.sequence).toBe('13072075')
			expect(result.checkDigit).toBe('4')
			expect(result.formatted).toBe('130-72075-4')
		}
	})

	it('parses a formatted RNC with dashes', () => {
		const result = parseRNC('130-72075-4')
		expect(result.kind).toBe('rnc')
		expect(result.formatted).toBe('130-72075-4')
	})

	it('parses an 11-digit cedula as kind "cedula"', () => {
		const result = parseRNC('40220579912')
		expect(result.kind).toBe('cedula')
		if (result.kind === 'cedula') {
			expect(result.municipioCode).toBe('402')
			expect(result.sequence).toBe('2057991')
			expect(result.checkDigit).toBe('2')
			expect(result.formatted).toBe('402-2057991-2')
		}
	})

	it('throws on an invalid RNC', () => {
		expect(() => parseRNC('130502395')).toThrow()
	})

	it('throws on wrong-length input', () => {
		expect(() => parseRNC('12345')).toThrow()
	})
})
