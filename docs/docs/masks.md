---
sidebar_position: 5
---

# Masks

Masks redact sensitive digits while preserving enough structure to remain recognizable.

## `maskCedula`

Replaces the middle sequence of a cédula with asterisks.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `cedula` | `string` | Raw or dash-formatted cédula |

**Returns** `string` — masked cédula (e.g. `'402-*******-2'`).

**Example**

```ts
import { maskCedula } from 'dr-utils'

maskCedula('402-2057991-2') // '402-*******-2'
```

## `maskRNC`

Masks an RNC or cédula-as-RNC. For 11-digit cédulas, delegates to `maskCedula`.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `rnc` | `string` | Raw or dash-formatted RNC or cédula |

**Returns** `string` — masked identifier.

**Example**

```ts
import { maskRNC } from 'dr-utils'

maskRNC('130720754')   // '130-*****-4'
maskRNC('40220579912') // '402-*******-2' (delegates to maskCedula)
```

## `maskPhoneNumber`

Replaces the middle digits of a phone number with asterisks.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `phoneNumber` | `string` | Phone number in any accepted Dominican format |

**Returns** `string` — masked phone number.

**Example**

```ts
import { maskPhoneNumber } from 'dr-utils'

maskPhoneNumber('(809) 220-1111') // '(809) ***-1111'
```
