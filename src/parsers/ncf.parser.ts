import { NCFTypeCode, NCFTypes } from '@/constants/ncf-types.constant'
import { DrUtilsError } from '@/errors/dr-utils-error'
import { formatNCF } from '@/formatters/ncf.formatter'
import { ParsedNCF } from '@/types/parsed-ncf.type'
import { validateNCF } from '@/validators/ncf.validator'

/**
 * Parses a Dominican Republic NCF (fiscal invoice number) into its components.
 * @param ncf {string} the invoice's NCF (11-char physical or 13-char electronic)
 * @returns {ParsedNCF} series, type code, type name, sequence, kind, and formatted string
 * @throws {DrUtilsError} if `ncf` is not a valid NCF
 */
export function parseNCF(ncf: string): ParsedNCF {
	if (!validateNCF(ncf)) throw new DrUtilsError('INVALID_NCF', `"${ncf}" is not a valid NCF.`)
	const series = ncf.slice(0, 1)
	const typeCode = ncf.slice(1, 3) as NCFTypeCode
	const kind = ncf.length === 11 ? 'physical' : 'electronic'
	return {
		series,
		typeCode,
		typeName: NCFTypes[typeCode],
		sequence: ncf.slice(3),
		kind,
		formatted: formatNCF(ncf),
	}
}
