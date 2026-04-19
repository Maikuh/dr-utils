export const PLATE_CATEGORIES = {
	A: 'Privado',
	G: 'Gubernamental',
	I: 'Motocicleta',
	K: 'Alquiler',
	L: 'Carga',
	P: 'Público',
	CD: 'Cuerpo Diplomático',
	DD: 'Diplomático',
	DL: 'Diplomático Legal',
	EL: 'Eléctrico',
	EX: 'Exonerado',
	RE: 'Remolque',
} as const

export type PlateCategoryCode = keyof typeof PLATE_CATEGORIES
