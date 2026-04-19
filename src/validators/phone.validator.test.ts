import { validatePhoneNumber } from './phone.validator'

describe('Phone Number Validator', () => {
	let phoneNumbers: string[]
	let invalidPhoneNumbers: string[]

	beforeAll(async () => {
		phoneNumbers = await Bun.file('assets/phone-numbers.json').json()
		invalidPhoneNumbers = await Bun.file('assets/invalid-phone-numbers.json').json()
	})

	it('All phone numbers should be valid', () => {
		const allValid = phoneNumbers.every((phoneNumber) => {
			const isValid = validatePhoneNumber(phoneNumber)

			if (!isValid) console.log('Failed Phone Number:', phoneNumber)

			return isValid
		})

		expect(allValid).toBeTruthy()
	})

	it('All invalid phone numbers should fail validation', () => {
		const noneValid = invalidPhoneNumbers.every((n) => !validatePhoneNumber(n))
		expect(noneValid).toBe(true)
	})
})
