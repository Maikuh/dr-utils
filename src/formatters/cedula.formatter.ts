import { FormatOptions } from '@/types/format-style.type'

/**
 * @param cedula {string} the person's Cedula (11 digits, dashes optional)
 * @param options {FormatOptions} controls dash insertion. Defaults to `{ dashes: true }`.
 * @returns {string} the formatted cedula
 * @throws if `cedula` is not exactly 11 digits after stripping dashes
 */
export function formatCedula(cedula: string, options: FormatOptions = {}): string {
	const { dashes = true } = options
	const digits = cedula.replace(/-/g, '')

	if (digits.length !== 11 || !/^\d{11}$/.test(digits)) {
		throw new Error(`Cannot format cedula "${cedula}": must be 11 digits.`)
	}

	if (dashes) {
		return `${digits.slice(0, 3)}-${digits.slice(3, 10)}-${digits.slice(10)}`
	}

	return digits
}
