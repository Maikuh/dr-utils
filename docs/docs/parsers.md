---
sidebar_position: 4
---

# Parsers

Parsers validate input and return a structured object. They throw `DrUtilsError` on invalid input (see [Error Handling](./error-handling.md)). For non-throwing variants, use the [Safe Parsers](#safe-parsers) below.

## `parseCedula`

Parses a cédula into its component parts.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `cedula` | `string` | Raw or dash-formatted cédula |

**Returns** `ParsedCedula` — `{ municipioCode, sequence, checkDigit, formatted }`.

**Example**

```ts
import { parseCedula } from 'dr-utils'

const result = parseCedula('402-2057991-2')
// {
//   municipioCode: '402',
//   sequence: '2057991',
//   checkDigit: '2',
//   formatted: '402-2057991-2'
// }
```

## `parseRNC`

Parses an RNC (or cédula used as RNC) into its component parts. The `kind` field indicates whether the input was a 9-digit RNC or an 11-digit cédula.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `rnc` | `string` | Raw or dash-formatted RNC or cédula |

**Returns** `ParsedRNC` — includes `kind: 'rnc' | 'cedula'` plus type-specific fields.

**Example**

```ts
import { parseRNC } from 'dr-utils'

const rnc = parseRNC('130-72075-4')
// { kind: 'rnc', sequence: '13072075', checkDigit: '4', formatted: '130-72075-4' }

const cedula = parseRNC('40220579912')
// { kind: 'cedula', municipioCode: '402', sequence: '2057991', checkDigit: '2', formatted: '402-2057991-2' }
```

## `parseNCF`

Parses an NCF into its component parts, including the fiscal document type name.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `ncf` | `string` | Raw NCF string (physical 11-char or electronic 13-char) |

**Returns** `ParsedNCF` — `{ kind, series, typeCode, typeName, sequence, formatted }`.

**Example**

```ts
import { parseNCF } from 'dr-utils'

const result = parseNCF('B0183920391')
// {
//   kind: 'physical',
//   series: 'B',
//   typeCode: '01',
//   typeName: 'Factura de Crédito Fiscal',
//   sequence: '83920391',
//   formatted: 'B01-83920391'
// }
```

## `parsePhoneNumber`

Parses a Dominican phone number into its component parts.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `number` | `string` | Phone number in any accepted Dominican format |

**Returns** `ParsedPhoneNumber` — `{ areaCode, prefix, line, national, international }`.

**Example**

```ts
import { parsePhoneNumber } from 'dr-utils'

const result = parsePhoneNumber('(809) 220-1111')
// { areaCode: '809', prefix: '220', line: '1111', national: '(809) 220-1111', international: '+18092201111' }
```

## `normalizePhoneNumber`

Strips all formatting from a Dominican phone number, returning only the 10 digits.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `number` | `string` | Phone number in any accepted Dominican format |

**Returns** `string` — 10-digit normalized phone number.

**Example**

```ts
import { normalizePhoneNumber } from 'dr-utils'

normalizePhoneNumber('(809) 220-1111') // '8092201111'
```

## `parsePlate`

Parses a Dominican license plate into its category and sequence.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `plate` | `string` | Plate string (case-insensitive) |

**Returns** `ParsedPlate` — `{ category, categoryName, sequence, formatted }`.

**Example**

```ts
import { parsePlate } from 'dr-utils'

const result = parsePlate('EL12345')
// { category: 'EL', categoryName: 'Eléctrico', sequence: '12345', formatted: 'EL12345' }
```

---

## Safe Parsers

Safe parsers wrap their throwing counterparts and return a `Result<T>` instead of throwing. On success the value also includes a `raw` branded field with the normalized identifier.

**Available:** `safeParseCedula`, `safeParseRNC`, `safeParseNCF`, `safeParsePhoneNumber`, `safeParsePlate`

**Returns** `Result<T>` — `{ ok: true, value: T & { raw } } | { ok: false, error: string }`.

**Example**

```ts
import { safeParseCedula } from 'dr-utils'

const result = safeParseCedula('402-2057991-2')
if (result.ok) {
  console.log(result.value.municipioCode) // '402'
  console.log(result.value.raw)           // '40220579912' (branded Cedula type)
} else {
  console.error(result.error) // error message string
}
```
