/*
dr-utils: Utilities relevant to the Dominican Republic
Copyright (C) 2021  Miguel Araujo

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

import { formatCedula, formatPhoneNumber, formatRNC } from '../src'

describe('Formatters', () => {
  it('Cedula "22500663228" should be formatted correctly', () => {
    const cedulaNoDashes = '22500663228'
    const cedulaWithDashes = '225-0066322-8'

    const noDashesResult = formatCedula(cedulaWithDashes)
    const withDashesResult = formatCedula(cedulaNoDashes, 'add')

    expect(noDashesResult).toEqual(cedulaNoDashes)
    expect(withDashesResult).toEqual(cedulaWithDashes)
  })

  it('RNC "130720754" should be formatted correctly', () => {
    const rncNoDashes = '130720754'
    const rncWithDashes = '130-72075-4'

    const noDashesResult = formatRNC(rncWithDashes)
    const withDashesResult = formatRNC(rncNoDashes, 'add')

    expect(noDashesResult).toEqual(rncNoDashes)
    expect(withDashesResult).toEqual(rncWithDashes)
  })

  it('RNC formatter accepts cedula "22500663228" and should format it correctly', () => {
    const cedulaNoDashes = '22500663228'
    const cedulaWithDashes = '225-0066322-8'

    const noDashesResult = formatRNC(cedulaWithDashes)
    const withDashesResult = formatRNC(cedulaNoDashes, 'add')

    expect(noDashesResult).toEqual(cedulaNoDashes)
    expect(withDashesResult).toEqual(cedulaWithDashes)
  })

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
