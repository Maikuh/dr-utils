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
		const expected = '+1 809 220 1111'
		const formatted = formatPhoneNumber(phoneNumber, true)

		expect(formatted).toEqual(expected)
	})
})
