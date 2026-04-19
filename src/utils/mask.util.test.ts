import { maskCedula, maskPhoneNumber, maskRNC } from './mask.util'

describe('maskCedula', () => {
	it('masks the middle 7 digits', () => {
		expect(maskCedula('40220579912')).toBe('402-*******-2')
	})

	it('accepts dashes in input', () => {
		expect(maskCedula('402-2057991-2')).toBe('402-*******-2')
	})

	it('throws on invalid cedula', () => {
		expect(() => maskCedula('12345678901')).toThrow()
	})
})

describe('maskRNC', () => {
	it('masks the middle 5 digits of a 9-digit RNC', () => {
		expect(maskRNC('130720754')).toBe('130-*****-4')
	})

	it('masks like maskCedula when given an 11-digit cedula', () => {
		expect(maskRNC('40220579912')).toBe('402-*******-2')
	})

	it('throws on invalid RNC', () => {
		expect(() => maskRNC('130502395')).toThrow()
	})
})

describe('maskPhoneNumber', () => {
	it('masks the prefix and shows area code + last 4', () => {
		expect(maskPhoneNumber('8092201111')).toBe('(809) ***-1111')
	})

	it('accepts formatted input', () => {
		expect(maskPhoneNumber('(829) 555-3000')).toBe('(829) ***-3000')
	})

	it('throws on non-DR phone number', () => {
		expect(() => maskPhoneNumber('7815754238')).toThrow()
	})
})
