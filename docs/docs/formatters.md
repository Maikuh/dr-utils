---
sidebar_position: 3
---

# Formatters

Formatters normalize strings into a canonical format. They throw `DrUtilsError` on invalid input.

## `formatCedula`

Formats a cédula with or without dashes.

**Arguments**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `cedula` | `string` | — | Raw or dash-formatted cédula |
| `options.dashes` | `boolean` | `true` | Whether to include dashes in the output |

**Returns** `string` — formatted cédula.

**Example**

```ts
import { formatCedula } from 'dr-utils'

formatCedula('40220579912')                       // '402-2057991-2'
formatCedula('402-2057991-2', { dashes: false })  // '40220579912'
```

## `formatRNC`

Formats an RNC with or without dashes. Also accepts 11-digit cédulas.

**Arguments**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `rnc` | `string` | — | Raw or dash-formatted RNC or cédula |
| `options.dashes` | `boolean` | `true` | Whether to include dashes in the output |

**Returns** `string` — formatted RNC.

**Example**

```ts
import { formatRNC } from 'dr-utils'

formatRNC('130500292')                      // '130-50029-2'
formatRNC('130-50029-2', { dashes: false }) // '130500292'
```

## `formatNCF`

Formats an NCF with a dash separator between the series/type code and sequence.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `ncf` | `string` | Raw NCF string |

**Returns** `string` — formatted NCF with dash.

**Example**

```ts
import { formatNCF } from 'dr-utils'

formatNCF('B0183920391')   // 'B01-83920391'
formatNCF('E319320341237') // 'E31-9320341237'
```

## `formatPhoneNumber`

Formats a Dominican phone number in national or international format.

**Arguments**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `number` | `string` | — | Phone number in any accepted Dominican format |
| `international` | `boolean` | `false` | If `true`, returns E.164 format (`+1XXXXXXXXXX`) |

**Returns** `string` — formatted phone number.

**Example**

```ts
import { formatPhoneNumber } from 'dr-utils'

formatPhoneNumber('8092201111')       // '(809) 220-1111'
formatPhoneNumber('8092201111', true) // '+18092201111'
```

## `formatPlate`

Uppercases and normalizes a Dominican license plate string.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `plate` | `string` | Plate string (case-insensitive) |

**Returns** `string` — uppercased plate.

**Example**

```ts
import { formatPlate } from 'dr-utils'

formatPlate('a123456') // 'A123456'
formatPlate('el12345') // 'EL12345'
```

## `formatDOP`

Formats a number as a Dominican Peso (DOP) currency string.

**Arguments**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | `number` | — | Monetary amount to format |
| `options.symbol` | `'RD$' \| '$' \| 'none'` | `'RD$'` | Currency symbol prefix |
| `options.decimals` | `number` | `2` | Number of decimal places |

**Returns** `string` — formatted currency string.

**Example**

```ts
import { formatDOP } from 'dr-utils'

formatDOP(1234.5)                      // 'RD$1,234.50'
formatDOP(1234.5, { symbol: '$' })     // '$1,234.50'
formatDOP(1234.5, { symbol: 'none' })  // '1,234.50'
formatDOP(1234.5, { decimals: 0 })     // 'RD$1,235'
```
