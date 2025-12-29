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

import validateCedula from './cedula.validator'

describe('Cedula Validator', () => {
	let cedulas: string[]

	beforeAll(async () => {
		cedulas = await Bun.file('assets/cedulas.json').json()
	})

	it('All Cedulas should be valid', () => {
		const allValid = cedulas.every((cedula) => {
			const isValid = validateCedula(cedula)

			if (!isValid) console.log('Failed cedula:', cedula)

			return isValid
		})

		expect(allValid).toBeTruthy()
	})

	it('Cedula "40213094215" should be invalid', () => {
		const result = validateCedula('40213094215')

		expect(result).toBeFalsy()
	})

	it('Wrong length Cedula "4021309421" should be invalid', () => {
		const result = validateCedula('4021309421')

		expect(result).toBeFalsy()
	})
})
