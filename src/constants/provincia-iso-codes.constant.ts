/**
 * ISO 3166-2:DO codes for each province (and the Distrito Nacional).
 * The numeric part matches the ONE (Oficina Nacional de Estadística) province code.
 */
export const ProvinciaISOCodes = {
	'Distrito Nacional': 'DO-01',
	Azua: 'DO-02',
	Bahoruco: 'DO-03',
	Barahona: 'DO-04',
	Dajabón: 'DO-05',
	Duarte: 'DO-06',
	'Elías Piña': 'DO-07',
	'El Seibo': 'DO-08',
	Espaillat: 'DO-09',
	Independencia: 'DO-10',
	'La Altagracia': 'DO-11',
	'La Romana': 'DO-12',
	'La Vega': 'DO-13',
	'María Trinidad Sánchez': 'DO-14',
	'Monte Cristi': 'DO-15',
	Pedernales: 'DO-16',
	Peravia: 'DO-17',
	'Puerto Plata': 'DO-18',
	'Hermanas Mirabal': 'DO-19',
	Samaná: 'DO-20',
	'San Cristóbal': 'DO-21',
	'San Juan': 'DO-22',
	'San Pedro de Macorís': 'DO-23',
	'Sánchez Ramírez': 'DO-24',
	Santiago: 'DO-25',
	'Santiago Rodríguez': 'DO-26',
	Valverde: 'DO-27',
	'Monseñor Nouel': 'DO-28',
	'Monte Plata': 'DO-29',
	'Hato Mayor': 'DO-30',
	'San José de Ocoa': 'DO-31',
	'Santo Domingo': 'DO-32',
} as const

export type ProvinciaISOCode = (typeof ProvinciaISOCodes)[keyof typeof ProvinciaISOCodes]
