# Dominican Republic Utils

<a href="https://www.npmjs.com/package/dr-utils" target="_blank"><img src="https://badgen.net/npm/v/dr-utils"></a>
<a href="https://www.npmjs.com/package/dr-utils" target="_blank"><img src="https://badgen.net/npm/dm/dr-utils"></a>
<a href="https://www.npmjs.com/package/dr-utils" target="_blank"><img src="https://badgen.net/npm/types/dr-utils"></a>
<a href="https://bundlephobia.com/package/dr-utils" target="_blank"><img src="https://badgen.net/bundlephobia/minzip/dr-utils"></a>
![Release and NPM Publish Action](https://github.com/Maikuh/dr-utils/actions/workflows/release-and-publish.yaml/badge.svg)

Language: **English** / [Español](docs/README.es.md)

Dominican Republic Utils (hence, `dr-utils`) is a JavaScript library built with TypeScript for utilities relevant to the Dominican Republic, such as Cedula, RNC, and NCF validation and formatting.

## Installation

```bash
# Using NPM
$ npm i dr-utils

# Using Yarn
$ yarn add dr-utils

# Using PNPM
$ pnpm add dr-utils

# Using Bun
$ bun add dr-utils
```

## Usage

### Validators
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

### Formatters
#### `formatCedula(cedula: string, removeOrAddDashes? = 'remove')`
```ts
import { formatCedula } from 'dr-utils'

const noDashes = formatCedula('402-2057991-2') // 40220579912
const withDashes = formatCedula('40220579912', 'add') // 402-2057991-2
```

#### `formatRNC(cedula: string, removeOrAddDashes? = 'remove')`
```ts
import { formatRNC } from 'dr-utils'

const noDashes = formatRNC('130-50029-2') // 130500292
const withDashes = formatRNC('130500292', 'add') // 130-50029-2
```

#### `formatPhoneNumber(number: string, international = false)`
```ts
import { formatPhoneNumber } from 'dr-utils'

const phoneNumber = '8092201111'

const formatted = formatPhoneNumber(phoneNumber) // (809) 220-1111
const formattedInternational = formatPhoneNumber(phoneNumber, true) // +1 809 220 1111
```

## Contributing
See [CONTRIBUTING](CONTRIBUTING.md)

## Copyright
See [LICENSE](./LICENSE)