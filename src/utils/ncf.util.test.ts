import { parseNCF } from './ncf.util'

describe('parseNCF', () => {
	it('parses a physical NCF', () => {
		const result = parseNCF('B0183920391')
		expect(result.kind).toBe('physical')
		expect(result.series).toBe('B')
		expect(result.typeCode).toBe('01')
		expect(result.typeName).toBe('Factura de Crédito Fiscal')
		expect(result.sequence).toBe('83920391')
		expect(result.formatted).toBe('B01-83920391')
	})

	it('parses an electronic NCF (e-CF)', () => {
		const result = parseNCF('E319320341237')
		expect(result.kind).toBe('electronic')
		expect(result.series).toBe('E')
		expect(result.typeCode).toBe('31')
		expect(result.typeName).toBe('Factura de Crédito Fiscal Electrónica')
		expect(result.sequence).toBe('9320341237')
		expect(result.formatted).toBe('E31-9320341237')
	})

	it.each([
		['02', 'Factura de Consumo'],
		['11', 'Comprobante de Compras'],
		['15', 'Comprobante Gubernamental'],
		['44', 'Comprobante Electrónico para Regímenes Especiales'],
	])('correctly maps type code "%s" to "%s"', (code, name) => {
		const ncf =
			code.startsWith('3') || code.startsWith('4') ? `E${code}1234567890` : `B${code}12345678`
		const result = parseNCF(ncf)
		expect(result.typeCode).toBe(code)
		expect(result.typeName).toBe(name)
	})

	it('throws on an invalid NCF', () => {
		expect(() => parseNCF('B0883920391')).toThrow()
	})

	it('throws on wrong length', () => {
		expect(() => parseNCF('B01839203')).toThrow()
	})
})
