import { Cedula, NCF, PhoneNumber, Plate, RNC } from '@/types/branded.type'
import { ParsedCedula } from '@/types/parsed-cedula.type'
import { ParsedNCF } from '@/types/parsed-ncf.type'
import { ParsedPhoneNumber } from '@/types/parsed-phone-number.type'
import { ParsedPlate } from '@/types/parsed-plate.type'
import { ParsedRNC } from '@/types/parsed-rnc.type'
import { Result } from '@/types/result.type'
import { parseCedula } from './cedula.parser'
import { parseNCF } from './ncf.parser'
import { parsePhoneNumber } from './phone.parser'
import { parsePlate } from './plate.parser'
import { parseRNC } from './rnc.parser'

/**
 * Parses a Cedula without throwing — returns a `Result` instead.
 * On success, the value includes a `raw` field of branded type `Cedula` (digits-only, normalized).
 * @param input {string} the person's Cedula (11 digits, dashes optional)
 * @returns {Result<ParsedCedula & { raw: Cedula }>}
 */
export function safeParseCedula(input: string): Result<ParsedCedula & { raw: Cedula }> {
	try {
		const value = parseCedula(input)
		const raw = input.replace(/-/g, '') as Cedula
		return { ok: true, value: { ...value, raw } }
	} catch (e) {
		return { ok: false, error: (e as Error).message }
	}
}

/**
 * Parses an RNC or Cedula without throwing — returns a `Result` instead.
 * On success, the value includes a `raw` field of branded type `RNC` (digits-only, normalized).
 * @param input {string} the entity's RNC (9 digits) or Cedula (11 digits), dashes optional
 * @returns {Result<ParsedRNC & { raw: RNC }>}
 */
export function safeParseRNC(input: string): Result<ParsedRNC & { raw: RNC }> {
	try {
		const value = parseRNC(input)
		const raw = input.replace(/\D/g, '') as RNC
		return { ok: true, value: { ...value, raw } as ParsedRNC & { raw: RNC } }
	} catch (e) {
		return { ok: false, error: (e as Error).message }
	}
}

/**
 * Parses an NCF without throwing — returns a `Result` instead.
 * On success, the value includes a `raw` field of branded type `NCF`.
 * @param input {string} the invoice's NCF (11-char physical or 13-char electronic)
 * @returns {Result<ParsedNCF & { raw: NCF }>}
 */
export function safeParseNCF(input: string): Result<ParsedNCF & { raw: NCF }> {
	try {
		const value = parseNCF(input)
		return { ok: true, value: { ...value, raw: input as NCF } }
	} catch (e) {
		return { ok: false, error: (e as Error).message }
	}
}

/**
 * Parses a DR phone number without throwing — returns a `Result` instead.
 * On success, the value includes a `raw` field of branded type `PhoneNumber` (10-digit normalized form).
 * @param input {string} a valid DR phone number (809/829/849 area codes)
 * @returns {Result<ParsedPhoneNumber & { raw: PhoneNumber }>}
 */
export function safeParsePhoneNumber(
	input: string,
): Result<ParsedPhoneNumber & { raw: PhoneNumber }> {
	try {
		const value = parsePhoneNumber(input)
		const raw = `${value.areaCode}${value.prefix}${value.line}` as PhoneNumber
		return { ok: true, value: { ...value, raw } }
	} catch (e) {
		return { ok: false, error: (e as Error).message }
	}
}

/**
 * Parses a DR license plate without throwing — returns a `Result` instead.
 * On success, the value includes a `raw` field of branded type `Plate` (uppercase normalized form).
 * @param input {string} the license plate (case-insensitive)
 * @returns {Result<ParsedPlate & { raw: Plate }>}
 */
export function safeParsePlate(input: string): Result<ParsedPlate & { raw: Plate }> {
	try {
		const value = parsePlate(input)
		return { ok: true, value: { ...value, raw: value.formatted as Plate } }
	} catch (e) {
		return { ok: false, error: (e as Error).message }
	}
}
