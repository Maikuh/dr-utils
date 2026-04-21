---
sidebar_position: 3
---

# Formateadores

Los formateadores normalizan cadenas a un formato canónico. Lanzan `DrUtilsError` en caso de entrada inválida.

## `formatCedula`

Formatea una cédula con o sin guiones.

**Argumentos**

| Parámetro | Tipo | Por defecto | Descripción |
|-----------|------|-------------|-------------|
| `cedula` | `string` | — | Cédula sin formato o con guiones |
| `options.dashes` | `boolean` | `true` | Si se incluyen guiones en la salida |

**Retorna** `string` — cédula formateada.

**Ejemplo**

```ts
import { formatCedula } from 'dr-utils'

formatCedula('40220579912')                      // '402-2057991-2'
formatCedula('402-2057991-2', { dashes: false }) // '40220579912'
```

## `formatRNC`

Formatea un RNC con o sin guiones. También acepta cédulas de 11 dígitos.

**Argumentos**

| Parámetro | Tipo | Por defecto | Descripción |
|-----------|------|-------------|-------------|
| `rnc` | `string` | — | RNC o cédula sin formato o con guiones |
| `options.dashes` | `boolean` | `true` | Si se incluyen guiones en la salida |

**Retorna** `string` — RNC formateado.

**Ejemplo**

```ts
import { formatRNC } from 'dr-utils'

formatRNC('130500292')                      // '130-50029-2'
formatRNC('130-50029-2', { dashes: false }) // '130500292'
```

## `formatNCF`

Formatea un NCF con un separador de guión entre el código de serie/tipo y la secuencia.

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `ncf` | `string` | Cadena NCF sin formato |

**Retorna** `string` — NCF formateado con guión.

**Ejemplo**

```ts
import { formatNCF } from 'dr-utils'

formatNCF('B0183920391')   // 'B01-83920391'
formatNCF('E319320341237') // 'E31-9320341237'
```

## `formatPhoneNumber`

Formatea un número de teléfono dominicano en formato nacional o internacional.

**Argumentos**

| Parámetro | Tipo | Por defecto | Descripción |
|-----------|------|-------------|-------------|
| `number` | `string` | — | Número de teléfono en cualquier formato dominicano aceptado |
| `international` | `boolean` | `false` | Si es `true`, retorna formato E.164 (`+1XXXXXXXXXX`) |

**Retorna** `string` — número de teléfono formateado.

**Ejemplo**

```ts
import { formatPhoneNumber } from 'dr-utils'

formatPhoneNumber('8092201111')       // '(809) 220-1111'
formatPhoneNumber('8092201111', true) // '+18092201111'
```

## `formatPlate`

Convierte a mayúsculas y normaliza una placa de vehículo dominicana.

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `plate` | `string` | Cadena de placa (sin distinción entre mayúsculas y minúsculas) |

**Retorna** `string` — placa en mayúsculas.

**Ejemplo**

```ts
import { formatPlate } from 'dr-utils'

formatPlate('a123456') // 'A123456'
formatPlate('el12345') // 'EL12345'
```

## `formatDOP`

Formatea un número como cadena de moneda en Pesos Dominicanos (DOP).

**Argumentos**

| Parámetro | Tipo | Por defecto | Descripción |
|-----------|------|-------------|-------------|
| `value` | `number` | — | Monto a formatear |
| `options.symbol` | `'RD$' \| '$' \| 'none'` | `'RD$'` | Prefijo del símbolo de moneda |
| `options.decimals` | `number` | `2` | Número de decimales |

**Retorna** `string` — cadena de moneda formateada.

**Ejemplo**

```ts
import { formatDOP } from 'dr-utils'

formatDOP(1234.5)                      // 'RD$1,234.50'
formatDOP(1234.5, { symbol: '$' })     // '$1,234.50'
formatDOP(1234.5, { symbol: 'none' })  // '1,234.50'
formatDOP(1234.5, { decimals: 0 })     // 'RD$1,235'
```
