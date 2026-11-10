import { MunicipiosPorProvincia } from '@/constants/municipios-por-provincia.constant'
import { ProvinciaISOCode, ProvinciaISOCodes } from '@/constants/provincia-iso-codes.constant'
import { Provincias } from '@/constants/provincias.constant'
import { Municipio, Provincia } from '@/types/municipio-provincia.type'

// Common alternative spellings and former names
const PROVINCIA_ALIASES: Record<string, Provincia> = {
	baoruco: 'Bahoruco',
	montecristi: 'Monte Cristi',
	salcedo: 'Hermanas Mirabal',
}

/** Lowercases, strips accents and collapses whitespace so lookups ignore how the name was typed. */
function toLookupKey(value: string): string {
	return value.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/\s+/g, ' ').trim()
}

let provinciaIndex: Map<string, Provincia> | undefined
let municipioIndex: Map<string, Municipio> | undefined
let isoIndex: Map<string, Provincia> | undefined

function getProvinciaIndex(): Map<string, Provincia> {
	if (!provinciaIndex) {
		provinciaIndex = new Map(Object.entries(PROVINCIA_ALIASES))
		for (const provincia of Object.values(Provincias)) {
			provinciaIndex.set(toLookupKey(provincia), provincia)
		}
	}
	return provinciaIndex
}

function getMunicipioIndex(): Map<string, Municipio> {
	if (!municipioIndex) {
		municipioIndex = new Map()
		for (const municipios of Object.values(MunicipiosPorProvincia)) {
			for (const municipio of municipios) {
				municipioIndex.set(toLookupKey(municipio), municipio)
			}
		}
	}
	return municipioIndex
}

/**
 * Finds a province by name, ignoring case, accents and extra whitespace.
 * Also accepts common alternative names (`'Baoruco'`, `'Montecristi'`, `'Salcedo'`).
 * @param query {string} user-entered province name, e.g. `'dajabon'` or `'SAN PEDRO DE MACORIS'`
 * @returns {Provincia | undefined} the official province name, or `undefined` if none matches
 */
export function findProvincia(query: string): Provincia | undefined {
	return getProvinciaIndex().get(toLookupKey(query))
}

/**
 * Finds a municipality by name, ignoring case, accents and extra whitespace.
 * @param query {string} user-entered municipality name, e.g. `'tabara arriba'`
 * @returns {Municipio | undefined} the official municipality name, or `undefined` if none matches
 */
export function findMunicipio(query: string): Municipio | undefined {
	return getMunicipioIndex().get(toLookupKey(query))
}

/**
 * Returns the ISO 3166-2:DO code of a province.
 * @param provincia {Provincia} the province name
 * @returns {ProvinciaISOCode} the ISO code, e.g. `'DO-05'` for Dajabón
 */
export function getProvinciaISOCode(provincia: Provincia): ProvinciaISOCode {
	return ProvinciaISOCodes[provincia]
}

/**
 * Finds a province by its ISO 3166-2:DO code (case-insensitive). The `DO-` prefix is optional.
 * @param code {string} e.g. `'DO-05'`, `'do-05'`, `'05'` or `'5'`
 * @returns {Provincia | undefined} the province, or `undefined` if the code is unknown
 */
export function getProvinciaByISOCode(code: string): Provincia | undefined {
	if (!isoIndex) {
		isoIndex = new Map()
		for (const [provincia, isoCode] of Object.entries(ProvinciaISOCodes)) {
			isoIndex.set(isoCode, provincia as Provincia)
		}
	}
	const number = code.trim().toUpperCase().replace(/^DO-/, '')
	return isoIndex.get(`DO-${number.padStart(2, '0')}`)
}
