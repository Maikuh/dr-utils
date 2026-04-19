import { DrUtilsError } from '@/errors/dr-utils-error'
import { validateNCF } from '@/validators/ncf.validator'

/**
 * Formats a physical NCF (11 chars) or electronic NCF/e-CF (13 chars) as `{type}-{sequence}`.
 * @param ncf {string} the invoice's NCF
 * @returns {string} e.g. `"B01-83920391"` or `"E31-9320341237"`
 * @throws {DrUtilsError} if `ncf` fails NCF validation
 */
export function formatNCF(ncf: string): string {
	if (!validateNCF(ncf))
		throw new DrUtilsError('FORMAT_NCF_FAILED', `Cannot format NCF "${ncf}": invalid NCF.`)
	return `${ncf.slice(0, 3)}-${ncf.slice(3)}`
}
