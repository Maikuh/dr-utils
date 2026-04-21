---
sidebar_position: 5
---

# Máscaras

Los masks ocultan dígitos sensibles manteniendo suficiente estructura para que el dato sea reconocible.

## `maskCedula`

Reemplaza la secuencia central de una cédula con asteriscos.

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `cedula` | `string` | Cédula sin formato o con guiones |

**Retorna** `string` — cédula enmascarada (ej. `'402-*******-2'`).

**Ejemplo**

```ts
import { maskCedula } from 'dr-utils'

maskCedula('402-2057991-2') // '402-*******-2'
```

## `maskRNC`

Enmascara un RNC o cédula usada como RNC. Para cédulas de 11 dígitos, delega a `maskCedula`.

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `rnc` | `string` | RNC o cédula sin formato o con guiones |

**Retorna** `string` — identificador enmascarado.

**Ejemplo**

```ts
import { maskRNC } from 'dr-utils'

maskRNC('130720754')   // '130-*****-4'
maskRNC('40220579912') // '402-*******-2' (delega a maskCedula)
```

## `maskPhoneNumber`

Reemplaza los dígitos centrales de un número de teléfono con asteriscos.

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `phoneNumber` | `string` | Número de teléfono en cualquier formato dominicano aceptado |

**Retorna** `string` — número de teléfono enmascarado.

**Ejemplo**

```ts
import { maskPhoneNumber } from 'dr-utils'

maskPhoneNumber('(809) 220-1111') // '(809) ***-1111'
```
