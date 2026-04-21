---
sidebar_position: 6
---

# Helpers

## `getMunicipiosByProvincia`

Returns all municipalities belonging to a given Dominican province.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `provincia` | `Provincia` | Province name (typed string literal) |

**Returns** `readonly Municipio[]` — list of municipalities in that province.

**Example**

```ts
import { getMunicipiosByProvincia } from 'dr-utils'

getMunicipiosByProvincia('La Altagracia')
// ['Higüey', 'San Rafael del Yuma']
```

## `getProvinciaByMunicipio`

Returns the province a given Dominican municipality belongs to.

**Arguments**

| Parameter | Type | Description |
|-----------|------|-------------|
| `municipio` | `Municipio` | Municipality name (typed string literal) |

**Returns** `Provincia` — the province that contains the municipality.

**Example**

```ts
import { getProvinciaByMunicipio } from 'dr-utils'

getProvinciaByMunicipio('Sabana Grande de Boyá') // 'Monte Plata'
```

You can also import the `Provincias` constant for the full province list, and `MunicipiosPorProvincia` for the full municipalities map.

---

## `amountToWords`

Converts a number to its Spanish word representation, suitable for checks and invoices. Throws `DrUtilsError` if the value is out of range.

**Arguments**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `value` | `number` | — | Amount to convert (0–999,999,999.99) |
| `options.currency` | `'pesos' \| 'dolares' \| 'none'` | `'pesos'` | Currency suffix appended to the words |

**Returns** `string` — Spanish word representation of the amount.

**Example**

```ts
import { amountToWords } from 'dr-utils'

amountToWords(1234.56)                      // 'mil doscientos treinta y cuatro pesos con 56 centavos'
amountToWords(1, { currency: 'dolares' })   // 'un dólar'
amountToWords(1234, { currency: 'none' })   // 'mil doscientos treinta y cuatro'
```

---

## ITBIS calculations

ITBIS (Dominican VAT) calculations. The default rate is `ITBIS_RATE` (0.18 / 18%).

### `applyItbis`

Adds ITBIS to a net subtotal and returns the gross (ITBIS-inclusive) amount.

**Arguments**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `subtotal` | `number` | — | Net amount before ITBIS |
| `rate` | `number` | `ITBIS_RATE` (0.18) | ITBIS rate to apply |

**Returns** `number` — gross amount rounded to 2 decimal places.

### `removeItbis`

Removes ITBIS from a gross total and returns the net amount.

**Arguments**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `total` | `number` | — | ITBIS-inclusive gross amount |
| `rate` | `number` | `ITBIS_RATE` (0.18) | ITBIS rate to remove |

**Returns** `number` — net amount rounded to 2 decimal places.

### `splitItbis`

Splits a gross total into net, tax, and total components.

**Arguments**

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `total` | `number` | — | ITBIS-inclusive gross amount |
| `rate` | `number` | `ITBIS_RATE` (0.18) | ITBIS rate to split by |

**Returns** `{ net: number; tax: number; total: number }` — all three components rounded to 2 decimal places.

**Example**

```ts
import { applyItbis, removeItbis, splitItbis, ITBIS_RATE } from 'dr-utils'

applyItbis(100)       // 118   — adds 18% ITBIS to a net subtotal
removeItbis(118)      // 100   — extracts net from a gross total
splitItbis(118)       // { net: 100, tax: 18, total: 118 }
applyItbis(100, 0.16) // 116   — custom rate
```
