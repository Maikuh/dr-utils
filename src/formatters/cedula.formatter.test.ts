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

import formatCedula from './cedula.formatter'

describe('Cedula Formatter', () => {
	const cedulaWithDashes = '225-0066322-8'
	const cedulaNoDashes = '22500663228'

	it('Cedula "225-0066322-8" should be formatted without dashes', () => {
		const noDashesResult = formatCedula(cedulaWithDashes)

		expect(noDashesResult).toEqual(cedulaNoDashes)
	})

	it('Cedula "22500663228" should be formatted with dashes', () => {
		const withDashesResult = formatCedula(cedulaNoDashes, 'add')

		expect(withDashesResult).toEqual(cedulaWithDashes)
	})
})
