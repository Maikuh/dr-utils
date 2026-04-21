---
sidebar_position: 8
---

# Migrando desde v2 a v3

## Cambios que rompen compatibilidad

### 1. `dr-utils/utils` ha sido eliminado

El sub-path `dr-utils/utils` ya no existe. Su contenido está dividido entre nuevos sub-paths:
- `dr-utils/parsers`
- `dr-utils/helpers` (nuevo)

Si importabas desde la raíz (`dr-utils`), nada cambia — la raíz re-exporta todo.

```ts
// v2
import { parseCedula, getMunicipiosByProvincia } from 'dr-utils/utils'

// v3
import { parseCedula } from 'dr-utils/parsers'
import { getMunicipiosByProvincia } from 'dr-utils/helpers'

// o, sin cambios:
import { parseCedula, getMunicipiosByProvincia } from 'dr-utils'
```

### 2. Las opciones de `formatCedula` y `formatRNC` cambiaron

El segundo argumento cambió de una cadena `FormatStyle` a un objeto `FormatOptions`.

```ts
// v2
formatCedula('40220579912', 'without-dashes') // '40220579912'
formatRNC('130500292', 'with-dashes')         // '130-50029-2'

// v3
formatCedula('40220579912', { dashes: false }) // '40220579912'
formatRNC('130500292', { dashes: true })       // '130-50029-2'
```

El comportamiento por defecto (con guiones) no cambia, por lo que las llamadas sin segundo argumento no requieren actualización.

### 3. Las funciones que lanzan excepciones ahora generan `DrUtilsError` en vez de `Error`

Todas las funciones que lanzan (`parseCedula`, `formatCedula`, `maskCedula`, etc.) ahora generan una instancia de `DrUtilsError`. `DrUtilsError` extiende `Error`, por lo que los checks `instanceof Error` existentes siguen funcionando. La nueva propiedad `.code` permite el manejo estructurado de errores.

```ts
// v2 — Error genérico
try {
  parseCedula('bad')
} catch (e) {
  console.error((e as Error).message)
}

// v3 — DrUtilsError con .code
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

## Nuevo en v3

Lo siguiente fue agregado en v3 y no tiene equivalente en v2.

### Nuevos validadores
- `validatePlate(plate)` — validación de placas dominicanas

### Nuevos formateadores
- `formatNCF(ncf)` — formatea un NCF físico o electrónico como `B01-83920391`
- `formatPlate(plate)` — normaliza una placa a mayúsculas
- `formatDOP(value, options?)` — formatea un número como Pesos Dominicanos (`RD$1,234.50`)

### Nuevos parsers
- `parseCedula`, `parseRNC`, `parseNCF`, `parsePhoneNumber`, `parsePlate` — estaban en `dr-utils/utils` en v2, ahora en `dr-utils/parsers`
- `normalizePhoneNumber` — elimina el formato y devuelve una cadena de 10 dígitos
- `safeParseCedula`, `safeParseRNC`, `safeParseNCF`, `safeParsePhoneNumber`, `safeParsePlate` — variantes que no lanzan excepciones, retornan `Result<T>`

### Nuevas máscaras
- `maskCedula`, `maskRNC`, `maskPhoneNumber` — ocultan dígitos sensibles

### Nuevos helpers
- `amountToWords(value, options?)` — número a palabras en español (`'mil doscientos treinta y cuatro pesos con 56 centavos'`)
- `applyItbis(subtotal, rate?)` — agrega ITBIS a un monto neto
- `removeItbis(total, rate?)` — extrae el neto de un total bruto
- `splitItbis(total, rate?)` — divide un total bruto en `{ net, tax, total }`

### Nuevo tipo de error
- `DrUtilsError` (desde `dr-utils/errors`) — error tipado con `.code: DrUtilsErrorCode`

### Salida de build dual CJS/ESM

El paquete ahora incluye tanto CommonJS (`.js`) como ESM (`.mjs`). Los bundlers y runtimes resuelven el formato correcto automáticamente mediante el mapa `exports` — no se requiere ningún cambio de tu parte.
