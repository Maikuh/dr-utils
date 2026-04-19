import { DrUtilsError } from '@/errors/dr-utils-error'
import { formatPhoneNumber } from './phone.formatter'

describe('Phone Number Formatter', () => {
	it('Phone Number "8092201111" should be formatted correctly (National)', () => {
		const phoneNumber = '8092201111'
		const expected = '(809) 220-1111'
		const formatted = formatPhoneNumber(phoneNumber)

		expect(formatted).toEqual(expected)
	})

	it('Phone Number "8092201111" should be formatted correctly (International)', () => {
		const phoneNumber = '8092201111'
		const expected = '+18092201111'
		const formatted = formatPhoneNumber(phoneNumber, true)

		expect(formatted).toEqual(expected)
	})

	it('throws on non-DR phone number', () => {
		expect(() => formatPhoneNumber('7815754238')).toThrow()
	})

	it('throws DrUtilsError with FORMAT_PHONE_FAILED code', () => {
		try {
			formatPhoneNumber('7815754238')
		} catch (e) {
			expect(e).toBeInstanceOf(DrUtilsError)
			expect((e as DrUtilsError).code).toBe('FORMAT_PHONE_FAILED')
		}
	})
})
