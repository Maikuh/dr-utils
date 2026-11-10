function digitsOnly(input: string, maxLength: number): string {
	return input.replace(/\D/g, '').slice(0, maxLength)
}

/**
 * Formats a Cedula as the user types it. Non-digits are dropped, input is capped at 11 digits
 * and dashes are inserted as soon as the next group starts (`'00112'` → `'001-12'`).
 * Never throws and never validates — pair it with `validateCedula` or `cedulaSchema` on submit.
 * @param input {string} partial or complete user input
 * @returns {string} the progressively formatted value
 */
export function formatCedulaPartial(input: string): string {
	const digits = digitsOnly(input, 11)

	if (digits.length <= 3) return digits
	if (digits.length <= 10) return `${digits.slice(0, 3)}-${digits.slice(3)}`

	return `${digits.slice(0, 3)}-${digits.slice(3, 10)}-${digits.slice(10)}`
}

/**
 * Formats an RNC (or Cedula) as the user types it. Up to 9 digits are formatted as an RNC
 * (`'130-72075-4'`); a 10th or 11th digit switches to the Cedula layout (`'001-1234567-8'`).
 * Never throws and never validates.
 * @param input {string} partial or complete user input
 * @returns {string} the progressively formatted value
 */
export function formatRNCPartial(input: string): string {
	const digits = digitsOnly(input, 11)

	if (digits.length > 9) return formatCedulaPartial(digits)
	if (digits.length <= 3) return digits
	if (digits.length <= 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`

	return `${digits.slice(0, 3)}-${digits.slice(3, 8)}-${digits.slice(8)}`
}

/**
 * Formats a DR phone number as the user types it, in the national layout `(809) 555-1234`.
 * Non-digits are dropped, a leading `1` country code is ignored, and input is capped at 10 digits.
 * Never throws and never validates.
 * @param input {string} partial or complete user input
 * @returns {string} the progressively formatted value
 */
export function formatPhoneNumberPartial(input: string): string {
	// DR area codes start with 8, so a leading 1 can only be the country code
	const digits = digitsOnly(input.replace(/^\D*1/, ''), 10)

	if (digits.length === 0) return ''
	if (digits.length <= 3) return `(${digits}`
	if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`

	return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}
