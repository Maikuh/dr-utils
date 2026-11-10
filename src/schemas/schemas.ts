import { findMunicipio, findProvincia } from '@/helpers/provincia-lookup'
import { stripSeparators } from '@/internal/normalize'
import { normalizePhoneNumber } from '@/parsers/phone.parser'
import { Cedula, NCF, PhoneNumber, Plate, RNC } from '@/types/branded.type'
import { Municipio, Provincia } from '@/types/municipio-provincia.type'
import { StandardSchemaV1 } from '@/types/standard-schema.type'
import { validateCedula } from '@/validators/cedula.validator'
import { validateNCF } from '@/validators/ncf.validator'
import { validatePhoneNumber } from '@/validators/phone.validator'
import { validatePlate } from '@/validators/plate.validator'
import { validateRNC } from '@/validators/rnc.validator'

export interface SchemaOptions {
	/** Message reported when validation fails. Use it to localize errors, e.g. `'Cédula inválida'`. */
	message?: string
}

/** A Standard Schema that takes a string and outputs a normalized value of type `Output`. */
export type DrUtilsSchema<Output> = StandardSchemaV1<string, Output>

function createSchema<Output>(
	normalize: (input: string) => Output | undefined,
	message: string,
): DrUtilsSchema<Output> {
	return {
		'~standard': {
			version: 1,
			vendor: 'dr-utils',
			validate(value) {
				if (typeof value !== 'string') return { issues: [{ message }] }
				const output = normalize(value)
				return output === undefined ? { issues: [{ message }] } : { value: output }
			},
		},
	}
}

/**
 * Standard Schema for a Cedula. Accepts dashes and spaces.
 * Outputs the 11-digit normalized `Cedula`.
 * @param options {SchemaOptions} optional custom error message
 * @returns {DrUtilsSchema<Cedula>}
 */
export function cedulaSchema(options: SchemaOptions = {}): DrUtilsSchema<Cedula> {
	return createSchema(
		(input) => (validateCedula(input) ? (stripSeparators(input) as Cedula) : undefined),
		options.message ?? 'Invalid cedula',
	)
}

/**
 * Standard Schema for an RNC (9 digits) or Cedula (11 digits). Accepts dashes and spaces.
 * Outputs the digits-only `RNC`.
 * @param options {SchemaOptions} optional custom error message
 * @returns {DrUtilsSchema<RNC>}
 */
export function rncSchema(options: SchemaOptions = {}): DrUtilsSchema<RNC> {
	return createSchema(
		(input) => (validateRNC(input) ? (stripSeparators(input) as RNC) : undefined),
		options.message ?? 'Invalid RNC',
	)
}

/**
 * Standard Schema for an NCF or e-CF. Surrounding whitespace is trimmed.
 * @param options {SchemaOptions} optional custom error message
 * @returns {DrUtilsSchema<NCF>}
 */
export function ncfSchema(options: SchemaOptions = {}): DrUtilsSchema<NCF> {
	return createSchema((input) => {
		const ncf = input.trim()
		return validateNCF(ncf) ? (ncf as NCF) : undefined
	}, options.message ?? 'Invalid NCF')
}

/**
 * Standard Schema for a DR phone number (809/829/849). Accepts any common formatting.
 * Outputs the 10-digit normalized `PhoneNumber`, e.g. `'8095551234'`.
 * @param options {SchemaOptions} optional custom error message
 * @returns {DrUtilsSchema<PhoneNumber>}
 */
export function phoneNumberSchema(options: SchemaOptions = {}): DrUtilsSchema<PhoneNumber> {
	return createSchema(
		(input) =>
			validatePhoneNumber(input) ? (normalizePhoneNumber(input) as PhoneNumber) : undefined,
		options.message ?? 'Invalid phone number',
	)
}

/**
 * Standard Schema for a DR license plate (case-insensitive). Outputs the uppercase `Plate`.
 * @param options {SchemaOptions} optional custom error message
 * @returns {DrUtilsSchema<Plate>}
 */
export function plateSchema(options: SchemaOptions = {}): DrUtilsSchema<Plate> {
	return createSchema((input) => {
		const plate = input.trim().toUpperCase()
		return validatePlate(plate) ? (plate as Plate) : undefined
	}, options.message ?? 'Invalid license plate')
}

/**
 * Standard Schema for a province name, matched like `findProvincia` (ignores case and accents).
 * Outputs the official `Provincia` name, e.g. `'dajabon'` → `'Dajabón'`.
 * @param options {SchemaOptions} optional custom error message
 * @returns {DrUtilsSchema<Provincia>}
 */
export function provinciaSchema(options: SchemaOptions = {}): DrUtilsSchema<Provincia> {
	return createSchema(findProvincia, options.message ?? 'Invalid provincia')
}

/**
 * Standard Schema for a municipality name, matched like `findMunicipio` (ignores case and accents).
 * Outputs the official `Municipio` name.
 * @param options {SchemaOptions} optional custom error message
 * @returns {DrUtilsSchema<Municipio>}
 */
export function municipioSchema(options: SchemaOptions = {}): DrUtilsSchema<Municipio> {
	return createSchema(findMunicipio, options.message ?? 'Invalid municipio')
}
