---
sidebar_position: 4
---

# Parsers

Los parsers validan la entrada y devuelven un objeto estructurado. Lanzan un `DrUtilsError` si la entrada no es válida (ver [Manejo de errores](./error-handling.md)). Para variantes que no lanzan excepciones, usar los [Safe Parsers](#safe-parsers).

## `parseCedula`

Descompone una cédula en sus partes constituyentes.

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `cedula` | `string` | Cédula sin formato o con guiones |

**Retorna** `ParsedCedula` — `{ municipioCode, sequence, checkDigit, formatted }`.

**Ejemplo**

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

Descompone un RNC (o cédula usada como RNC) en sus partes. El campo `kind` indica si la entrada era un RNC de 9 dígitos o una cédula de 11 dígitos.

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `rnc` | `string` | RNC o cédula sin formato o con guiones |

**Retorna** `ParsedRNC` — incluye `kind: 'rnc' | 'cedula'` más campos específicos del tipo.

**Ejemplo**

```ts
import { parseRNC } from 'dr-utils'

const rnc = parseRNC('130-72075-4')
// { kind: 'rnc', sequence: '13072075', checkDigit: '4', formatted: '130-72075-4' }

const cedula = parseRNC('40220579912')
// { kind: 'cedula', municipioCode: '402', sequence: '2057991', checkDigit: '2', formatted: '402-2057991-2' }
```

## `parseNCF`

Descompone un NCF en sus partes, incluyendo el nombre del tipo de documento fiscal.

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `ncf` | `string` | Cadena NCF sin formato (físico 11 caracteres o electrónico 13 caracteres) |

**Retorna** `ParsedNCF` — `{ kind, series, typeCode, typeName, sequence, formatted }`.

**Ejemplo**

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

Descompone un número de teléfono dominicano en sus partes constituyentes.

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `number` | `string` | Número de teléfono en cualquier formato dominicano aceptado |

**Retorna** `ParsedPhoneNumber` — `{ areaCode, prefix, line, national, international }`.

**Ejemplo**

```ts
import { parsePhoneNumber } from 'dr-utils'

const result = parsePhoneNumber('(809) 220-1111')
// { areaCode: '809', prefix: '220', line: '1111', national: '(809) 220-1111', international: '+18092201111' }
```

## `normalizePhoneNumber`

Elimina todo el formato de un número de teléfono dominicano, retornando solo los 10 dígitos.

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `number` | `string` | Número de teléfono en cualquier formato dominicano aceptado |

**Retorna** `string` — número de teléfono normalizado de 10 dígitos.

**Ejemplo**

```ts
import { normalizePhoneNumber } from 'dr-utils'

normalizePhoneNumber('(809) 220-1111') // '8092201111'
```

## `parsePlate`

Descompone una placa de vehículo dominicana en su categoría y secuencia.

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `plate` | `string` | Cadena de placa (sin distinción entre mayúsculas y minúsculas) |

**Retorna** `ParsedPlate` — `{ category, categoryName, sequence, formatted }`.

**Ejemplo**

```ts
import { parsePlate } from 'dr-utils'

const result = parsePlate('EL12345')
// { category: 'EL', categoryName: 'Eléctrico', sequence: '12345', formatted: 'EL12345' }
```

---

## Safe Parsers

Los safe parsers envuelven sus contrapartes que lanzan excepciones y devuelven un `Result<T>` en su lugar. En caso de éxito, el valor también incluye un campo `raw` con el identificador normalizado.

**Disponibles:** `safeParseCedula`, `safeParseRNC`, `safeParseNCF`, `safeParsePhoneNumber`, `safeParsePlate`

**Retorna** `Result<T>` — `{ ok: true, value: T & { raw } } | { ok: false, error: string }`.

**Ejemplo**

```ts
import { safeParseCedula } from 'dr-utils'

const result = safeParseCedula('402-2057991-2')
if (result.ok) {
  console.log(result.value.municipioCode) // '402'
  console.log(result.value.raw)           // '40220579912' (tipo Cedula con marca de tipo)
} else {
  console.error(result.error) // mensaje de error
}
```
