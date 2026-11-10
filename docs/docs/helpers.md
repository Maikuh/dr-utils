---
sidebar_position: 6
---

# Helpers

## `getMunicipiosByProvincia`

Returns all municipalities belonging to a given Dominican province.

**Arguments**

| Parameter   | Type        | Description                          |
| ----------- | ----------- | ------------------------------------ |
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

| Parameter   | Type        | Description                              |
| ----------- | ----------- | ---------------------------------------- |
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

| Parameter          | Type                             | Default   | Description                           |
| ------------------ | -------------------------------- | --------- | ------------------------------------- |
| `value`            | `number`                         | —         | Amount to convert (0–999,999,999.99)  |
| `options.currency` | `'pesos' \| 'dolares' \| 'none'` | `'pesos'` | Currency suffix appended to the words |

**Returns** `string` — Spanish word representation of the amount.

**Example**

```ts
import { amountToWords } from 'dr-utils'

amountToWords(1234.56)                      // 'mil doscientos treinta y cuatro pesos con 56 centavos'
amountToWords(1, { currency: 'dolares' })   // 'un dólar'
amountToWords(1234, { currency: 'none' })   // 'mil doscientos treinta y cuatro'
amountToWords(1_000_000)                    // 'un millón de pesos'
```

---

## ITBIS calculations

ITBIS (Dominican VAT) calculations. The default rate is `ITBIS_RATE` (0.18 / 18%).

### `applyItbis`

Adds ITBIS to a net subtotal and returns the gross (ITBIS-inclusive) amount.

**Arguments**

| Parameter  | Type     | Default             | Description             |
| ---------- | -------- | ------------------- | ----------------------- |
| `subtotal` | `number` | —                   | Net amount before ITBIS |
| `rate`     | `number` | `ITBIS_RATE` (0.18) | ITBIS rate to apply     |

**Returns** `number` — gross amount rounded to 2 decimal places.

### `removeItbis`

Removes ITBIS from a gross total and returns the net amount.

**Arguments**

| Parameter | Type     | Default             | Description                  |
| --------- | -------- | ------------------- | ---------------------------- |
| `total`   | `number` | —                   | ITBIS-inclusive gross amount |
| `rate`    | `number` | `ITBIS_RATE` (0.18) | ITBIS rate to remove         |

**Returns** `number` — net amount rounded to 2 decimal places.

### `splitItbis`

Splits a gross total into net, tax, and total components.

**Arguments**

| Parameter | Type     | Default             | Description                  |
| --------- | -------- | ------------------- | ---------------------------- |
| `total`   | `number` | —                   | ITBIS-inclusive gross amount |
| `rate`    | `number` | `ITBIS_RATE` (0.18) | ITBIS rate to split by       |

**Returns** `{ net: number; tax: number; total: number }` — all three components rounded to 2 decimal places.

**Example**

```ts
import { applyItbis, removeItbis, splitItbis, ITBIS_RATE } from 'dr-utils'

applyItbis(100)       // 118   — adds 18% ITBIS to a net subtotal
removeItbis(118)      // 100   — extracts net from a gross total
splitItbis(118)       // { net: 100, tax: 18, total: 118 }
applyItbis(100, 0.16) // 116   — custom rate
```

All three throw `DrUtilsError` for a negative amount (`ITBIS_NEGATIVE`), a non-finite amount (`ITBIS_INVALID_AMOUNT`), or a negative/non-finite rate (`ITBIS_INVALID_RATE`).

---

## Province & municipality lookup

### `findProvincia` / `findMunicipio`

Find a province or municipality from user-typed text, ignoring case, accents and extra whitespace. `findProvincia` also accepts common alternative names: `Baoruco`, `Montecristi` and `Salcedo` (now Hermanas Mirabal).

**Returns** the official `Provincia` / `Municipio` name, or `undefined` if nothing matches.

