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
 * @returns {boolean} `true` if the number is valid, `false` otherwise
 */
export function validatePhoneNumber(phoneNumber: string): boolean {
  const stripped = phoneNumber.replace(PHONE_NUMBER_EXTRACT_REGEX, '')

  return new RegExp(PHONE_NUMBER_VALID_REGEX).test(stripped)
}

export default validatePhoneNumber
