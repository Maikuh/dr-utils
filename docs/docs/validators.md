---
sidebar_position: 2
---

# Validators

All validators return `boolean`. They accept both raw and dash-formatted inputs.

## `validateCedula`

Validates a Dominican cédula number using the Luhn (mod-10) algorithm.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `cedula` | `string` | Raw or dash-formatted cédula (e.g. `'40220579912'` or `'402-2057991-2'`) |

**Returns** `boolean` — `true` if valid, `false` otherwise.

**Example**

```ts
import { validateCedula } from 'dr-utils'

validateCedula('40220579912')    // true
validateCedula('402-2057991-2') // true (dashes accepted)
validateCedula('12345678901')   // false
```

## `validateRNC`

Validates a Dominican RNC (Registro Nacional del Contribuyente) using the Luhn algorithm. Also accepts 11-digit cédulas as valid RNCs.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `rnc` | `string` | Raw or dash-formatted RNC (e.g. `'130500292'` or `'130-50029-2'`) |

**Returns** `boolean` — `true` if valid, `false` otherwise.

**Example**

```ts
import { validateRNC } from 'dr-utils'

validateRNC('130500292')    // true
validateRNC('130-50029-2') // true (dashes accepted)
```

## `validateNCF`

Validates a Dominican NCF (Número de Comprobante Fiscal). Supports both physical (11-char) and electronic e-CF (13-char) formats.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `ncf` | `string` | NCF string to validate |

**Returns** `boolean` — `true` if valid, `false` otherwise.

**Example**

```ts
import { validateNCF } from 'dr-utils'

validateNCF('B0183920391')   // true (physical, 11 chars)
validateNCF('E319123402392') // true (electronic e-CF, 13 chars)
```

## `validatePhoneNumber`

Validates a Dominican phone number. Accepts various formats including local, formatted, and with country code. Rejects non-DR numbers.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `number` | `string` | Phone number string in any common Dominican format |

**Returns** `boolean` — `true` if valid, `false` otherwise.

**Example**

```ts
import { validatePhoneNumber } from 'dr-utils'

validatePhoneNumber('8092201111')        // true
validatePhoneNumber('(829) 555-3000')    // true
validatePhoneNumber('18492001234')       // true (with country code)
validatePhoneNumber('+1 (781) 575 4238') // false (non-DR number)
```

## `validatePlate`

Validates a Dominican vehicle license plate against the official DGII category list.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `plate` | `string` | Plate string (case-insensitive) |

**Returns** `boolean` — `true` if valid, `false` otherwise.

**Example**

```ts
import { validatePlate } from 'dr-utils'

validatePlate('A123456') // true (private)
validatePlate('EL12345') // true (electric)
validatePlate('ZZ12345') // false (unknown category)
```

### Plate categories

**Single-letter:** `A` (Automóvil), `B` (Interurbano público), `C` (Turístico), `D` (Autobús público urbano), `F` (Remolque), `G` (Jeep), `H` (Ambulancia), `I` (Autobús privado), `J` (Montacargas), `K` (Motocicleta), `L` (Carga), `M` (Carro fúnebre), `P` (Autobús turístico), `R` (Interurbano público), `S` (Volteo), `T` (Automóvil público urbano), `U` (Máquinas pesadas), `X` (Exhibición), `Z` (Exonerada)

**Two-letter:** `OE` (Ejército Nacional), `OF` (Fuerza Aérea), `OM` (Marina de Guerra), `OP` (Policía Nacional), `EA/ED/EG/EI/EL/EM` (Exonerada estatal — norma No. 14-2011 DGII), `VC` (Consular), `WD` (Diplomática), `OI` (Organismo internacional), `EX/YX/NZ` (Exonerada), `DD` (Dealer)
