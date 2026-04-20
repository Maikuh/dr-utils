import { DrUtilsError } from '@/errors/dr-utils-error'
import { amountToWords } from './amount-to-words'

describe('amountToWords', () => {
	it.each([
		[0, {}, 'cero pesos'],
		[1, {}, 'un peso'],
		[2, {}, 'dos pesos'],
		[10, {}, 'diez pesos'],
		[11, {}, 'once pesos'],
		[15, {}, 'quince pesos'],
		[16, {}, 'dieciséis pesos'],
		[20, {}, 'veinte pesos'],
		[21, {}, 'veintiún pesos'],
		[29, {}, 'veintinueve pesos'],
		[30, {}, 'treinta pesos'],
		[31, {}, 'treinta y un pesos'],
		[99, {}, 'noventa y nueve pesos'],
		[100, {}, 'cien pesos'],
		[101, {}, 'ciento un pesos'],
		[200, {}, 'doscientos pesos'],
		[500, {}, 'quinientos pesos'],
		[999, {}, 'novecientos noventa y nueve pesos'],
		[1000, {}, 'mil pesos'],
		[1001, {}, 'mil un pesos'],
		[1100, {}, 'mil cien pesos'],
		[2000, {}, 'dos mil pesos'],
		[10000, {}, 'diez mil pesos'],
		[100000, {}, 'cien mil pesos'],
		[1000000, {}, 'un millón pesos'],
		[2000000, {}, 'dos millones pesos'],
		[1234.56, {}, 'mil doscientos treinta y cuatro pesos con 56 centavos'],
		[0.5, {}, 'cero pesos con 50 centavos'],
		[1.01, {}, 'un peso con 01 centavo'],
	] as const)('amountToWords(%s, %o) → "%s"', (value, options, expected) => {
		expect(amountToWords(value, options)).toBe(expected)
	})

	it('supports currency: dolares', () => {
		expect(amountToWords(1, { currency: 'dolares' })).toBe('un dólar')
		expect(amountToWords(2, { currency: 'dolares' })).toBe('dos dólares')
	})

	it('supports currency: none', () => {
		expect(amountToWords(1, { currency: 'none' })).toBe('un')
		expect(amountToWords(1234.56, { currency: 'none' })).toBe(
			'mil doscientos treinta y cuatro con 56 centavos',
		)
	})

	it('throws DrUtilsError for negative values', () => {
		expect(() => amountToWords(-1)).toThrow(DrUtilsError)
		const err = (() => {
			try {
				amountToWords(-1)
			} catch (e) {
				return e
			}
		})()
		expect((err as DrUtilsError).code).toBe('AMOUNT_TO_WORDS_OUT_OF_RANGE')
	})

	it('throws DrUtilsError for values over 999,999,999.99', () => {
		expect(() => amountToWords(1_000_000_000)).toThrow(DrUtilsError)
	})
})
