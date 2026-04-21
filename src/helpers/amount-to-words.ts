import { DrUtilsError } from '@/errors/dr-utils-error'

const UNIDADES = [
	'',
	'un',
	'dos',
	'tres',
	'cuatro',
	'cinco',
	'seis',
	'siete',
	'ocho',
	'nueve',
	'diez',
	'once',
	'doce',
	'trece',
	'catorce',
	'quince',
	'dieciséis',
	'diecisiete',
	'dieciocho',
	'diecinueve',
]

const DECENAS = [
	'',
	'diez',
	'veinte',
	'treinta',
	'cuarenta',
	'cincuenta',
	'sesenta',
	'setenta',
	'ochenta',
	'noventa',
]

const VEINTITANTOS = [
	'',
	'veintiún',
	'veintidós',
	'veintitrés',
	'veinticuatro',
	'veinticinco',
	'veintiséis',
	'veintisiete',
	'veintiocho',
	'veintinueve',
]

const CENTENAS = [
	'',
	'cien',
	'doscientos',
	'trescientos',
	'cuatrocientos',
	'quinientos',
	'seiscientos',
	'setecientos',
	'ochocientos',
	'novecientos',
]

function convertUpTo99(n: number): string {
	if (n === 0) return ''
	if (n < 20) return UNIDADES[n]!
	if (n === 20) return 'veinte'
	if (n < 30) return VEINTITANTOS[n - 20]!
	const tens = Math.floor(n / 10)
	const ones = n % 10
	return ones > 0 ? `${DECENAS[tens]!} y ${UNIDADES[ones]!}` : DECENAS[tens]!
}

function convertGroup(n: number): string {
	const hundreds = Math.floor(n / 100)
	const remainder = n % 100
	const centuryPart = hundreds === 0 ? '' : hundreds === 1 && remainder > 0 ? 'ciento' : CENTENAS[hundreds]!
	return [centuryPart, convertUpTo99(remainder)].filter(Boolean).join(' ')
}

function convertInteger(n: number): string {
	if (n === 0) return 'cero'

	const millions = Math.floor(n / 1_000_000)
	const thousands = Math.floor((n % 1_000_000) / 1_000)
	const remainder = n % 1_000

	const parts: string[] = []

	if (millions > 0) {
		parts.push(millions === 1 ? 'un millón' : `${convertGroup(millions)} millones`)
	}

	if (thousands > 0) {
		parts.push(thousands === 1 ? 'mil' : `${convertGroup(thousands)} mil`)
	}

	if (remainder > 0) {
		parts.push(convertGroup(remainder))
	}

	return parts.join(' ')
}

export interface AmountToWordsOptions {
	currency?: 'pesos' | 'dolares' | 'none'
}

/**
 * Converts a number to its Spanish word representation, suitable for checks and invoices.
 * @param value {number} the amount to convert (0–999,999,999.99)
 * @param options {AmountToWordsOptions} controls currency suffix. Defaults to `{ currency: 'pesos' }`.
 * @returns {string} e.g. `"mil doscientos treinta y cuatro pesos con 56 centavos"`
 * @throws {DrUtilsError} if `value` is negative or exceeds 999,999,999.99
 */
export function amountToWords(value: number, options: AmountToWordsOptions = {}): string {
	const { currency = 'pesos' } = options

	if (value < 0 || value > 999_999_999.99) {
		throw new DrUtilsError(
			'AMOUNT_TO_WORDS_OUT_OF_RANGE',
			`Value ${value} is out of range (0–999,999,999.99).`,
		)
	}

	const intPart = Math.floor(value)
	const centsPart = Math.round((value - intPart) * 100)

	let result = convertInteger(intPart)

	if (currency !== 'none') {
		const isPlural = intPart !== 1
		if (currency === 'pesos') {
			result += isPlural ? ' pesos' : ' peso'
		} else {
			result += isPlural ? ' dólares' : ' dólar'
		}
	}

	if (centsPart > 0) {
		const centsWord = centsPart > 1 ? 'centavos' : 'centavo'
		result += ` con ${String(centsPart).padStart(2, '0')} ${centsWord}`
	}

	return result
}
