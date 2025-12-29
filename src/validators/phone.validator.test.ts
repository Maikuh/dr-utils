import validatePhoneNumber from './phone.validator'

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

	it('All phone numbers should be invalid', () => {
		const allValid = invalidPhoneNumbers.every((invalidPhoneNumber) => {
			const isValid = validatePhoneNumber(invalidPhoneNumber)

			if (isValid) console.log('Failed Phone Number:', invalidPhoneNumber)

			return isValid
		})

		expect(allValid).toBeFalsy()
	})
})
