---
sidebar_position: 7
---

# Error Handling

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

`DrUtilsError` extends `Error`, so existing `instanceof Error` checks still work.

## Error codes

| Code | Thrown by |
|---|---|
| `INVALID_CEDULA` | `parseCedula`, `formatCedula`, `maskCedula` |
| `INVALID_RNC` | `parseRNC`, `formatRNC`, `maskRNC` |
| `INVALID_NCF` | `parseNCF`, `formatNCF` |
| `INVALID_PHONE` | `parsePhoneNumber`, `formatPhoneNumber`, `maskPhoneNumber` |
| `INVALID_PLATE` | `parsePlate`, `formatPlate` |
| `FORMAT_CEDULA_FAILED` | `formatCedula` |
| `FORMAT_RNC_FAILED` | `formatRNC` |
| `FORMAT_NCF_FAILED` | `formatNCF` |
| `FORMAT_PHONE_FAILED` | `formatPhoneNumber` |
| `FORMAT_PLATE_FAILED` | `formatPlate` |
| `ITBIS_NEGATIVE` | `applyItbis`, `removeItbis`, `splitItbis` |
| `AMOUNT_TO_WORDS_OUT_OF_RANGE` | `amountToWords` |

## Using safe parsers to avoid throws

If you prefer not to use try/catch, use the [safe parser](./parsers.md#safe-parsers) variants which return `{ ok: true, value } | { ok: false, error }`.
