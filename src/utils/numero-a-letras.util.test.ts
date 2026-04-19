import { DrUtilsError } from '@/errors/dr-utils-error'
import { numeroALetras } from './numero-a-letras.util'

describe('numeroALetras', () => {
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
		[1234.56, {}, 'mil doscientos treinta y cuatro pesos con 56/100'],
		[0.5, {}, 'cero pesos con 50/100'],
		[1.01, {}, 'un peso con 01/100'],
	] as const)('numeroALetras(%s, %o) → "%s"', (value, options, expected) => {
		expect(numeroALetras(value, options)).toBe(expected)
	})

	it('supports moneda: dolares', () => {
		expect(numeroALetras(1, { moneda: 'dolares' })).toBe('un dólar')
		expect(numeroALetras(2, { moneda: 'dolares' })).toBe('dos dólares')
	})

	it('supports moneda: none', () => {
		expect(numeroALetras(1, { moneda: 'none' })).toBe('un')
		expect(numeroALetras(1234.56, { moneda: 'none' })).toBe(
			'mil doscientos treinta y cuatro con 56/100',
		)
	})

	it('throws DrUtilsError for negative values', () => {
		expect(() => numeroALetras(-1)).toThrow(DrUtilsError)
		const err = (() => {
			try {
				numeroALetras(-1)
			} catch (e) {
				return e
			}
		})()
		expect((err as DrUtilsError).code).toBe('NUMERO_A_LETRAS_OUT_OF_RANGE')
	})

	it('throws DrUtilsError for values over 999,999,999.99', () => {
		expect(() => numeroALetras(1_000_000_000)).toThrow(DrUtilsError)
	})
})
