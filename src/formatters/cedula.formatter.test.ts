import formatCedula from './cedula.formatter'

describe('Cedula Formatter', () => {
	const cedulaWithDashes = '225-0066322-8'
	const cedulaNoDashes = '22500663228'

	it('Cedula "225-0066322-8" should be formatted without dashes', () => {
		const noDashesResult = formatCedula(cedulaWithDashes, 'without-dashes')

		expect(noDashesResult).toEqual(cedulaNoDashes)
	})

	it('Cedula "22500663228" should be formatted with dashes', () => {
		const withDashesResult = formatCedula(cedulaNoDashes)

		expect(withDashesResult).toEqual(cedulaWithDashes)
	})
})
