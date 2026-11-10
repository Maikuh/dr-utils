/**
 * Removes separators (dashes and any whitespace) from an identifier.
 * Other characters are kept, so validators still reject letters and symbols.
 * Used so that validators, formatters, parsers, masks and schemas agree on what input they accept.
 */
export function stripSeparators(input: string): string {
	return input.replace(/[\s-]/g, '')
}
