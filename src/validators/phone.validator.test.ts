/*
dr-utils: Utilities relevant to the Dominican Republic
Copyright (C) 2026  Miguel Araujo

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

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
