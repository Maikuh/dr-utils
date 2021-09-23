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
 * @param cedula {string} the person's Cedula
 * @param removeOrAddDashes determines if dashes are to be removed or added
 * @returns {('add'|'remove')} the formatted cedula
 */
export function formatCedula(
  cedula: string,
  removeOrAddDashes: 'remove' | 'add' = 'remove',
) {
  if (removeOrAddDashes === 'remove') {
    if (!cedula.includes('-')) throw new Error(`The Cedula ${cedula} does not contain dashes.`)

    return cedula.replaceAll('-', '')
  }

  if (cedula.includes('-')) throw new Error(`The Cedula ${cedula} already contains dashes.`)

  return `${cedula.slice(0, 3)}-${cedula.slice(3, 10)}-${cedula.slice(10, 11)}`
}

export default formatCedula
