import formatPhoneNumber from './phone.formatter'

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
})
