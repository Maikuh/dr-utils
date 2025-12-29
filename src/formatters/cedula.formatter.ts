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

import { FormatStyle } from '../types'

/**
 * @param cedula {string} the person's Cedula
 * @param style {FormatStyle} determines if dashes are to be removed or added. Defaults to 'with-dashes'.
 * @returns {string} the formatted cedula
 */
export function formatCedula(cedula: string, style: FormatStyle = 'with-dashes'): string {
	const isCedulaWithDashes = cedula.length === 13 && cedula[3] === '-' && cedula[11] === '-'

	if (style === 'with-dashes') {
		if (isCedulaWithDashes) return cedula

		return `${cedula.slice(0, 3)}-${cedula.slice(3, 10)}-${cedula.slice(10, 11)}`
	}

	const isCedulaWithoutDashes = cedula.length === 11 && !cedula.includes('-')

	if (style === 'without-dashes') {
		if (isCedulaWithoutDashes) return cedula

		return cedula.replaceAll('-', '')
	}

	throw new Error(`Cannot format cedula "${cedula}".`)
}

export default formatCedula
