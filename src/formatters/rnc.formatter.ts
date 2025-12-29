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
import { formatCedula } from './cedula.formatter'

/**
 * @param rnc {string} the entities' RNC/Cedula
 * @param style {FormatStyle} determines if dashes are to be removed or added
 * @returns {string} the formatted RNC/Cedula
 */
export function formatRNC(rnc: string, style: FormatStyle = 'with-dashes'): string {
	if (rnc.length === 9 && style === 'with-dashes') {
		return `${rnc.slice(0, 3)}-${rnc.slice(3, 8)}-${rnc.slice(8, 9)}`
	}

	const rncIsRNCWithDashes = rnc.length === 11 && rnc[3] === '-' && rnc[9] === '-'

	if (rncIsRNCWithDashes && style === 'without-dashes') {
		return rnc.replaceAll('-', '')
	}

	const rncIsCedula = rnc.length === 13 || rnc.length === 11

	if (rncIsCedula) return formatCedula(rnc, style)

	throw new Error(`Cannot format RNC "${rnc}".`)
}

export default formatRNC
