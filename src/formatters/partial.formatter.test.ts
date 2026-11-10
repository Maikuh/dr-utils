import {
	formatCedulaPartial,
	formatPhoneNumberPartial,
	formatRNCPartial,
} from './partial.formatter'

describe('formatCedulaPartial', () => {
	it.each([
		['', ''],
		['0', '0'],
		['001', '001'],
		['0011', '001-1'],
		['0011234567', '001-1234567'],
		['00112345678', '001-1234567-8'],
	])('formats %p as %p', (input, expected) => {
		expect(formatCedulaPartial(input)).toBe(expected)
	})

	it('drops non-digits and caps at 11 digits', () => {
		expect(formatCedulaPartial('001-12a34567-89999')).toBe('001-1234567-8')
	})

	it('is idempotent on its own output', () => {
		expect(formatCedulaPartial(formatCedulaPartial('00112345'))).toBe('001-12345')
	})
})

describe('formatRNCPartial', () => {
	it.each([
		['', ''],
		['130', '130'],
		['1307', '130-7'],
		['13072075', '130-72075'],
		['130720754', '130-72075-4'],
		['0011234567', '001-1234567'],
		['00112345678', '001-1234567-8'],
	])('formats %p as %p', (input, expected) => {
		expect(formatRNCPartial(input)).toBe(expected)
	})

	it('caps at 11 digits', () => {
		expect(formatRNCPartial('001123456789')).toBe('001-1234567-8')
	})
})

describe('formatPhoneNumberPartial', () => {
	it.each([
		['', ''],
		['8', '(8'],
		['809', '(809'],
		['8095', '(809) 5'],
		['809555', '(809) 555'],
		['8095551', '(809) 555-1'],
		['8095551234', '(809) 555-1234'],
	])('formats %p as %p', (input, expected) => {
		expect(formatPhoneNumberPartial(input)).toBe(expected)
	})

	it('ignores a leading country code', () => {
		expect(formatPhoneNumberPartial('1')).toBe('')
		expect(formatPhoneNumberPartial('+1 809 555')).toBe('(809) 555')
		expect(formatPhoneNumberPartial('18095551234')).toBe('(809) 555-1234')
	})

	it('drops non-digits and caps at 10 digits', () => {
		expect(formatPhoneNumberPartial('(809) 555-12345')).toBe('(809) 555-1234')
	})

	it('is idempotent on its own output', () => {
		expect(formatPhoneNumberPartial('(809) 555-1')).toBe('(809) 555-1')
	})
})
