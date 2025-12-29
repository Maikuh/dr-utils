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

import validateNCF from './ncf.validator'

describe('NCF Validator', () => {
	it('Physical NCF "B0183920391" should be valid', () => {
		const isNCFValid = validateNCF('B0183920391')

		expect(isNCFValid).toBeTruthy()
	})

	it('Electronic NCF (e-CF) "E319320341237" should be valid', () => {
		const isNCFValid = validateNCF('E319320341237')

		expect(isNCFValid).toBeTruthy()
	})

	it('Physical NCF "B0883920391" invalid set', () => {
		const isNCFValid = validateNCF('B0883920391')

		expect(isNCFValid).toBeFalsy()
	})

	it('Electronic NCF (e-CF) "E38932034123" invalid set', () => {
		const isNCFValid = validateNCF('E38932034123')

		expect(isNCFValid).toBeFalsy()
	})

	it('Physical NCF "B018392039" invalid sequence', () => {
		const isNCFValid = validateNCF('B088392039')

		expect(isNCFValid).toBeFalsy()
	})

	it('Electronic NCF (e-CF) "E3193203412" invalid sequence', () => {
		const isNCFValid = validateNCF('E3893203412')

		expect(isNCFValid).toBeFalsy()
	})

	it('NCF with invalid length "B0183920391234" should be invalid', () => {
		const isNCFValid = validateNCF('B0183920391234')

		expect(isNCFValid).toBeFalsy()
	})
})
