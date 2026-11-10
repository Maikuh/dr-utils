---
sidebar_position: 6
---

# Helpers

## `getMunicipiosByProvincia`

Retorna todos los municipios pertenecientes a una provincia dominicana.

**Argumentos**

| Parámetro   | Tipo        | Descripción                                       |
| ----------- | ----------- | ------------------------------------------------- |
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

| Parámetro   | Tipo        | Descripción                                     |
| ----------- | ----------- | ----------------------------------------------- |
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

| Parámetro          | Tipo                             | Por defecto | Descripción                             |
| ------------------ | -------------------------------- | ----------- | --------------------------------------- |
| `value`            | `number`                         | —           | Monto a convertir (0–999,999,999.99)    |
| `options.currency` | `'pesos' \| 'dolares' \| 'none'` | `'pesos'`   | Sufijo de moneda añadido a las palabras |

**Retorna** `string` — representación en palabras en español del monto.

**Ejemplo**

```ts
import { amountToWords } from 'dr-utils'

amountToWords(1234.56)                      // 'mil doscientos treinta y cuatro pesos con 56 centavos'
amountToWords(1, { currency: 'dolares' })   // 'un dólar'
amountToWords(1234, { currency: 'none' })   // 'mil doscientos treinta y cuatro'
amountToWords(1_000_000)                    // 'un millón de pesos'
```

---

## Cálculos de ITBIS

Cálculos de ITBIS (IVA dominicano). La tasa por defecto es `ITBIS_RATE` (0.18 / 18%).

### `applyItbis`

Agrega ITBIS a un subtotal neto y retorna el monto bruto (con ITBIS incluido).

**Argumentos**

| Parámetro  | Tipo     | Por defecto         | Descripción                |
| ---------- | -------- | ------------------- | -------------------------- |
| `subtotal` | `number` | —                   | Monto neto antes del ITBIS |
| `rate`     | `number` | `ITBIS_RATE` (0.18) | Tasa de ITBIS a aplicar    |

**Retorna** `number` — monto bruto redondeado a 2 decimales.

### `removeItbis`

Extrae el ITBIS de un total bruto y retorna el monto neto.

**Argumentos**

| Parámetro | Tipo     | Por defecto         | Descripción                    |
| --------- | -------- | ------------------- | ------------------------------ |
| `total`   | `number` | —                   | Monto bruto con ITBIS incluido |
| `rate`    | `number` | `ITBIS_RATE` (0.18) | Tasa de ITBIS a extraer        |

**Retorna** `number` — monto neto redondeado a 2 decimales.

### `splitItbis`

Descompone un total bruto en sus componentes neto, impuesto y total.

**Argumentos**

| Parámetro | Tipo     | Por defecto         | Descripción                    |
| --------- | -------- | ------------------- | ------------------------------ |
| `total`   | `number` | —                   | Monto bruto con ITBIS incluido |
| `rate`    | `number` | `ITBIS_RATE` (0.18) | Tasa de ITBIS a descomponer    |

**Retorna** `{ net: number; tax: number; total: number }` — los tres componentes redondeados a 2 decimales.

**Ejemplo**

```ts
import { applyItbis, removeItbis, splitItbis, ITBIS_RATE } from 'dr-utils'

applyItbis(100)       // 118   — agrega 18% ITBIS a un subtotal neto
removeItbis(118)      // 100   — extrae el neto de un total bruto
splitItbis(118)       // { net: 100, tax: 18, total: 118 }
applyItbis(100, 0.16) // 116   — tasa personalizada
```

Las tres lanzan `DrUtilsError` si el monto es negativo (`ITBIS_NEGATIVE`), no finito (`ITBIS_INVALID_AMOUNT`), o si la tasa es negativa o no finita (`ITBIS_INVALID_RATE`).

---

## Búsqueda de provincias y municipios

### `findProvincia` / `findMunicipio`

Encuentran una provincia o municipio a partir de texto escrito por el usuario, sin importar mayúsculas, tildes ni espacios extra. `findProvincia` también acepta nombres alternativos comunes: `Baoruco`, `Montecristi` y `Salcedo` (hoy Hermanas Mirabal).

**Retorna** el nombre oficial (`Provincia` / `Municipio`), o `undefined` si no hay coincidencia.

