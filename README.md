# Dominican Republic Utils

Dominican Republic Utils (hence, `dr-utils`) is a TypeScript library for utilities relevant to the Dominican Republic, such as: Cedula, RNC and NCF validation and formatting.

## Usage

### `validateCedula(cedula: string)`
```ts
import { validateCedula } from 'dr-utils'

const cedula = '40220579912'

const isCedulaValid = validateCedula(cedula) // true
```

### `validateRNC(rnc: string)`
```ts
import { validateRNC } from 'dr-utils'

const rnc = '130500292'

const isRNCValid = validateRNC(rnc) // true
```

### `validateNCF(ncf: string)`
```ts
import { validateNCF } from 'dr-utils'

const ncf = 'E319123402392'

const isNCFValid = validateNCF(ncf) // true
```

### `formatCedula(cedula: string, removeOrAddDashes? = 'remove')`
```ts
import { formatCedula } from 'dr-utils'

const noDashes = formatCedula('402-2057991-2') // 40220579912
const withDashes = formatCedula('40220579912', 'add') // 402-2057991-2
```

### `formatRNC(cedula: string, removeOrAddDashes? = 'remove')`
```ts
import { formatRNC } from 'dr-utils'

const noDashes = formatRNC('130-50029-2') // 130500292
const withDashes = formatRNC('130500292', 'add') // 130-50029-2
```

## Copyright
See [LICENSE](./LICENSE)