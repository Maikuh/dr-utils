type Brand<T, K extends string> = T & { readonly __brand: K }

export type Cedula = Brand<string, 'Cedula'>
export type RNC = Brand<string, 'RNC'>
export type NCF = Brand<string, 'NCF'>
export type PhoneNumber = Brand<string, 'PhoneNumber'>
export type Plate = Brand<string, 'Plate'>