```ts
import { findMunicipio, findProvincia } from 'dr-utils'

findProvincia('dajabon')                 // 'Dajabón'
findProvincia('SAN PEDRO DE MACORIS')    // 'San Pedro de Macorís'
findProvincia('Salcedo')                 // 'Hermanas Mirabal'
findProvincia('Narnia')                  // undefined
findMunicipio('tabara arriba')           // 'Tábara Arriba'
```

Para formularios, `provinciaSchema()` y `municipioSchema()` los envuelven como [schemas](./schemas.md).

### `getProvinciaISOCode` / `getProvinciaByISOCode`

Convierten entre provincias y sus códigos [ISO 3166-2:DO](https://en.wikipedia.org/wiki/ISO_3166-2:DO) (`DO-01` Distrito Nacional … `DO-32` Santo Domingo). El número coincide con el código de provincia de la ONE. El mapa completo se exporta como `ProvinciaISOCodes`.

```ts
import { getProvinciaByISOCode, getProvinciaISOCode } from 'dr-utils'

getProvinciaISOCode('Dajabón')   // 'DO-05'
getProvinciaByISOCode('DO-05')   // 'Dajabón'
getProvinciaByISOCode('5')       // 'Dajabón' (prefijo y cero inicial opcionales)
getProvinciaByISOCode('DO-99')   // undefined
```

---

## Nómina (TSS e ISR)

Descuentos mensuales de nómina para empleados asalariados. Todos los montos en DOP, redondeados a centavos.

:::caution Los valores cambian con el tiempo
Los valores por defecto son los vigentes en **2026**:

- **TSS:** tasas de la Ley 87-01 y topes basados en el salario mínimo cotizable de RD$23,223.00 (`TSS_MINIMUM_WAGE`, vigente desde el 1 de febrero de 2026).
- **ISR:** la escala 2026 de la DGII (`ISR_SCALE_2026`). Los ingresos de hasta RD$416,220.00 al año están exentos.

La Ley 30-26 introduce una nueva escala de ISR a partir de 2027. Cuando cambien los valores, pásalos como opciones hasta que la librería se actualice. Estas funciones son estimaciones y no constituyen asesoría fiscal.
:::

### `calculateTSS`

Descuentos del empleado y aportes del empleador, con cada aporte limitado a un múltiplo del salario mínimo cotizable. Cada tope es ese múltiplo × RD$23,223.

| Aporte                  | Empleado | Empleador                     | Tope (2026)               |
| ----------------------- | -------- | ----------------------------- | ------------------------- |
| AFP (pensiones)         | 2.87%    | 7.10%                         | 20 × salario = RD$464,460 |
| SFS (salud)             | 3.04%    | 7.09%                         | 10 × salario = RD$232,230 |
| SRL (riesgos laborales) | —        | 1.10% por defecto (`srlRate`) | 4 × salario = RD$92,892   |

| Parámetro             | Tipo     | Por defecto        | Descripción                                         |
| --------------------- | -------- | ------------------ | --------------------------------------------------- |
| `monthlySalary`       | `number` | —                  | Salario bruto mensual                               |
| `options.minimumWage` | `number` | `TSS_MINIMUM_WAGE` | Salario mínimo cotizable usado para los topes       |
| `options.srlRate`     | `number` | `0.011`            | Tasa SRL del empleador según su categoría de riesgo |

```ts
import { calculateTSS } from 'dr-utils'

calculateTSS(50_000)
// {
//   employee: { afp: 1435, sfs: 1520, total: 2955 },
//   employer: { afp: 3550, sfs: 3545, srl: 550, total: 7645 },
// }
```

### `calculateISR`

ISR anual para un ingreso anual gravable (ingreso después de la TSS). Pasa un `ISRBracket[]` propio como segundo argumento para usar otra escala.

```ts
import { calculateISR } from 'dr-utils'

calculateISR(400_000)  // 0 — exento
calculateISR(500_000)  // 12567
```

### `calculateNetSalary`

Salario neto mensual: bruto menos AFP, SFS y la retención de ISR. La retención es el ISR sobre (bruto − TSS) × 12, dividido entre 12. Acepta las opciones de `calculateTSS` más `isrScale`.

```ts
import { calculateNetSalary } from 'dr-utils'

calculateNetSalary(50_000)
// { gross: 50000, afp: 1435, sfs: 1520, isr: 1854, totalDeductions: 4809, net: 45191 }
```
