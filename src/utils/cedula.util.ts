import { formatCedula } from '@/formatters/cedula.formatter'
import { ParsedCedula } from '@/types/parsed-cedula.type'
import { validateCedula } from '@/validators/cedula.validator'

export function parseCedula(cedula: string): ParsedCedula {
	const digits = cedula.replace(/-/g, '')
	if (!validateCedula(digits)) throw new Error(`"${cedula}" is not a valid cedula.`)
	return {
		municipioCode: digits.slice(0, 3),
		sequence: digits.slice(3, 10),
		checkDigit: digits.slice(10),
		formatted: formatCedula(digits),
	}
}
