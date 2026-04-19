import { NCFTypeCode, NCFTypes } from '@/constants/ncf-types.constant'
import { formatNCF } from '@/formatters/ncf.formatter'
import { ParsedNCF } from '@/types/parsed-ncf.type'
import { validateNCF } from '@/validators/ncf.validator'

export function parseNCF(ncf: string): ParsedNCF {
	if (!validateNCF(ncf)) throw new Error(`"${ncf}" is not a valid NCF.`)
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
