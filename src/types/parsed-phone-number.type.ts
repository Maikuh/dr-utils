export interface ParsedPhoneNumber {
	areaCode: string
	prefix: string
	line: string
	/** Domestic format: `"(809) 220-1111"` */
	national: string
	/** E.164 format: `"+18092201111"` */
	international: string
}
