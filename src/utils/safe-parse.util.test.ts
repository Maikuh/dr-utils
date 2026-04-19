import {
	safeParseCedula,
	safeParseNCF,
	safeParsePhoneNumber,
	safeParseRNC,
} from './safe-parse.util'

describe('safeParseCedula', () => {
	it('returns ok:true for a valid cedula', () => {
		const result = safeParseCedula('40220579912')
		expect(result.ok).toBe(true)
		if (result.ok) expect(result.value.municipioCode).toBe('402')
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

	it('returns ok:false for a non-DR number (no throw)', () => {
		const result = safeParsePhoneNumber('7815754238')
		expect(result.ok).toBe(false)
	})
})
