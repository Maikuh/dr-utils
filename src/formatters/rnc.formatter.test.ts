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

import formatRNC from './rnc.formatter'

describe('RNC Formatter', () => {
	const rncNoDashes = '130720754'
	const rncWithDashes = '130-72075-4'
	const cedulaNoDashes = '22500663228'
	const cedulaWithDashes = '225-0066322-8'

	it('RNC "130720754" should be formatted with dashes', () => {
		const withDashesResult = formatRNC(rncNoDashes, 'add')

		expect(withDashesResult).toEqual(rncWithDashes)
	})

	it('RNC "130-72075-4" should be formatted without dashes', () => {
		const noDashesResult = formatRNC(rncWithDashes)

		expect(noDashesResult).toEqual(rncNoDashes)
	})

	it('RNC formatter accepts cedula "22500663228" and should format it with dashes', () => {
		const withDashesResult = formatRNC(cedulaNoDashes, 'add')

		expect(withDashesResult).toEqual(cedulaWithDashes)
	})

	it('RNC formatter accepts cedula "225-0066322-8" and should format it without dashes', () => {
		const noDashesResult = formatRNC(cedulaWithDashes)

		expect(noDashesResult).toEqual(cedulaNoDashes)
	})
})
