/**
 *
 * @param rnc {string} the person's Cedula
 * @returns {boolean} `true` if the Cedula is valid, `false` otherwise
 */
export function validateCedula(cedula: string): boolean {
	let total = 0
	const cedulaNoDashes = cedula.trim().replace(/-/g, '')
	const digits = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1]

	if (cedulaNoDashes.length !== 11) return false

	for (let i = 1; i <= cedulaNoDashes.length; i += 1) {
		const calculation = Number(cedulaNoDashes.slice(i - 1, i)) * digits[i - 1]!

		if (calculation < 10) total += calculation
		else {
			total +=
				Number(calculation.toString().substr(0, 1)) + Number(calculation.toString().substr(1, 1))
		}
	}

	if (total % 10 === 0) return true

	return false
}

export default validateCedula
