# Dominican Republic Utils

<a href="https://www.npmjs.com/package/dr-utils" target="_blank"><img src="https://badgen.net/npm/v/dr-utils"></a>
<a href="https://www.npmjs.com/package/dr-utils" target="_blank"><img src="https://badgen.net/npm/dm/dr-utils"></a>
<a href="https://www.npmjs.com/package/dr-utils" target="_blank"><img src="https://badgen.net/npm/types/dr-utils"></a>
<a href="https://bundlephobia.com/package/dr-utils" target="_blank"><img src="https://badgen.net/bundlephobia/minzip/dr-utils"></a>
![Release and NPM Publish Action](https://github.com/Maikuh/dr-utils/actions/workflows/release-and-publish.yaml/badge.svg)
<a href="../LICENSE" target="_blank"><img src="https://badgen.net/static/license/MIT/green"></a>

Idioma: [English](../README.md) / **Español**

Dominican Republic Utils (`dr-utils`) es una librería de TypeScript sin dependencias para utilidades relevantes a la República Dominicana: validación, formateo, parseo, enmascaramiento, cálculos de ITBIS, formato de moneda, y más.

> #### Importante
> Hay cédulas/RNCs que dan falsos negativos (es decir, una cédula válida no pasa la validación) debido a que no coinciden con el algoritmo de Luhn. Es muy probable que el Gobierno dominicano / DGII haya comenzado a emitir cédulas con un algoritmo distinto o con excepciones desconocidas. El porcentaje de fallo calculado con la base de datos pública de RNCs es de aproximadamente un 0.01%.

## Instalación

```bash
npm i dr-utils
yarn add dr-utils
pnpm add dr-utils
bun add dr-utils
```

## Uso

Todas las funciones están disponibles desde la importación raíz o desde sub-rutas nombradas (ver [Rutas de importación](#rutas-de-importación)).

---

### Validadores

#### `validateCedula(cedula: string): boolean`
```ts
import { validateCedula } from 'dr-utils'

validateCedula('40220579912')    // true
validateCedula('402-2057991-2') // true (acepta guiones)
validateCedula('12345678901')   // false
```

#### `validateRNC(rnc: string): boolean`
```ts
import { validateRNC } from 'dr-utils'

validateRNC('130500292')   // true
validateRNC('130-50029-2') // true (acepta guiones)
```

#### `validateNCF(ncf: string): boolean`
```ts
import { validateNCF } from 'dr-utils'

validateNCF('B0183920391')   // true (físico, 11 caracteres)
validateNCF('E319123402392') // true (electrónico e-CF, 13 caracteres)
```

#### `validatePhoneNumber(number: string): boolean`
```ts
import { validatePhoneNumber } from 'dr-utils'

validatePhoneNumber('8092201111')        // true
validatePhoneNumber('(829) 555-3000')    // true
validatePhoneNumber('18492001234')       // true (con código de país)
validatePhoneNumber('+1 (781) 575 4238') // false (no es número dominicano)
```

#### `validatePlate(plate: string): boolean`
```ts
import { validatePlate } from 'dr-utils'

validatePlate('A123456') // true (privado)
validatePlate('EL12345') // true (eléctrico)
validatePlate('ZZ12345') // false (categoría desconocida)
```

**Una letra:** `A` (Automóvil), `B` (Interurbano público), `C` (Turístico), `D` (Autobús público urbano), `F` (Remolque), `G` (Jeep), `H` (Ambulancia), `I` (Autobús privado), `J` (Montacargas), `K` (Motocicleta), `L` (Carga), `M` (Carro fúnebre), `P` (Autobús turístico), `R` (Interurbano público), `S` (Volteo), `T` (Automóvil público urbano), `U` (Máquinas pesadas), `X` (Exhibición), `Z` (Exonerada)

**Dos letras:** `OE` (Ejército Nacional), `OF` (Fuerza Aérea), `OM` (Marina de Guerra), `OP` (Policía Nacional), `EA/ED/EG/EI/EL/EM` (Exonerada estatal — norma No. 14-2011 DGII), `VC` (Consular), `WD` (Diplomática), `OI` (Organismo internacional), `EX/YX/NZ` (Exonerada), `DD` (Dealer)

---

### Formateadores

#### `formatCedula(cedula: string, style?: FormatStyle): string`
```ts
import { formatCedula } from 'dr-utils'

formatCedula('40220579912')                    // '402-2057991-2'
formatCedula('402-2057991-2', 'without-dashes') // '40220579912'
```

#### `formatRNC(rnc: string, style?: FormatStyle): string`
```ts
import { formatRNC } from 'dr-utils'

formatRNC('130500292')                    // '130-50029-2'
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

Los parsers validan la entrada y devuelven un objeto estructurado. Lanzan un `DrUtilsError` si la entrada no es válida (ver [Manejo de errores](#manejo-de-errores)). Para variantes que no lanzan excepciones, usar los [Safe Parsers](#safe-parsers).

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

Los safe parsers envuelven sus contrapartes que lanzan excepciones y devuelven un `Result<T>` en su lugar. En caso de éxito, el valor también incluye un campo `raw` con el identificador normalizado.

```ts
import { safeParseCedula, safeParseRNC, safeParseNCF, safeParsePhoneNumber, safeParsePlate } from 'dr-utils'

const result = safeParseCedula('402-2057991-2')
if (result.ok) {
  console.log(result.value.municipioCode) // '402'
  console.log(result.value.raw)           // '40220579912' (tipo Cedula con marca de tipo)
} else {
  console.error(result.error) // mensaje de error
}
```

Los cinco safe parsers siguen la misma forma `{ ok: true, value } | { ok: false, error }`.

---

### Masks

Los masks ocultan dígitos sensibles manteniendo suficiente estructura para que el dato sea reconocible.

#### `maskCedula(cedula: string): string`
```ts
import { maskCedula } from 'dr-utils'

maskCedula('402-2057991-2') // '402-*******-2'
```

#### `maskRNC(rnc: string): string`
```ts
import { maskRNC } from 'dr-utils'

maskRNC('130720754')   // '130-*****-4'
maskRNC('40220579912') // '402-*******-2' (delega a maskCedula)
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

También puedes importar la constante `Provincias` para la lista completa de provincias, y `MunicipiosPorProvincia` para el mapa completo de municipios.

#### `numeroALetras(value: number, options?: NumeroALetrasOptions): string`

Convierte un número (0–999,999,999.99) a su representación en palabras en español, ideal para cheques y facturas.

```ts
import { numeroALetras } from 'dr-utils'

numeroALetras(1234.56)                    // 'mil doscientos treinta y cuatro pesos con 56/100'
numeroALetras(1, { moneda: 'dolares' })   // 'un dólar'
numeroALetras(1234, { moneda: 'none' })   // 'mil doscientos treinta y cuatro'
```

#### `applyItbis(subtotal: number, rate?: number): number`
#### `removeItbis(total: number, rate?: number): number`
#### `splitItbis(total: number, rate?: number): { net: number; tax: number; total: number }`

Cálculos de ITBIS (IVA dominicano). La tasa por defecto es `ITBIS_RATE` (0.18 / 18%).

```ts
import { applyItbis, removeItbis, splitItbis, ITBIS_RATE } from 'dr-utils'

applyItbis(100)       // 118   — agrega 18% ITBIS a un subtotal neto
removeItbis(118)      // 100   — extrae el neto de un total bruto
splitItbis(118)       // { net: 100, tax: 18, total: 118 }
applyItbis(100, 0.16) // 116   — tasa personalizada
```

---

### Manejo de errores

Todas las funciones que lanzan excepciones en v3 generan un `DrUtilsError` en lugar de un `Error` genérico. Puedes importarlo desde `dr-utils/errors` y distinguir por su campo `.code`.

```ts
import { parseCedula } from 'dr-utils'
import { DrUtilsError } from 'dr-utils/errors'

try {
  parseCedula('invalido')
} catch (e) {
  if (e instanceof DrUtilsError) {
    console.error(e.code)    // 'INVALID_CEDULA'
    console.error(e.message) // '"invalido" is not a valid cedula.'
  }
}
```

**Códigos disponibles:** `INVALID_CEDULA`, `INVALID_RNC`, `INVALID_NCF`, `INVALID_PHONE`, `INVALID_PLATE`, `FORMAT_CEDULA_FAILED`, `FORMAT_RNC_FAILED`, `FORMAT_NCF_FAILED`, `FORMAT_PHONE_FAILED`, `FORMAT_PLATE_FAILED`, `ITBIS_NEGATIVE`, `NUMERO_A_LETRAS_OUT_OF_RANGE`.

---

### Rutas de importación

Cada módulo es tree-shakeable y está disponible como sub-ruta nombrada:

| Sub-ruta | Contenido |
|---|---|
| `dr-utils` | Todo (re-exporta todo lo anterior) |
| `dr-utils/validators` | `validateCedula`, `validateRNC`, `validateNCF`, `validatePhoneNumber`, `validatePlate` |
| `dr-utils/formatters` | `formatCedula`, `formatRNC`, `formatNCF`, `formatPhoneNumber`, `formatPlate`, `formatDOP` |
| `dr-utils/parsers` | `parseCedula`, `parseRNC`, `parseNCF`, `parsePhoneNumber`, `normalizePhoneNumber`, `parsePlate`, `safeParse*` |
| `dr-utils/masks` | `maskCedula`, `maskRNC`, `maskPhoneNumber` |
| `dr-utils/helpers` | `getMunicipiosByProvincia`, `getProvinciaByMunicipio`, `numeroALetras`, `applyItbis`, `removeItbis`, `splitItbis` |
| `dr-utils/constants` | `Provincias`, `MunicipiosPorProvincia`, `ITBIS_RATE`, `PLATE_CATEGORIES`, … |
| `dr-utils/types` | `ParsedCedula`, `ParsedRNC`, `ParsedNCF`, `ParsedPhoneNumber`, `ParsedPlate`, `Result`, … |
| `dr-utils/errors` | `DrUtilsError`, `DrUtilsErrorCode` |

---

## Migrando desde v2

Ver [MIGRATION.md](MIGRATION.md) para la guía completa de migración de v2 a v3.

## Contribuciones

Ver [CONTRIBUTING](../CONTRIBUTING.md)

## Copyright

Ver [LICENSE](../LICENSE)
