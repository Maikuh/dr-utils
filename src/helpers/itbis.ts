import { ITBIS_RATE } from '@/constants/itbis.constant'
import { DrUtilsError } from '@/errors/dr-utils-error'

function round2(n: number): number {
	return Math.round(n * 100) / 100
}

/**
 * Adds ITBIS to a net subtotal and returns the gross (ITBIS-inclusive) amount.
 * @param subtotal {number} the net amount before ITBIS
 * @param rate {number} the ITBIS rate to apply. Defaults to `ITBIS_RATE` (0.18).
 * @returns {number} gross amount rounded to 2 decimal places
 * @throws {DrUtilsError} if `subtotal` is negative
 */
export function applyItbis(subtotal: number, rate: number = ITBIS_RATE): number {
	if (subtotal < 0) throw new DrUtilsError('ITBIS_NEGATIVE', 'subtotal must be non-negative.')
	return round2(subtotal * (1 + rate))
}

/**
 * Removes ITBIS from a gross (ITBIS-inclusive) total and returns the net amount.
 * @param total {number} the ITBIS rate to remove. Defaults to `ITBIS_RATE` (0.18).
 * @returns {number} net amount rounded to 2 decimal places
 * @throws {DrUtilsError} if `total` is negative
 */
export function removeItbis(total: number, rate: number = ITBIS_RATE): number {
	if (total < 0) throw new DrUtilsError('ITBIS_NEGATIVE', 'total must be non-negative.')
	return round2(total / (1 + rate))
}

/**
 * Splits a gross (ITBIS-inclusive) total into its net, tax, and total components.
 * @param total {number} the ITBIS-inclusive amount
 * @param rate {number} the ITBIS rate to split by. Defaults to `ITBIS_RATE` (0.18).
 * @returns {{ net: number; tax: number; total: number }} all three components, each rounded to 2 decimal places
 * @throws {DrUtilsError} if `total` is negative
 */
export function splitItbis(
	total: number,
	rate: number = ITBIS_RATE,
): { net: number; tax: number; total: number } {
	if (total < 0) throw new DrUtilsError('ITBIS_NEGATIVE', 'total must be non-negative.')
	const net = round2(total / (1 + rate))
	const tax = round2(total - net)
	return { net, tax, total: round2(total) }
}
