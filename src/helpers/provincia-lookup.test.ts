import { MunicipiosPorProvincia } from '@/constants/municipios-por-provincia.constant'
import { ProvinciaISOCodes } from '@/constants/provincia-iso-codes.constant'
import { Provincias } from '@/constants/provincias.constant'
import {
	findMunicipio,
	findProvincia,
	getProvinciaByISOCode,
	getProvinciaISOCode,
} from './provincia-lookup'

describe('findProvincia', () => {
	it('ignores case, accents and extra whitespace', () => {
		expect(findProvincia('dajabon')).toBe('Dajabón')
		expect(findProvincia('  SAN   PEDRO de macoris ')).toBe('San Pedro de Macorís')
		expect(findProvincia('Monseñor Nouel')).toBe('Monseñor Nouel')
		expect(findProvincia('monsenor nouel')).toBe('Monseñor Nouel')
	})

	it('accepts common alternative names', () => {
		expect(findProvincia('Baoruco')).toBe('Bahoruco')
		expect(findProvincia('Montecristi')).toBe('Monte Cristi')
		expect(findProvincia('Salcedo')).toBe('Hermanas Mirabal')
	})

	it('finds every official province by its own name', () => {
		for (const provincia of Object.values(Provincias)) {
			expect(findProvincia(provincia)).toBe(provincia)
		}
	})

	it('returns undefined when nothing matches', () => {
		expect(findProvincia('Narnia')).toBeUndefined()
		expect(findProvincia('')).toBeUndefined()
	})
})

describe('findMunicipio', () => {
	it('ignores case and accents', () => {
		expect(findMunicipio('tabara arriba')).toBe('Tábara Arriba')
		expect(findMunicipio('SANTO DOMINGO ESTE')).toBe('Santo Domingo Este')
	})

	it('finds every official municipality by its own name', () => {
		for (const municipio of Object.values(MunicipiosPorProvincia).flat()) {
			expect(findMunicipio(municipio)).toBe(municipio)
		}
	})

	it('returns undefined when nothing matches', () => {
		expect(findMunicipio('Gotham')).toBeUndefined()
	})
})

describe('ISO 3166-2:DO codes', () => {
	it('has a unique code for every province', () => {
		const provincias = Object.values(Provincias)
		expect(Object.keys(ProvinciaISOCodes).toSorted()).toEqual(provincias.toSorted())
		expect(new Set(Object.values(ProvinciaISOCodes)).size).toBe(provincias.length)
	})

	it('getProvinciaISOCode returns the code', () => {
		expect(getProvinciaISOCode('Distrito Nacional')).toBe('DO-01')
		expect(getProvinciaISOCode('Santo Domingo')).toBe('DO-32')
	})

	it('getProvinciaByISOCode accepts several spellings', () => {
		expect(getProvinciaByISOCode('DO-05')).toBe('Dajabón')
		expect(getProvinciaByISOCode('do-05')).toBe('Dajabón')
		expect(getProvinciaByISOCode('05')).toBe('Dajabón')
		expect(getProvinciaByISOCode('5')).toBe('Dajabón')
		expect(getProvinciaByISOCode(' DO-32 ')).toBe('Santo Domingo')
	})

	it('getProvinciaByISOCode returns undefined for unknown codes', () => {
		expect(getProvinciaByISOCode('DO-33')).toBeUndefined()
		expect(getProvinciaByISOCode('XX')).toBeUndefined()
	})
})
