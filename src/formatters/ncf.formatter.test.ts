import { DrUtilsError } from '@/errors/dr-utils-error'
import { formatNCF } from './ncf.formatter'

describe('NCF Formatter', () => {
	it('formats physical NCF "B0183920391" as "B01-83920391"', () => {
		expect(formatNCF('B0183920391')).toBe('B01-83920391')
	})

	it('formats eNCF "E319320341237" as "E31-9320341237"', () => {
		expect(formatNCF('E319320341237')).toBe('E31-9320341237')
	})

	it('throws on invalid NCF (bad type code)', () => {
		expect(() => formatNCF('B0883920391')).toThrow()
	})

	it('throws on invalid NCF (wrong length)', () => {
		expect(() => formatNCF('B0183920391234')).toThrow()
	})

	it('throws DrUtilsError with FORMAT_NCF_FAILED code', () => {
		try {
			formatNCF('INVALID')
		} catch (e) {
			expect(e).toBeInstanceOf(DrUtilsError)
			expect((e as DrUtilsError).code).toBe('FORMAT_NCF_FAILED')
		}
	})
})
