# Dominican Republic Utils

<a href="https://www.npmjs.com/package/dr-utils" target="_blank"><img src="https://badgen.net/npm/v/dr-utils"></a>
<a href="https://www.npmjs.com/package/dr-utils" target="_blank"><img src="https://badgen.net/npm/dm/dr-utils"></a>
<a href="https://www.npmjs.com/package/dr-utils" target="_blank"><img src="https://badgen.net/npm/types/dr-utils"></a>
<a href="https://bundlephobia.com/package/dr-utils" target="_blank"><img src="https://badgen.net/bundlephobia/minzip/dr-utils"></a>
![Release and NPM Publish Action](https://github.com/Maikuh/dr-utils/actions/workflows/release-and-publish.yaml/badge.svg)
<a href="LICENSE" target="_blank"><img src="https://badgen.net/static/license/MIT/green"></a>

Idioma: [English](../README.md) / **Español**

Dominican Republic Utils (por eso, `dr-utils`) es una libreria de JavaScript hecha con Typescript con utilidades relevantes para la República Dominicana, tales como validación y formateo de Cedula, RNC, NCF y números telefónicos.

## Instalación

```bash
# Con NPM
$ npm i dr-utils

# Con Yarn
$ yarn add dr-utils

# Con PNPM
$ pnpm add dr-utils

# Con Bun
$ bun add dr-utils
```

## Uso

### Validadores
#### `validateCedula(cedula: string)`
```ts
import { validateCedula } from 'dr-utils'

const cedula = '40220579912'

const isCedulaValid = validateCedula(cedula) // true
```

#### `validateRNC(rnc: string)`
```ts
import { validateRNC } from 'dr-utils'

const rnc = '130500292'

const isRNCValid = validateRNC(rnc) // true
```

#### `validateNCF(ncf: string)`
```ts
import { validateNCF } from 'dr-utils'

const ncf = 'E319123402392'

const isNCFValid = validateNCF(ncf) // true
```

#### `validatePhoneNumber(number: string)`
```ts
import { validatePhoneNumber } from 'dr-utils'

const isPhoneNumberOneValid = validatePhoneNumber('8092201111') // true
const isPhoneNumberTwoValid = validatePhoneNumber('+1 (781) 575 4238') // false
```

### Formateadores
#### `formatCedula(cedula: string, style? = 'with-dashes')`
```ts
import { formatCedula } from 'dr-utils'

const withDashes = formatCedula('40220579912') // 402-2057991-2
const withoutDashes = formatCedula('402-2057991-2', 'without-dashes') // 40220579912
```

#### `formatRNC(cedula: string, style? = 'with-dashes')`
```ts
import { formatRNC } from 'dr-utils'

const withDashes = formatRNC('130500292') // 130-50029-2
const withoutDashes = formatRNC('130-50029-2', 'without-dashes') // 130500292
```

#### `formatPhoneNumber(number: string, international? = false)`
```ts
import { formatPhoneNumber } from 'dr-utils'

const phoneNumber = '8092201111'

const formatted = formatPhoneNumber(phoneNumber) // (809) 220-1111
const formattedInternational = formatPhoneNumber(phoneNumber, true) // +18092201111
```

## Contribuciones
Ver [CONTRIBUTING](../CONTRIBUTING.md)

## Copyright
Ver [LICENSE](../LICENSE)