```ts
import { findMunicipio, findProvincia } from 'dr-utils'

findProvincia('dajabon')                 // 'Dajabón'
findProvincia('SAN PEDRO DE MACORIS')    // 'San Pedro de Macorís'
findProvincia('Salcedo')                 // 'Hermanas Mirabal'
findProvincia('Narnia')                  // undefined
findMunicipio('tabara arriba')           // 'Tábara Arriba'
```

For forms, `provinciaSchema()` and `municipioSchema()` wrap these as [schemas](./schemas.md).

### `getProvinciaISOCode` / `getProvinciaByISOCode`

Convert between provinces and their [ISO 3166-2:DO](https://en.wikipedia.org/wiki/ISO_3166-2:DO) codes (`DO-01` Distrito Nacional … `DO-32` Santo Domingo). The number matches the ONE province code. The full map is exported as `ProvinciaISOCodes`.

```ts
import { getProvinciaByISOCode, getProvinciaISOCode } from 'dr-utils'

getProvinciaISOCode('Dajabón')   // 'DO-05'
getProvinciaByISOCode('DO-05')   // 'Dajabón'
getProvinciaByISOCode('5')       // 'Dajabón' (prefix and leading zero optional)
getProvinciaByISOCode('DO-99')   // undefined
```

---

## Payroll (TSS & ISR)

Monthly payroll deductions for salaried employees. All amounts are DOP, rounded to cents.

:::caution Values change over time
The defaults are the values in effect for **2026**:

- **TSS:** rates under Ley 87-01, and caps based on the minimum contributory wage of RD$23,223.00 (`TSS_MINIMUM_WAGE`, effective February 1, 2026).
- **ISR:** the DGII 2026 scale (`ISR_SCALE_2026`). Income up to RD$416,220.00 a year is exempt.

Ley 30-26 introduces a new ISR scale from 2027. When values change, pass them as options until the library is updated. These helpers are estimates and are not tax advice.
:::

### `calculateTSS`

Employee deductions and employer contributions, with each contribution capped at a multiple of the minimum contributory wage. Each cap is that multiple × RD$23,223.

| Contribution            | Employee | Employer                  | Cap (2026)             |
| ----------------------- | -------- | ------------------------- | ---------------------- |
| AFP (pensions)          | 2.87%    | 7.10%                     | 20 × wage = RD$464,460 |
| SFS (health)            | 3.04%    | 7.09%                     | 10 × wage = RD$232,230 |
| SRL (occupational risk) | —        | 1.10% default (`srlRate`) | 4 × wage = RD$92,892   |

| Parameter             | Type     | Default            | Description                                    |
| --------------------- | -------- | ------------------ | ---------------------------------------------- |
| `monthlySalary`       | `number` | —                  | Gross monthly salary                           |
| `options.minimumWage` | `number` | `TSS_MINIMUM_WAGE` | Minimum contributory wage used for the caps    |
| `options.srlRate`     | `number` | `0.011`            | Employer SRL rate for the company's risk class |

```ts
import { calculateTSS } from 'dr-utils'

calculateTSS(50_000)
// {
//   employee: { afp: 1435, sfs: 1520, total: 2955 },
//   employer: { afp: 3550, sfs: 3545, srl: 550, total: 7645 },
// }
```

### `calculateISR`

Annual income tax for an annual taxable income (income after TSS). Pass a custom `ISRBracket[]` as the second argument to use a different scale.

```ts
import { calculateISR } from 'dr-utils'

calculateISR(400_000)  // 0 — exempt
calculateISR(500_000)  // 12567
```

### `calculateNetSalary`

Monthly net salary: gross minus AFP, SFS and the ISR withholding. The ISR withholding is the ISR on (gross − TSS) × 12, divided by 12. Accepts the `calculateTSS` options plus `isrScale`.

```ts
import { calculateNetSalary } from 'dr-utils'

calculateNetSalary(50_000)
// { gross: 50000, afp: 1435, sfs: 1520, isr: 1854, totalDeductions: 4809, net: 45191 }
```
