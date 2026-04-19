import { ParsedCedula } from '@/types/parsed-cedula.type'
import { ParsedNCF } from '@/types/parsed-ncf.type'
import { ParsedPhoneNumber } from '@/types/parsed-phone-number.type'
import { ParsedRNC } from '@/types/parsed-rnc.type'
import { Result } from '@/types/result.type'
import { parseCedula } from './cedula.util'
import { parseNCF } from './ncf.util'
import { parsePhoneNumber } from './phone.util'
import { parseRNC } from './rnc.util'

export function safeParseCedula(input: string): Result<ParsedCedula> {
	try {
		return { ok: true, value: parseCedula(input) }
	} catch (e) {
		return { ok: false, error: (e as Error).message }
	}
}

export function safeParseRNC(input: string): Result<ParsedRNC> {
	try {
		return { ok: true, value: parseRNC(input) }
	} catch (e) {
		return { ok: false, error: (e as Error).message }
	}
}

export function safeParseNCF(input: string): Result<ParsedNCF> {
	try {
		return { ok: true, value: parseNCF(input) }
	} catch (e) {
		return { ok: false, error: (e as Error).message }
	}
}

export function safeParsePhoneNumber(input: string): Result<ParsedPhoneNumber> {
	try {
		return { ok: true, value: parsePhoneNumber(input) }
	} catch (e) {
		return { ok: false, error: (e as Error).message }
	}
}
