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

import { readFile } from 'fs/promises'
import {
  validateCedula,
  validateNCF,
  validatePhoneNumber,
  validateRNC,
} from '../src'

describe('Validators', () => {
  let rncs: string[]
  let cedulas: string[]
  let phoneNumbers: string[]
  let invalidPhoneNumbers: string[]

  beforeAll(async () => {
    rncs = JSON.parse((await readFile('assets/rncs.json')).toString())
    cedulas = JSON.parse((await readFile('assets/cedulas.json')).toString())
    phoneNumbers = JSON.parse(
      (await readFile('assets/phone-numbers.json')).toString(),
    )
    invalidPhoneNumbers = JSON.parse(
      (await readFile('assets/invalid-phone-numbers.json')).toString(),
    )
  })

  it('All Cedulas should be valid', () => {
    const allValid = cedulas.every((cedula) => {
      const isValid = validateCedula(cedula)

      if (!isValid) console.log('Failed cedula:', cedula)

      return isValid
    })

    expect(allValid).toBeTruthy()
  })

  it('All RNCs should be valid', () => {
    const allValid = rncs.every((rnc) => {
      const isValid = validateRNC(rnc)

      if (!isValid) console.log('Failed RNC:', rnc)

      return isValid
    })

    expect(allValid).toBeTruthy()
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

  it('Cedula "40213094215" should be invalid', () => {
    const result = validateCedula('40213094215')

    expect(result).toBeFalsy()
  })

  it('RNC "130502395" should be invalid', () => {
    const result = validateRNC('130502395')

    expect(result).toBeFalsy()
  })

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
})
