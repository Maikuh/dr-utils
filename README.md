# Dominican Republic Utils

<a href="https://www.npmjs.com/package/dr-utils" target="_blank"><img src="https://badgen.net/npm/v/dr-utils"></a>
<a href="https://www.npmjs.com/package/dr-utils" target="_blank"><img src="https://badgen.net/npm/dm/dr-utils"></a>
<a href="https://www.npmjs.com/package/dr-utils" target="_blank"><img src="https://badgen.net/npm/types/dr-utils"></a>
<a href="https://bundlephobia.com/package/dr-utils" target="_blank"><img src="https://badgen.net/bundlephobia/minzip/dr-utils"></a>
![Release and NPM Publish Action](https://github.com/Maikuh/dr-utils/actions/workflows/release-and-publish.yaml/badge.svg)
<a href="LICENSE" target="_blank"><img src="https://badgen.net/static/license/MIT/green"></a>

Language: **English** / [Español](docs/README.es.md)

Dominican Republic Utils (`dr-utils`) is a zero-dependency TypeScript library for utilities relevant to the Dominican Republic: validation, formatting, parsing, masking, ITBIS tax calculations, currency formatting, and more.

> #### Important
> There are Cedulas/RNCs that give false negatives (i.e. a valid cedula fails validation) due to not matching the Luhn algorithm. The Dominican Government / DGII may have started issuing cedulas under a different algorithm or with unknown exceptions. The calculated failure rate using the public RNC database is approximately 0.01%.

## Installation

```bash
npm i dr-utils
yarn add dr-utils
pnpm add dr-utils
bun add dr-utils
```

## Usage

All functions are available from the root import or from named sub-paths (see [Import Paths](#import-paths)).

---

### Validators

#### `validateCedula(cedula: string): boolean`
```ts
import { validateCedula } from 'dr-utils'

validateCedula('40220579912')    // true
validateCedula('402-2057991-2') // true (dashes accepted)
validateCedula('12345678901')   // false
```

#### `validateRNC(rnc: string): boolean`
```ts
import { validateRNC } from 'dr-utils'

validateRNC('130500292')   // true
validateRNC('130-50029-2') // true (dashes accepted)
```

#### `validateNCF(ncf: string): boolean`
```ts
import { validateNCF } from 'dr-utils'

validateNCF('B0183920391')    // true (physical, 11 chars)
validateNCF('E319123402392')  // true (electronic e-CF, 13 chars)
```

#### `validatePhoneNumber(number: string): boolean`
```ts
import { validatePhoneNumber } from 'dr-utils'

validatePhoneNumber('8092201111')      // true
validatePhoneNumber('(829) 555-3000')  // true
validatePhoneNumber('18492001234')     // true (with country code)
validatePhoneNumber('+1 (781) 575 4238') // false (non-DR)
```

#### `validatePlate(plate: string): boolean`
```ts
import { validatePlate } from 'dr-utils'

validatePlate('A123456')  // true (private)
validatePlate('EL12345')  // true (electric)
validatePlate('ZZ12345')  // false (unknown category)
```

**Single-letter:** `A` (Automóvil), `B` (Interurbano público), `C` (Turístico), `D` (Autobús público urbano), `F` (Remolque), `G` (Jeep), `H` (Ambulancia), `I` (Autobús privado), `J` (Montacargas), `K` (Motocicleta), `L` (Carga), `M` (Carro fúnebre), `P` (Autobús turístico), `R` (Interurbano público), `S` (Volteo), `T` (Automóvil público urbano), `U` (Máquinas pesadas), `X` (Exhibición), `Z` (Exonerada)

**Two-letter:** `OE` (Ejército Nacional), `OF` (Fuerza Aérea), `OM` (Marina de Guerra), `OP` (Policía Nacional), `EA/ED/EG/EI/EL/EM` (Exonerada estatal — norma No. 14-2011 DGII), `VC` (Consular), `WD` (Diplomática), `OI` (Organismo internacional), `EX/YX/NZ` (Exonerada), `DD` (Dealer)

---

### Formatters

#### `formatCedula(cedula: string, style?: FormatStyle): string`
```ts
import { formatCedula } from 'dr-utils'

formatCedula('40220579912')               // '402-2057991-2'
formatCedula('402-2057991-2', 'without-dashes') // '40220579912'
```

#### `formatRNC(rnc: string, style?: FormatStyle): string`
```ts
import { formatRNC } from 'dr-utils'

formatRNC('130500292')               // '130-50029-2'
formatRNC('130-50029-2', 'without-dashes') // '130500292'
```

#### `formatNCF(ncf: string): string`
```ts
import { formatNCF } from 'dr-utils'

formatNCF('B0183920391')   // 'B01-83920391'
formatNCF('E319320341237') // 'E31-9320341237'
```

#### `formatPhoneNumber(number: string, international?: boolean): string`
```ts
import { formatPhoneNumber } from 'dr-utils'

formatPhoneNumber('8092201111')       // '(809) 220-1111'
formatPhoneNumber('8092201111', true) // '+18092201111'
```

#### `formatPlate(plate: string): string`
```ts
import { formatPlate } from 'dr-utils'

formatPlate('a123456') // 'A123456'
formatPlate('el12345') // 'EL12345'
```

#### `formatDOP(value: number, options?: FormatDOPOptions): string`
```ts
import { formatDOP } from 'dr-utils'

formatDOP(1234.5)                      // 'RD$1,234.50'
formatDOP(1234.5, { symbol: '$' })     // '$1,234.50'
formatDOP(1234.5, { symbol: 'none' })  // '1,234.50'
formatDOP(1234.5, { decimals: 0 })     // 'RD$1,235'
```

---

### Parsers

Parsers validate input and return a structured object. They throw `DrUtilsError` on invalid input (see [Error Handling](#error-handling)). For a non-throwing variant, use the [Safe Parsers](#safe-parsers).

#### `parseCedula(cedula: string): ParsedCedula`
```ts
import { parseCedula } from 'dr-utils'

const result = parseCedula('402-2057991-2')
// {
//   municipioCode: '402',
//   sequence: '2057991',
//   checkDigit: '2',
//   formatted: '402-2057991-2'
// }
```

#### `parseRNC(rnc: string): ParsedRNC`
```ts
import { parseRNC } from 'dr-utils'

const rnc = parseRNC('130-72075-4')
// { kind: 'rnc', sequence: '13072075', checkDigit: '4', formatted: '130-72075-4' }

const cedula = parseRNC('40220579912')
// { kind: 'cedula', municipioCode: '402', sequence: '2057991', checkDigit: '2', formatted: '402-2057991-2' }
```

#### `parseNCF(ncf: string): ParsedNCF`
```ts
import { parseNCF } from 'dr-utils'

const result = parseNCF('B0183920391')
// {
//   kind: 'physical',
//   series: 'B',
//   typeCode: '01',
//   typeName: 'Factura de Crédito Fiscal',
//   sequence: '83920391',
//   formatted: 'B01-83920391'
// }
```

#### `parsePhoneNumber(number: string): ParsedPhoneNumber`
#### `normalizePhoneNumber(number: string): string`
```ts
import { parsePhoneNumber, normalizePhoneNumber } from 'dr-utils'

const result = parsePhoneNumber('(809) 220-1111')
// { areaCode: '809', prefix: '220', line: '1111', national: '(809) 220-1111', international: '+18092201111' }

normalizePhoneNumber('(809) 220-1111') // '8092201111'
```

#### `parsePlate(plate: string): ParsedPlate`
```ts
import { parsePlate } from 'dr-utils'

const result = parsePlate('EL12345')
// { category: 'EL', categoryName: 'Eléctrico', sequence: '12345', formatted: 'EL12345' }
```

---

### Safe Parsers

Safe parsers wrap their throwing counterparts and return a `Result<T>` instead of throwing. On success the value also includes a `raw` branded field with the normalized identifier.

```ts
import { safeParseCedula, safeParseRNC, safeParseNCF, safeParsePhoneNumber, safeParsePlate } from 'dr-utils'

const result = safeParseCedula('402-2057991-2')
if (result.ok) {
  console.log(result.value.municipioCode) // '402'
  console.log(result.value.raw)           // '40220579912' (branded Cedula type)
} else {
  console.error(result.error) // error message string
}
```

All five safe parsers follow the same `{ ok: true, value } | { ok: false, error }` shape.

---

### Masks

Masks redact sensitive digits while preserving enough structure to remain recognizable.

#### `maskCedula(cedula: string): string`
```ts
import { maskCedula } from 'dr-utils'

maskCedula('402-2057991-2') // '402-*******-2'
```

#### `maskRNC(rnc: string): string`
```ts
import { maskRNC } from 'dr-utils'

maskRNC('130720754')  // '130-*****-4'
maskRNC('40220579912') // '402-*******-2' (delegates to maskCedula)
```

#### `maskPhoneNumber(phoneNumber: string): string`
```ts
import { maskPhoneNumber } from 'dr-utils'

maskPhoneNumber('(809) 220-1111') // '(809) ***-1111'
```

---

### Helpers

#### `getMunicipiosByProvincia(provincia: Provincia): readonly Municipio[]`
```ts
import { getMunicipiosByProvincia } from 'dr-utils'

getMunicipiosByProvincia('La Altagracia')
// ['Higüey', 'San Rafael del Yuma']
```

#### `getProvinciaByMunicipio(municipio: Municipio): Provincia`
```ts
import { getProvinciaByMunicipio } from 'dr-utils'

getProvinciaByMunicipio('Sabana Grande de Boyá') // 'Monte Plata'
```

You can also import the `Provincias` constant for the full province list, and `MunicipiosPorProvincia` for the full municipalities map.

#### `amountToWords(value: number, options?: AmountToWordsOptions): string`

Converts a number (0–999,999,999.99) to its Spanish word representation, suitable for checks and invoices.

```ts
import { amountToWords } from 'dr-utils'

amountToWords(1234.56)                      // 'mil doscientos treinta y cuatro pesos con 56 centavos'
amountToWords(1, { currency: 'dolares' })   // 'un dólar'
amountToWords(1234, { currency: 'none' })   // 'mil doscientos treinta y cuatro'
```

#### `applyItbis(subtotal: number, rate?: number): number`
#### `removeItbis(total: number, rate?: number): number`
#### `splitItbis(total: number, rate?: number): { net: number; tax: number; total: number }`

ITBIS (Dominican VAT) calculations. The default rate is `ITBIS_RATE` (0.18 / 18%).

```ts
import { applyItbis, removeItbis, splitItbis, ITBIS_RATE } from 'dr-utils'

applyItbis(100)         // 118   — adds 18% ITBIS to a net subtotal
removeItbis(118)        // 100   — extracts net from a gross total
splitItbis(118)         // { net: 100, tax: 18, total: 118 }
applyItbis(100, 0.16)   // 116   — custom rate
```

---

### Error Handling

All throwing functions in v3 raise a `DrUtilsError` instead of a plain `Error`. You can import it from `dr-utils/errors` and match on its `.code` field for structured handling.

```ts
import { parseCedula } from 'dr-utils'
import { DrUtilsError } from 'dr-utils/errors'

try {
  parseCedula('invalid')
} catch (e) {
  if (e instanceof DrUtilsError) {
    console.error(e.code)    // 'INVALID_CEDULA'
    console.error(e.message) // '"invalid" is not a valid cedula.'
  }
}
```

**Available error codes:** `INVALID_CEDULA`, `INVALID_RNC`, `INVALID_NCF`, `INVALID_PHONE`, `INVALID_PLATE`, `FORMAT_CEDULA_FAILED`, `FORMAT_RNC_FAILED`, `FORMAT_NCF_FAILED`, `FORMAT_PHONE_FAILED`, `FORMAT_PLATE_FAILED`, `ITBIS_NEGATIVE`, `AMOUNT_TO_WORDS_OUT_OF_RANGE`.

---

### Import Paths

Every module is tree-shakeable and available as a named sub-path:

| Sub-path | Contents |
|---|---|
| `dr-utils` | Everything (re-exports all below) |
| `dr-utils/validators` | `validateCedula`, `validateRNC`, `validateNCF`, `validatePhoneNumber`, `validatePlate` |
| `dr-utils/formatters` | `formatCedula`, `formatRNC`, `formatNCF`, `formatPhoneNumber`, `formatPlate`, `formatDOP` |
| `dr-utils/parsers` | `parseCedula`, `parseRNC`, `parseNCF`, `parsePhoneNumber`, `normalizePhoneNumber`, `parsePlate`, `safeParse*` |
| `dr-utils/masks` | `maskCedula`, `maskRNC`, `maskPhoneNumber` |
| `dr-utils/helpers` | `getMunicipiosByProvincia`, `getProvinciaByMunicipio`, `amountToWords`, `applyItbis`, `removeItbis`, `splitItbis` |
| `dr-utils/constants` | `Provincias`, `MunicipiosPorProvincia`, `ITBIS_RATE`, `PLATE_CATEGORIES`, … |
| `dr-utils/types` | `ParsedCedula`, `ParsedRNC`, `ParsedNCF`, `ParsedPhoneNumber`, `ParsedPlate`, `Result`, … |
| `dr-utils/errors` | `DrUtilsError`, `DrUtilsErrorCode` |

---

## Migrating from v2

See [docs/MIGRATION.md](docs/MIGRATION.md) for the full v2 → v3 migration guide.

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md)

## Copyright

See [LICENSE](LICENSE)
