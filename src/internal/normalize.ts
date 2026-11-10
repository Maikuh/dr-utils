/**
 * Removes surrounding whitespace and all dashes from an identifier.
 * Used so that validators, formatters, parsers and masks agree on what input they accept.
 */
export function stripDashes(input: string): string {
	return input.trim().replace(/-/g, '')
}
