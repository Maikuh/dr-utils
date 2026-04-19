import { formatCedula } from './cedula.formatter'

describe('Cedula Formatter', () => {
	const cedulaWithDashes = '225-0066322-8'
	const cedulaNoDashes = '22500663228'

	it('Cedula "225-0066322-8" should be formatted without dashes', () => {
		const noDashesResult = formatCedula(cedulaWithDashes, { dashes: false })

		expect(noDashesResult).toEqual(cedulaNoDashes)
	})

	it('Cedula "22500663228" should be formatted with dashes', () => {
		const withDashesResult = formatCedula(cedulaNoDashes)

		expect(withDashesResult).toEqual(cedulaWithDashes)
	})

	it('throws on input shorter than 11 digits', () => {
		expect(() => formatCedula('123')).toThrow()
	})

	it('throws on non-numeric input', () => {
		expect(() => formatCedula('abcdefghijk')).toThrow()
	})
})
