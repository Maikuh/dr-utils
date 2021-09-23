import { formatCedula, formatRNC } from '../src'

describe('Formatters', () => {
  it('Cedula "22500663228" should be formatted correctly', () => {
    const cedulaNoDashes = '22500663228'
    const cedulaWithDashes = '225-0066322-8'

    const noDashesResult = formatCedula(cedulaWithDashes)
    const withDashesResult = formatCedula(cedulaNoDashes, 'add')

    expect(noDashesResult).toEqual(cedulaNoDashes)
    expect(withDashesResult).toEqual(cedulaWithDashes)
  })

  it('RNC "130720754" should be formatted correctly', () => {
    const rncNoDashes = '130720754'
    const rncWithDashes = '130-72075-4'

    const noDashesResult = formatRNC(rncWithDashes)
    const withDashesResult = formatRNC(rncNoDashes, 'add')

    expect(noDashesResult).toEqual(rncNoDashes)
    expect(withDashesResult).toEqual(rncWithDashes)
  })

  it('RNC formatter accepts cedula "22500663228" and should format it correctly', () => {
    const cedulaNoDashes = '22500663228'
    const cedulaWithDashes = '225-0066322-8'

    const noDashesResult = formatRNC(cedulaWithDashes)
    const withDashesResult = formatRNC(cedulaNoDashes, 'add')

    expect(noDashesResult).toEqual(cedulaNoDashes)
    expect(withDashesResult).toEqual(cedulaWithDashes)
  })
})
