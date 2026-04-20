export const PLATE_CATEGORIES = {
	// Single-letter — regular plates
	A: 'Automóvil',
	B: 'Automóvil interurbano público',
	C: 'Automóvil turístico',
	D: 'Autobús público urbano',
	F: 'Remolque',
	G: 'Jeep',
	H: 'Ambulancia',
	I: 'Autobús privado',
	J: 'Montacargas',
	K: 'Motocicleta',
	L: 'Carga',
	M: 'Carro fúnebre',
	P: 'Autobús turístico',
	R: 'Autobús público interurbano',
	S: 'Volteo',
	T: 'Automóvil público urbano',
	U: 'Máquinas pesadas',
	X: 'Exhibición',
	Z: 'Exonerada',
	// Two-letter — military / police
	OE: 'Ejército Nacional',
	OF: 'Fuerza Aérea',
	OM: 'Marina de Guerra',
	OP: 'Policía Nacional',
	// Two-letter — exoneradas estatales (norma No. 14-2011 DGII)
	EA: 'Exonerada estatal',
	ED: 'Exonerada estatal',
	EG: 'Exonerada estatal',
	EI: 'Exonerada estatal',
	EL: 'Exonerada estatal',
	EM: 'Exonerada estatal',
	// Two-letter — diplomatic / consular / international
	OI: 'Organismo internacional',
	VC: 'Consular',
	WD: 'Diplomática',
	// Two-letter — exoneradas
	EX: 'Exonerada',
	NZ: 'Exonerada',
	YX: 'Exonerada',
	// Two-letter — other
	DD: 'Dealer',
} as const

export type PlateCategoryCode = keyof typeof PLATE_CATEGORIES
