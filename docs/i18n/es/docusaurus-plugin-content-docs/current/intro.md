---
sidebar_position: 1
---

# Primeros pasos

**dr-utils** es una librería de TypeScript sin dependencias para utilidades relevantes a la República Dominicana: validación, formateo, parseo, enmascaramiento, cálculos de ITBIS, formato de moneda, y más.

:::note
Hay cédulas/RNCs que dan falsos negativos (es decir, una cédula válida no pasa la validación) debido a que no coinciden con el algoritmo de Luhn. Es muy probable que el Gobierno dominicano / DGII haya comenzado a emitir cédulas con un algoritmo distinto o con excepciones desconocidas. El porcentaje de fallo calculado con la base de datos pública de RNCs es de aproximadamente un 0.01%.
:::

## Instalación

```bash
npm i dr-utils
yarn add dr-utils
pnpm add dr-utils
bun add dr-utils
```

## Rutas de importación

Cada módulo es tree-shakeable y está disponible como sub-ruta nombrada:

| Sub-ruta              | Contenido                                                                                                                            |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `dr-utils`            | Todo (re-exporta todo lo anterior)                                                                                                   |
| `dr-utils/validators` | `validateCedula`, `validateRNC`, `validateNCF`, `validatePhoneNumber`, `validatePlate`                                               |
| `dr-utils/formatters` | `formatCedula`, `formatRNC`, `formatNCF`, `formatPhoneNumber`, `formatPlate`, `formatDOP`, `format*Partial`                          |
| `dr-utils/parsers`    | `parseCedula`, `parseRNC`, `parseNCF`, `parsePhoneNumber`, `normalizePhoneNumber`, `parsePlate`, `safeParse*`                        |
| `dr-utils/masks`      | `maskCedula`, `maskRNC`, `maskPhoneNumber`                                                                                           |
| `dr-utils/schemas`    | `cedulaSchema`, `rncSchema`, `ncfSchema`, `phoneNumberSchema`, `plateSchema`, `provinciaSchema`, `municipioSchema`                   |
| `dr-utils/helpers`    | `getMunicipiosByProvincia`, `findProvincia`, `findMunicipio`, `amountToWords`, `applyItbis`, `calculateTSS`, `calculateNetSalary`, … |
| `dr-utils/constants`  | `Provincias`, `MunicipiosPorProvincia`, `ProvinciaISOCodes`, `ITBIS_RATE`, `TSS_RATES`, `ISR_SCALE_2026`, …                          |
| `dr-utils/types`      | `ParsedCedula`, `ParsedRNC`, `ParsedNCF`, `ParsedPhoneNumber`, `ParsedPlate`, `Result`, …                                            |
| `dr-utils/errors`     | `DrUtilsError`, `DrUtilsErrorCode`                                                                                                   |
