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

import validateRNC from './rnc.validator'

describe('RNC Validator', () => {
	let rncs: string[]

	beforeAll(async () => {
		rncs = await Bun.file('assets/rncs.json').json()
	})

	it('All RNCs should be valid', () => {
		const allValid = rncs.every((rnc) => {
			const isValid = validateRNC(rnc)

			if (!isValid) console.log('Failed RNC:', rnc)

			return isValid
		})

		expect(allValid).toBeTruthy()
	})

	it('RNC "130502395" should be invalid', () => {
		const result = validateRNC('130502395')

		expect(result).toBeFalsy()
	})

	it('Wrong length RNC "13050239" should be invalid', () => {
		const result = validateRNC('13050239')

		expect(result).toBeFalsy()
	})
})
