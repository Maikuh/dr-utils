import type { NCFTypeCode } from '@/constants/ncf-types.constant'

export type NCFKind = 'physical' | 'electronic'

export interface ParsedNCF {
	series: string
	typeCode: NCFTypeCode
	typeName: string
	sequence: string
	kind: NCFKind
	formatted: string
}
