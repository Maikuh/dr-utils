import {
	safeParseCedula,
	safeParseNCF,
	safeParsePhoneNumber,
	safeParsePlate,
	safeParseRNC,
} from './safe-parse'

describe('safeParseCedula', () => {
	it('returns ok:true for a valid cedula', () => {
		const result = safeParseCedula('40220579912')
		expect(result.ok).toBe(true)
		if (result.ok) expect(result.value.municipioCode).toBe('402')
	})

	it('includes branded raw field on success', () => {
		const result = safeParseCedula('402-2057991-2')
		expect(result.ok).toBe(true)
		if (result.ok) expect(result.value.raw).toBe('40220579912')
	})

	it('returns ok:false for an invalid cedula (no throw)', () => {
		const result = safeParseCedula('12345678901')
		expect(result.ok).toBe(false)
		if (!result.ok) expect(result.error).toBeTruthy()
	})
})

describe('safeParseRNC', () => {
	it('returns ok:true for a valid RNC', () => {
		const result = safeParseRNC('130720754')
		expect(result.ok).toBe(true)
	})

	it('includes branded raw field on success', () => {
		const result = safeParseRNC('130-72075-4')
		expect(result.ok).toBe(true)
		if (result.ok) expect(result.value.raw).toBe('130720754')
	})

	it('returns ok:false for an invalid RNC (no throw)', () => {
		const result = safeParseRNC('12345')
		expect(result.ok).toBe(false)
	})
})

describe('safeParseNCF', () => {
	it('returns ok:true for a valid NCF', () => {
		const result = safeParseNCF('B0183920391')
		expect(result.ok).toBe(true)
		if (result.ok) expect(result.value.typeCode).toBe('01')
	})

	it('includes branded raw field on success', () => {
		const result = safeParseNCF('B0183920391')
		expect(result.ok).toBe(true)
		if (result.ok) expect(result.value.raw).toBe('B0183920391')
	})

	it('returns ok:false for an invalid NCF (no throw)', () => {
		const result = safeParseNCF('B0883920391')
		expect(result.ok).toBe(false)
	})
})

describe('safeParsePhoneNumber', () => {
	it('returns ok:true for a valid phone number', () => {
		const result = safeParsePhoneNumber('8092201111')
		expect(result.ok).toBe(true)
		if (result.ok) expect(result.value.areaCode).toBe('809')
	})

	it('includes branded raw field (10-digit normalized) on success', () => {
		const result = safeParsePhoneNumber('(809) 220-1111')
		expect(result.ok).toBe(true)
		if (result.ok) expect(result.value.raw).toBe('8092201111')
	})

	it('returns ok:false for a non-DR number (no throw)', () => {
		const result = safeParsePhoneNumber('7815754238')
		expect(result.ok).toBe(false)
	})
})

describe('safeParsePlate', () => {
	it('returns ok:true for a valid plate', () => {
		const result = safeParsePlate('A123456')
		expect(result.ok).toBe(true)
		if (result.ok) {
			expect(result.value.category).toBe('A')
			expect(result.value.categoryName).toBe('Automóvil')
		}
	})

	it('includes branded raw field (uppercase normalized) on success', () => {
		const result = safeParsePlate('a123456')
		expect(result.ok).toBe(true)
		if (result.ok) expect(result.value.raw).toBe('A123456')
	})

	it('returns ok:false for an invalid plate (no throw)', () => {
		const result = safeParsePlate('ZZ12345')
		expect(result.ok).toBe(false)
		if (!result.ok) expect(result.error).toBeTruthy()
	})
})
