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

/**
 * Validates both physical (NCF) and electronic (e-CF) NCFs
 * @param ncf {string} the invoices' NCF
 * @returns {boolean} `true` if the NCF is valid, `false` otherwise
 */
export function validateNCF(ncf: string): boolean {
  // NCF
  if (ncf.length === 11) {
    return ncf.match(/^[A-Z](0[1-4]|1[1-7])\d{8}$/g) != null
  }

  // eNCF
  if (ncf.length === 13) {
    return ncf.match(/^[A-Z](3[1-4]|41|4[3-5])\d{10}$/g) != null
  }

  return false
}

export default validateNCF
