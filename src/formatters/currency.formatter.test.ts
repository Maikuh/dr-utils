import { formatDOP } from './currency.formatter'

describe('formatDOP', () => {
	it.each([
		[1234.5, {}, 'RD$1,234.50'],
		[0, {}, 'RD$0.00'],
		[1000000, {}, 'RD$1,000,000.00'],
		[1234.56, { symbol: '$' }, '$1,234.56'],
		[1234.56, { symbol: 'none' }, '1,234.56'],
		[1234.5, { decimals: 0 }, 'RD$1,235'],
		[1234.5, { decimals: 3 }, 'RD$1,234.500'],
		[0.5, {}, 'RD$0.50'],
	] as const)('formatDOP(%s, %o) → "%s"', (value, options, expected) => {
		expect(formatDOP(value, options)).toBe(expected)
	})

	it('uses RD$ symbol by default', () => {
		expect(formatDOP(100)).toBe('RD$100.00')
	})

	it('formats large amounts with thousands separators', () => {
		expect(formatDOP(1234567.89)).toBe('RD$1,234,567.89')
	})
})
