---
sidebar_position: 6
---

# Helpers

## `getMunicipiosByProvincia`

Retorna todos los municipios pertenecientes a una provincia dominicana.

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `provincia` | `Provincia` | Nombre de la provincia (literal de cadena tipada) |

**Retorna** `readonly Municipio[]` — lista de municipios en esa provincia.

**Ejemplo**

```ts
import { getMunicipiosByProvincia } from 'dr-utils'

getMunicipiosByProvincia('La Altagracia')
// ['Higüey', 'San Rafael del Yuma']
```

## `getProvinciaByMunicipio`

Retorna la provincia a la que pertenece un municipio dominicano.

**Argumentos**

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `municipio` | `Municipio` | Nombre del municipio (literal de cadena tipada) |

**Retorna** `Provincia` — la provincia que contiene el municipio.

**Ejemplo**

```ts
import { getProvinciaByMunicipio } from 'dr-utils'

getProvinciaByMunicipio('Sabana Grande de Boyá') // 'Monte Plata'
```

También puedes importar la constante `Provincias` para la lista completa de provincias, y `MunicipiosPorProvincia` para el mapa completo de municipios.

---

## `amountToWords`

Convierte un número a su representación en palabras en español, ideal para cheques y facturas. Lanza `DrUtilsError` si el valor está fuera de rango.

**Argumentos**

| Parámetro | Tipo | Por defecto | Descripción |
|-----------|------|-------------|-------------|
| `value` | `number` | — | Monto a convertir (0–999,999,999.99) |
| `options.currency` | `'pesos' \| 'dolares' \| 'none'` | `'pesos'` | Sufijo de moneda añadido a las palabras |

**Retorna** `string` — representación en palabras en español del monto.

**Ejemplo**

```ts
import { amountToWords } from 'dr-utils'

amountToWords(1234.56)                      // 'mil doscientos treinta y cuatro pesos con 56 centavos'
amountToWords(1, { currency: 'dolares' })   // 'un dólar'
amountToWords(1234, { currency: 'none' })   // 'mil doscientos treinta y cuatro'
```

---

## Cálculos de ITBIS

Cálculos de ITBIS (IVA dominicano). La tasa por defecto es `ITBIS_RATE` (0.18 / 18%).

### `applyItbis`

Agrega ITBIS a un subtotal neto y retorna el monto bruto (con ITBIS incluido).

**Argumentos**

| Parámetro | Tipo | Por defecto | Descripción |
|-----------|------|-------------|-------------|
| `subtotal` | `number` | — | Monto neto antes del ITBIS |
| `rate` | `number` | `ITBIS_RATE` (0.18) | Tasa de ITBIS a aplicar |

**Retorna** `number` — monto bruto redondeado a 2 decimales.

### `removeItbis`

Extrae el ITBIS de un total bruto y retorna el monto neto.

**Argumentos**

| Parámetro | Tipo | Por defecto | Descripción |
|-----------|------|-------------|-------------|
| `total` | `number` | — | Monto bruto con ITBIS incluido |
| `rate` | `number` | `ITBIS_RATE` (0.18) | Tasa de ITBIS a extraer |

**Retorna** `number` — monto neto redondeado a 2 decimales.

### `splitItbis`

Descompone un total bruto en sus componentes neto, impuesto y total.

**Argumentos**

| Parámetro | Tipo | Por defecto | Descripción |
|-----------|------|-------------|-------------|
| `total` | `number` | — | Monto bruto con ITBIS incluido |
| `rate` | `number` | `ITBIS_RATE` (0.18) | Tasa de ITBIS a descomponer |

**Retorna** `{ net: number; tax: number; total: number }` — los tres componentes redondeados a 2 decimales.

**Ejemplo**

```ts
import { applyItbis, removeItbis, splitItbis, ITBIS_RATE } from 'dr-utils'

applyItbis(100)       // 118   — agrega 18% ITBIS a un subtotal neto
removeItbis(118)      // 100   — extrae el neto de un total bruto
splitItbis(118)       // { net: 100, tax: 18, total: 118 }
applyItbis(100, 0.16) // 116   — tasa personalizada
```
