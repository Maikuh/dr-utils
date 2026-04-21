---
sidebar_position: 7
---

# Manejo de errores

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

`DrUtilsError` extiende `Error`, por lo que los checks `instanceof Error` existentes siguen funcionando.

## Códigos de error

| Código | Lanzado por |
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

## Usar safe parsers para evitar excepciones

Si prefieres no usar try/catch, usa las variantes [safe parser](./parsers.md#safe-parsers) que retornan `{ ok: true, value } | { ok: false, error }`.
