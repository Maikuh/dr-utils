---
sidebar_position: 2.5
---

# Schemas (Standard Schema)

Cada identificador tiene un [Standard Schema](https://standardschema.dev) listo para usar. Standard Schema es la interfaz común que implementan Zod, Valibot, ArkType y otros, y que las librerías de formularios y APIs aceptan directamente. dr-utils la implementa con **cero dependencias**.

Usa los schemas cuando una librería te pida "un schema". En los demás casos usa los [validadores](./validators.md) de siempre: no cambian y siguen siendo la opción más simple.

| Schema                        | Acepta                                   | Salida (si es válido)        |
| ----------------------------- | ---------------------------------------- | ---------------------------- |
| `cedulaSchema(options?)`      | cédula, con guiones y espacios           | `Cedula` — 11 dígitos        |
| `rncSchema(options?)`         | RNC o cédula, con guiones                | `RNC` — 9 u 11 dígitos       |
| `ncfSchema(options?)`         | NCF / e-CF, con espacios alrededor       | `NCF`                        |
| `phoneNumberSchema(options?)` | cualquier formato común, `+1` opcional   | `PhoneNumber` — 10 dígitos   |
| `plateSchema(options?)`       | placa, mayúsculas o minúsculas           | `Plate` — en mayúsculas      |
| `provinciaSchema(options?)`   | nombre de provincia, sin importar tildes | `Provincia` — nombre oficial |
| `municipioSchema(options?)`   | nombre de municipio, sin importar tildes | `Municipio` — nombre oficial |

**Opciones**

| Opción    | Tipo     | Descripción                                                                           |
| --------- | -------- | ------------------------------------------------------------------------------------- |
| `message` | `string` | Mensaje de error para entradas inválidas. Por defecto en inglés (`'Invalid cedula'`). |

Los schemas validan de forma síncrona y también rechazan valores que no sean string.

## Con TanStack Form

TanStack Form acepta Standard Schemas como validadores de campo:

```tsx
import { useForm } from '@tanstack/react-form'
import { cedulaSchema, phoneNumberSchema } from 'dr-utils/schemas'

const form = useForm({ defaultValues: { cedula: '', telefono: '' } })

<form.Field
  name="cedula"
  validators={{ onChange: cedulaSchema({ message: 'Cédula inválida' }) }}
  children={(field) => (
    <>
      <input value={field.state.value} onChange={(e) => field.handleChange(e.target.value)} />
      <p>{field.state.meta.errors[0]?.message}</p>
    </>
  )}
/>
```

## Con cualquier consumidor de Standard Schema

Cualquier librería que acepte un Standard Schema para un solo valor funciona igual, por ejemplo el input de un procedimiento de tRPC: `.input(rncSchema())`. También puedes llamar el schema directamente:

```ts
import { rncSchema } from 'dr-utils/schemas'

const result = rncSchema()['~standard'].validate('130-72075-4')

if (result.issues) {
	console.log(result.issues[0].message) // 'Invalid RNC'
} else {
	console.log(result.value) // '130720754'
}
```

## Dentro de objetos de Zod o Valibot

Zod y Valibot no pueden anidar el schema de otra librería dentro de sus objetos. Usa los validadores con sus funciones de refinamiento; es la misma validación:

```ts
import { z } from 'zod'
import { validateCedula, validatePhoneNumber } from 'dr-utils/validators'
import { normalizePhoneNumber } from 'dr-utils/parsers'

const Cliente = z.object({
	cedula: z.string().refine(validateCedula, 'Cédula inválida'),
	telefono: z
		.string()
		.refine(validatePhoneNumber, 'Teléfono inválido')
		.transform(normalizePhoneNumber), // '(809) 555-1234' → '8095551234'
})
```

```ts
import * as v from 'valibot'
import { validateRNC } from 'dr-utils/validators'

const Empresa = v.object({
	rnc: v.pipe(v.string(), v.check(validateRNC, 'RNC inválido')),
})
```

## Tipos

```ts
import { cedulaSchema, type StandardSchemaV1 } from 'dr-utils'

type Output = StandardSchemaV1.InferOutput<ReturnType<typeof cedulaSchema>> // Cedula
```
