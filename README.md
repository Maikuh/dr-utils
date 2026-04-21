# Dominican Republic Utils

<a href="https://www.npmjs.com/package/dr-utils" target="_blank"><img src="https://badgen.net/npm/v/dr-utils"></a>
<a href="https://www.npmjs.com/package/dr-utils" target="_blank"><img src="https://badgen.net/npm/dm/dr-utils"></a>
<a href="https://www.npmjs.com/package/dr-utils" target="_blank"><img src="https://badgen.net/npm/types/dr-utils"></a>
<a href="https://bundlephobia.com/package/dr-utils" target="_blank"><img src="https://badgen.net/bundlephobia/minzip/dr-utils"></a>
![Release and NPM Publish Action](https://github.com/Maikuh/dr-utils/actions/workflows/release-and-publish.yaml/badge.svg)
<a href="LICENSE" target="_blank"><img src="https://badgen.net/static/license/MIT/green"></a>

Language: **English** / [Español](https://maikuh.github.io/dr-utils/es/)

Dominican Republic Utils (`dr-utils`) is a zero-dependency TypeScript library for utilities relevant to the Dominican Republic: validation, formatting, parsing, masking, ITBIS tax calculations, currency formatting, and more.

**Full documentation:** https://maikuh.github.io/dr-utils/

## Installation

```bash
npm i dr-utils
yarn add dr-utils
pnpm add dr-utils
bun add dr-utils
```

## Quick example

```ts
import { validateCedula, parseCedula, formatDOP, applyItbis } from 'dr-utils'

validateCedula('402-2057991-2') // true

const { municipioCode, sequence, formatted } = parseCedula('40220579912')
// { municipioCode: '402', sequence: '2057991', formatted: '402-2057991-2' }

formatDOP(1234.5)   // 'RD$1,234.50'
applyItbis(100)     // 118
```

## Migrating from v2

See the [migration guide](https://maikuh.github.io/dr-utils/docs/migration) for breaking changes and new features in v3.

## Contributing

See [CONTRIBUTING](CONTRIBUTING.md)

## Copyright

See [LICENSE](LICENSE)
