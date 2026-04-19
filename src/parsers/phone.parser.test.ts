import { DrUtilsError } from '@/errors/dr-utils-error'
import { normalizePhoneNumber, parsePhoneNumber } from './phone.parser'

describe('parsePhoneNumber', () => {
	it('parses a bare 10-digit number into components', () => {
		const result = parsePhoneNumber('8092201111')
		expect(result.areaCode).toBe('809')
		expect(result.prefix).toBe('220')
		expect(result.line).toBe('1111')
		expect(result.national).toBe('(809) 220-1111')
		expect(result.international).toBe('+18092201111')
	})

	it('parses a formatted number "(829) 555-3000"', () => {
		const result = parsePhoneNumber('(829) 555-3000')
		expect(result.areaCode).toBe('829')
		expect(result.prefix).toBe('555')
		expect(result.line).toBe('3000')
	})

	it('parses a number with country code prefix "18492001234"', () => {
		const result = parsePhoneNumber('18492001234')
		expect(result.areaCode).toBe('849')
	})

	it('throws on a non-DR number', () => {
		expect(() => parsePhoneNumber('7815754238')).toThrow()
	})

	it('throws on an empty string', () => {
		expect(() => parsePhoneNumber('')).toThrow()
	})

	it('throws DrUtilsError with INVALID_PHONE code', () => {
		try {
			parsePhoneNumber('7815754238')
		} catch (e) {
			expect(e).toBeInstanceOf(DrUtilsError)
			expect((e as DrUtilsError).code).toBe('INVALID_PHONE')
		}
	})
})

describe('normalizePhoneNumber', () => {
	it('strips formatting and returns 10-digit string', () => {
		expect(normalizePhoneNumber('(809) 220-1111')).toBe('8092201111')
	})

	it('handles country code prefix', () => {
		expect(normalizePhoneNumber('18092201111')).toBe('8092201111')
	})

	it('returns a bare 10-digit number unchanged', () => {
		expect(normalizePhoneNumber('8492001234')).toBe('8492001234')
	})

	it('throws on a non-DR number', () => {
		expect(() => normalizePhoneNumber('7815754238')).toThrow()
	})
})
