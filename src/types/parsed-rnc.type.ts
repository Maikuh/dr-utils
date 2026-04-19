import type { ParsedCedula } from './parsed-cedula.type'

export type ParsedRNC =
	| { kind: 'rnc'; sequence: string; checkDigit: string; formatted: string }
	| ({ kind: 'cedula' } & ParsedCedula)
