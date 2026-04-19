import { formatRNC } from '@/formatters/rnc.formatter'
import { ParsedRNC } from '@/types/parsed-rnc.type'
import { validateRNC } from '@/validators/rnc.validator'
import { parseCedula } from './cedula.util'

export function parseRNC(rnc: string): ParsedRNC {
	const digits = rnc.replace(/\D/g, '')
	if (!validateRNC(digits)) throw new Error(`"${rnc}" is not a valid RNC or cedula.`)
	if (digits.length === 11) return { kind: 'cedula', ...parseCedula(digits) }
	return {
		kind: 'rnc',
		sequence: digits.slice(0, 8),
		checkDigit: digits.slice(8),
		formatted: formatRNC(digits),
	}
}
