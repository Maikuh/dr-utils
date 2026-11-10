---
sidebar_position: 2.5
---

# Schemas (Standard Schema)

Every identifier has a ready-made [Standard Schema](https://standardschema.dev). Standard Schema is the common interface that Zod, Valibot, ArkType and others implement, and that form and API libraries accept directly. dr-utils implements it with **zero dependencies**.

Use schemas when a library asks you for "a schema". Use the plain [validators](./validators.md) everywhere else: they are unchanged and still the simplest option.

| Schema                        | Accepts                                | Output (on success)         |
| ----------------------------- | -------------------------------------- | --------------------------- |
| `cedulaSchema(options?)`      | cédula, dashes and whitespace allowed  | `Cedula` — 11 digits        |
| `rncSchema(options?)`         | RNC or cédula, dashes allowed          | `RNC` — 9 or 11 digits      |
| `ncfSchema(options?)`         | NCF / e-CF, surrounding whitespace ok  | `NCF`                       |
| `phoneNumberSchema(options?)` | any common phone format, `+1` optional | `PhoneNumber` — 10 digits   |
| `plateSchema(options?)`       | license plate, any case                | `Plate` — uppercase         |
| `provinciaSchema(options?)`   | province name, any case or accents     | `Provincia` — official name |
| `municipioSchema(options?)`   | municipality name, any case or accents | `Municipio` — official name |

**Options**

| Option    | Type     | Description                                                                |
| --------- | -------- | -------------------------------------------------------------------------- |
| `message` | `string` | Error message for invalid input. Defaults to English (`'Invalid cedula'`). |

Schemas validate synchronously and also reject non-string values.

## With TanStack Form

TanStack Form accepts Standard Schemas as field validators:

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

## With any Standard Schema consumer

Any library that accepts a Standard Schema for a single value works the same way, for example a tRPC procedure input: `.input(rncSchema())`. You can also call a schema yourself:

```ts
import { rncSchema } from 'dr-utils/schemas'

const result = rncSchema()['~standard'].validate('130-72075-4')

if (result.issues) {
	console.log(result.issues[0].message) // 'Invalid RNC'
} else {
	console.log(result.value) // '130720754'
}
```

## Inside Zod or Valibot objects

Zod and Valibot can't nest another library's schema inside their own objects. Use the validator functions with their refinement helpers instead; it's the same check:

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

## Types

```ts
import { cedulaSchema, type StandardSchemaV1 } from 'dr-utils'

type Output = StandardSchemaV1.InferOutput<ReturnType<typeof cedulaSchema>> // Cedula
```
