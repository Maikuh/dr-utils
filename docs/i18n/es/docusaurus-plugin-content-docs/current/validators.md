---
sidebar_position: 2
---

# Validadores

Todos los validadores retornan `boolean`. Aceptan tanto entradas sin formato como con guiones.

## `validateCedula`

Valida una cédula dominicana usando el algoritmo de Luhn (mod-10).

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `cedula` | `string` | Cédula sin formato o con guiones (ej. `'40220579912'` o `'402-2057991-2'`) |

**Retorna** `boolean` — `true` si es válida, `false` en caso contrario.

**Ejemplo**

```ts
import { validateCedula } from 'dr-utils'

validateCedula('40220579912')    // true
validateCedula('402-2057991-2') // true (acepta guiones)
validateCedula('12345678901')   // false
```

## `validateRNC`

Valida un RNC (Registro Nacional del Contribuyente) dominicano usando el algoritmo de Luhn. También acepta cédulas de 11 dígitos como RNCs válidos.

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `rnc` | `string` | RNC sin formato o con guiones (ej. `'130500292'` o `'130-50029-2'`) |

**Retorna** `boolean` — `true` si es válido, `false` en caso contrario.

**Ejemplo**

```ts
import { validateRNC } from 'dr-utils'

validateRNC('130500292')    // true
validateRNC('130-50029-2') // true (acepta guiones)
```

## `validateNCF`

Valida un NCF (Número de Comprobante Fiscal) dominicano. Soporta tanto el formato físico (11 caracteres) como el electrónico e-CF (13 caracteres).

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `ncf` | `string` | Cadena NCF a validar |

**Retorna** `boolean` — `true` si es válido, `false` en caso contrario.

**Ejemplo**

```ts
import { validateNCF } from 'dr-utils'

validateNCF('B0183920391')   // true (físico, 11 caracteres)
validateNCF('E319123402392') // true (electrónico e-CF, 13 caracteres)
```

## `validatePhoneNumber`

Valida un número de teléfono dominicano. Acepta varios formatos incluyendo local, formateado y con código de país. Rechaza números no dominicanos.

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `number` | `string` | Número de teléfono en cualquier formato dominicano común |

**Retorna** `boolean` — `true` si es válido, `false` en caso contrario.

**Ejemplo**

```ts
import { validatePhoneNumber } from 'dr-utils'

validatePhoneNumber('8092201111')        // true
validatePhoneNumber('(829) 555-3000')    // true
validatePhoneNumber('18492001234')       // true (con código de país)
validatePhoneNumber('+1 (781) 575 4238') // false (no es número dominicano)
```

## `validatePlate`

Valida una placa de vehículo dominicana contra la lista oficial de categorías de la DGII.

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `plate` | `string` | Cadena de placa (sin distinción entre mayúsculas y minúsculas) |

**Retorna** `boolean` — `true` si es válida, `false` en caso contrario.

**Ejemplo**

```ts
import { validatePlate } from 'dr-utils'

validatePlate('A123456') // true (privado)
validatePlate('EL12345') // true (eléctrico)
validatePlate('ZZ12345') // false (categoría desconocida)
```

### Categorías de placas

**Una letra:** `A` (Automóvil), `B` (Interurbano público), `C` (Turístico), `D` (Autobús público urbano), `F` (Remolque), `G` (Jeep), `H` (Ambulancia), `I` (Autobús privado), `J` (Montacargas), `K` (Motocicleta), `L` (Carga), `M` (Carro fúnebre), `P` (Autobús turístico), `R` (Interurbano público), `S` (Volteo), `T` (Automóvil público urbano), `U` (Máquinas pesadas), `X` (Exhibición), `Z` (Exonerada)

**Dos letras:** `OE` (Ejército Nacional), `OF` (Fuerza Aérea), `OM` (Marina de Guerra), `OP` (Policía Nacional), `EA/ED/EG/EI/EL/EM` (Exonerada estatal — norma No. 14-2011 DGII), `VC` (Consular), `WD` (Diplomática), `OI` (Organismo internacional), `EX/YX/NZ` (Exonerada), `DD` (Dealer)
