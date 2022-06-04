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

import {
  PHONE_NUMBER_EXTRACT_REGEX,
  PHONE_NUMBER_VALID_REGEX,
} from '../constants/phone-number.regex'

/**
 * @param phoneNumber {string} the phone number
 * @param international {boolean} if the output is national
 * format (`false`) or international (`true`)
 * @returns {string} the formatted phone number
 */
export function formatPhoneNumber(
  phoneNumber: string,
  international: boolean = false,
): string {
  const digitsOnly = phoneNumber.replace(PHONE_NUMBER_EXTRACT_REGEX, '')
  const matches = PHONE_NUMBER_VALID_REGEX.exec(digitsOnly)

  if (!matches) throw new Error(`Phone Number "${phoneNumber}" is not valid`)

  const areaCode = matches[1]
  const prefix = matches[2]
  const line = matches[3]

  if (!international) {
    return `(${areaCode}) ${prefix}-${line}`
  }

  return `+1 ${areaCode} ${prefix} ${line}`
}

export default formatPhoneNumber
