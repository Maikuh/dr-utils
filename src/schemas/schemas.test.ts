import { StandardSchemaV1 } from '@/types/standard-schema.type'
import {
	cedulaSchema,
	municipioSchema,
	ncfSchema,
	phoneNumberSchema,
	plateSchema,
	provinciaSchema,
	rncSchema,
} from './schemas'

function run(schema: StandardSchemaV1<string, unknown>, value: unknown) {
	const result = schema['~standard'].validate(value)
	if (result instanceof Promise) throw new Error('schemas must validate synchronously')
	return result
}

describe('Standard Schema props', () => {
	it('declares version 1 and the dr-utils vendor', () => {
		expect(cedulaSchema()['~standard'].version).toBe(1)
		expect(cedulaSchema()['~standard'].vendor).toBe('dr-utils')
	})
})

describe.each([
	['cedulaSchema', cedulaSchema, '402-2057991-2', 'X'],
	['rncSchema', rncSchema, '130-72075-4', '130720754abc'],
	['ncfSchema', ncfSchema, ' B0100000001 ', 'B9900000001'],
	['phoneNumberSchema', phoneNumberSchema, '+1 (809) 555-1234', '(305) 555-1234'],
	['plateSchema', plateSchema, ' a123456 ', 'Q123'],
	['provinciaSchema', provinciaSchema, 'dajabon', 'Narnia'],
	['municipioSchema', municipioSchema, 'tabara arriba', 'Gotham'],
] as const)('%s', (_name, factory, valid, invalid) => {
	it('succeeds on valid input', () => {
		expect(run(factory(), valid).issues).toBeUndefined()
	})

	it('fails on invalid input with the default message', () => {
		const result = run(factory(), invalid)
		expect(result.issues).toHaveLength(1)
		expect(result.issues?.[0]?.message).toMatch(/^Invalid /)
	})

	it('fails on non-string input', () => {
		expect(run(factory(), 123).issues).toHaveLength(1)
		expect(run(factory(), undefined).issues).toHaveLength(1)
	})

	it('uses a custom message', () => {
		expect(run(factory({ message: 'Valor inválido' }), invalid).issues?.[0]?.message).toBe(
			'Valor inválido',
		)
	})
})

describe('schema outputs are normalized', () => {
	it.each([
		[cedulaSchema(), ' 402-2057991-2 ', '40220579912'],
		[rncSchema(), '130-72075-4', '130720754'],
		[rncSchema(), '130 72075 4', '130720754'],
		[ncfSchema(), ' E310000000001 ', 'E310000000001'],
		[phoneNumberSchema(), '1-809-555-1234', '8095551234'],
		[plateSchema(), 'oe12345', 'OE12345'],
		[provinciaSchema(), 'SAN JOSE DE OCOA', 'San José de Ocoa'],
		[municipioSchema(), 'santo domingo este', 'Santo Domingo Este'],
	] as const)('%#: %p → %p', (schema, input, expected) => {
		expect(run(schema, input)).toEqual({ value: expected })
	})
})
