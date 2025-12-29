/**
 * Validates both physical (NCF) and electronic (e-CF) NCFs
 * @param ncf {string} the invoices' NCF
 * @returns {boolean} `true` if the NCF is valid, `false` otherwise
 */
export function validateNCF(ncf: string): boolean {
	// NCF (Physical)
	if (ncf.length === 11) {
		return ncf.match(/^[A-Z](0[1-4]|1[1-7])\d{8}$/g) != null
	}

	// eNCF
	if (ncf.length === 13) {
		return ncf.match(/^[A-Z](3[1-4]|41|4[3-5])\d{10}$/g) != null
	}

	return false
}

export default validateNCF
