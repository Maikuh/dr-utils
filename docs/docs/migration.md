---
sidebar_position: 8
---

# Migrating from v2 to v3

## Breaking changes

### 1. `dr-utils/utils` is removed

The `dr-utils/utils` sub-path no longer exists. Its contents are split across new sub-paths:
- `dr-utils/parsers`
- `dr-utils/helpers` (new)

If you imported from the root (`dr-utils`) nothing changes — root re-exports everything.

```ts
// v2
import { parseCedula, getMunicipiosByProvincia } from 'dr-utils/utils'

// v3
import { parseCedula } from 'dr-utils/parsers'
import { getMunicipiosByProvincia } from 'dr-utils/helpers'

// or, unchanged:
import { parseCedula, getMunicipiosByProvincia } from 'dr-utils'
```

### 2. `formatCedula` and `formatRNC` options changed

The second argument changed from a `FormatStyle` string to a `FormatOptions` object.

```ts
// v2
formatCedula('40220579912', 'without-dashes') // '40220579912'
formatRNC('130500292', 'with-dashes')         // '130-50029-2'

// v3
formatCedula('40220579912', { dashes: false }) // '40220579912'
formatRNC('130500292', { dashes: true })       // '130-50029-2'
```

The default behavior (dashes on) is unchanged, so calls without a second argument require no update.

### 3. Throwing functions now raise `DrUtilsError` instead of `Error`

All functions that throw (`parseCedula`, `formatCedula`, `maskCedula`, etc.) now throw a `DrUtilsError` instance. `DrUtilsError` extends `Error`, so existing `instanceof Error` checks still work. The new `.code` property enables structured error handling.

```ts
// v2 — generic Error
try {
  parseCedula('bad')
} catch (e) {
  console.error((e as Error).message)
}

// v3 — DrUtilsError with .code
import { DrUtilsError } from 'dr-utils/errors'

try {
  parseCedula('bad')
} catch (e) {
  if (e instanceof DrUtilsError) {
    console.error(e.code)    // 'INVALID_CEDULA'
    console.error(e.message) // '"bad" is not a valid cedula.'
  }
}
```

---

## New in v3

The following were added in v3 and have no v2 equivalent.

### New validators
- `validatePlate(plate)` — Dominican license plate validation

### New formatters
- `formatNCF(ncf)` — formats a physical or electronic NCF as `B01-83920391`
- `formatPlate(plate)` — normalizes a plate to uppercase
- `formatDOP(value, options?)` — formats a number as Dominican Pesos (`RD$1,234.50`)

### New parsers
- `parseCedula`, `parseRNC`, `parseNCF`, `parsePhoneNumber`, `parsePlate` — were in `dr-utils/utils` in v2, now in `dr-utils/parsers`
- `normalizePhoneNumber` — strips formatting and returns a 10-digit string
- `safeParseCedula`, `safeParseRNC`, `safeParseNCF`, `safeParsePhoneNumber`, `safeParsePlate` — non-throwing variants returning `Result<T>`

### New masks
- `maskCedula`, `maskRNC`, `maskPhoneNumber` — redact sensitive digits

### New helpers
- `amountToWords(value, options?)` — number to Spanish words (`'mil doscientos treinta y cuatro pesos con 56 centavos'`)
- `applyItbis(subtotal, rate?)` — adds ITBIS to a net amount
- `removeItbis(total, rate?)` — extracts net from a gross total
- `splitItbis(total, rate?)` — splits a gross total into `{ net, tax, total }`

### New error type
- `DrUtilsError` (from `dr-utils/errors`) — typed error with `.code: DrUtilsErrorCode`

### Dual CJS/ESM build output

The package now ships both CommonJS (`.js`) and ESM (`.mjs`) formats. Bundlers and runtimes resolve the correct format automatically via the `exports` map — no changes needed on your end.
