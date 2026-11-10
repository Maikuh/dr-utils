export type DrUtilsErrorCode =
	| 'INVALID_CEDULA'
	| 'INVALID_RNC'
	| 'INVALID_NCF'
	| 'INVALID_PHONE'
	| 'INVALID_PLATE'
	| 'FORMAT_CEDULA_FAILED'
	| 'FORMAT_RNC_FAILED'
	| 'FORMAT_NCF_FAILED'
	| 'FORMAT_PHONE_FAILED'
	| 'FORMAT_PLATE_FAILED'
	| 'FORMAT_DOP_FAILED'
	| 'ITBIS_NEGATIVE'
	| 'ITBIS_INVALID_AMOUNT'
	| 'ITBIS_INVALID_RATE'
	| 'AMOUNT_TO_WORDS_OUT_OF_RANGE'
	| 'PAYROLL_INVALID_AMOUNT'
	| 'PAYROLL_INVALID_OPTION'

export class DrUtilsError extends Error {
	readonly code: DrUtilsErrorCode

	constructor(code: DrUtilsErrorCode, message: string) {
		super(message)
		this.name = 'DrUtilsError'
		this.code = code
	}
}
