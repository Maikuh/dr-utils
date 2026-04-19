import { formatRNC } from './rnc.formatter'

describe('RNC Formatter', () => {
	const rncNoDashes = '130720754'
	const rncWithDashes = '130-72075-4'
	const cedulaNoDashes = '22500663228'
	const cedulaWithDashes = '225-0066322-8'

	it('RNC "130720754" should be formatted with dashes', () => {
		const withDashesResult = formatRNC(rncNoDashes)

		expect(withDashesResult).toEqual(rncWithDashes)
	})

	it('RNC "130-72075-4" should be formatted without dashes', () => {
		const noDashesResult = formatRNC(rncWithDashes, { dashes: false })

		expect(noDashesResult).toEqual(rncNoDashes)
	})

	it('RNC formatter accepts cedula "22500663228" and should format it with dashes', () => {
		const withDashesResult = formatRNC(cedulaNoDashes)

		expect(withDashesResult).toEqual(cedulaWithDashes)
	})

	it('RNC formatter accepts cedula "225-0066322-8" and should format it without dashes', () => {
		const noDashesResult = formatRNC(cedulaWithDashes, { dashes: false })

		expect(noDashesResult).toEqual(cedulaNoDashes)
	})

	it('throws on invalid input', () => {
		expect(() => formatRNC('12345')).toThrow()
	})
})
