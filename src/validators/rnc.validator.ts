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

import { validateCedula } from './cedula.validator'

/**
 * Validates an RNC. Since RNCs can also be a Cedula, this uses the Cedula validator
 * conditionally behind the scenes.
 * @param rnc {string} the entities' RNC/Cedula
 * @returns {boolean} `true` if the RNC/Cedula is valid, `false` otherwise
 */
export function validateRNC(rnc: string): boolean {
	const rncNoDashes = rnc.trim().replace(/-/g, '')

	if (rncNoDashes.length === 11) return validateCedula(rnc)
	if (rncNoDashes.length !== 9) return false

	const baseRnc = [7, 9, 8, 6, 5, 4, 3, 2]
	let sum = 0
	let checker

	const digits = rnc.split('').map(Number)
	const checkDigit = digits[digits.length - 1]

	for (let i = baseRnc.length - 1; i >= 0; i -= 1) {
		sum += baseRnc[i]! * digits[i]!
	}

	const remainder = sum % 11

	switch (remainder) {
		case 0:
			checker = 2
			break
		case 1:
			checker = 1
			break
		default:
			checker = 11 - remainder
			break
	}

	return checker === checkDigit
}

export default validateRNC
