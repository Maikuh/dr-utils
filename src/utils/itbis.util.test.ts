import { ITBIS_RATE } from '@/constants/itbis.constant'
import { DrUtilsError } from '@/errors/dr-utils-error'
import { applyItbis, removeItbis, splitItbis } from './itbis.util'

describe('ITBIS_RATE', () => {
	it('is 0.18', () => {
		expect(ITBIS_RATE).toBe(0.18)
	})
})

describe('applyItbis', () => {
	it('adds 18% to a subtotal by default', () => {
		expect(applyItbis(100)).toBe(118)
	})

	it('applies a custom rate', () => {
		expect(applyItbis(100, 0.16)).toBe(116)
	})

	it('returns subtotal unchanged for zero rate (exempt goods)', () => {
		expect(applyItbis(100, 0)).toBe(100)
	})

	it('rounds to 2 decimal places', () => {
		expect(applyItbis(33.33)).toBe(39.33)
	})

	it('throws DrUtilsError for negative subtotal', () => {
		expect(() => applyItbis(-1)).toThrow(DrUtilsError)
		const err = (() => {
			try {
				applyItbis(-1)
			} catch (e) {
				return e
			}
		})()
		expect((err as DrUtilsError).code).toBe('ITBIS_NEGATIVE')
	})
})

describe('removeItbis', () => {
	it('removes 18% ITBIS from a gross total by default', () => {
		expect(removeItbis(118)).toBe(100)
	})

	it('applies a custom rate', () => {
		expect(removeItbis(116, 0.16)).toBe(100)
	})

	it('rounds to 2 decimal places', () => {
		expect(removeItbis(39.33)).toBe(33.33)
	})

	it('throws DrUtilsError for negative total', () => {
		expect(() => removeItbis(-1)).toThrow(DrUtilsError)
	})
})

describe('splitItbis', () => {
	it('splits 118 into net=100, tax=18, total=118', () => {
		expect(splitItbis(118)).toEqual({ net: 100, tax: 18, total: 118 })
	})

	it('applies a custom rate', () => {
		const { net, tax, total } = splitItbis(116, 0.16)
		expect(net).toBe(100)
		expect(tax).toBe(16)
		expect(total).toBe(116)
	})

	it('handles zero rate (no ITBIS)', () => {
		expect(splitItbis(100, 0)).toEqual({ net: 100, tax: 0, total: 100 })
	})

	it('throws DrUtilsError for negative total', () => {
		expect(() => splitItbis(-1)).toThrow(DrUtilsError)
	})
})
