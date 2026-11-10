---
sidebar_position: 1
---

# Getting Started

**dr-utils** is a zero-dependency TypeScript library for utilities relevant to the Dominican Republic: validation, formatting, parsing, masking, ITBIS tax calculations, currency formatting, and more.

:::note
There are Cédulas/RNCs that give false negatives (a valid cédula fails validation) due to not matching the Luhn algorithm. The Dominican Government / DGII may have started issuing cédulas under a different algorithm or with unknown exceptions. The calculated failure rate using the public RNC database is approximately 0.01%.
:::

## Installation

```bash
npm i dr-utils
yarn add dr-utils
pnpm add dr-utils
bun add dr-utils
```

## Import Paths

Every module is tree-shakeable and available as a named sub-path:

| Sub-path              | Contents                                                                                                                             |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `dr-utils`            | Everything (re-exports all below)                                                                                                    |
| `dr-utils/validators` | `validateCedula`, `validateRNC`, `validateNCF`, `validatePhoneNumber`, `validatePlate`                                               |
| `dr-utils/formatters` | `formatCedula`, `formatRNC`, `formatNCF`, `formatPhoneNumber`, `formatPlate`, `formatDOP`, `format*Partial`                          |
| `dr-utils/parsers`    | `parseCedula`, `parseRNC`, `parseNCF`, `parsePhoneNumber`, `normalizePhoneNumber`, `parsePlate`, `safeParse*`                        |
| `dr-utils/masks`      | `maskCedula`, `maskRNC`, `maskPhoneNumber`                                                                                           |
| `dr-utils/schemas`    | `cedulaSchema`, `rncSchema`, `ncfSchema`, `phoneNumberSchema`, `plateSchema`, `provinciaSchema`, `municipioSchema`                   |
| `dr-utils/helpers`    | `getMunicipiosByProvincia`, `findProvincia`, `findMunicipio`, `amountToWords`, `applyItbis`, `calculateTSS`, `calculateNetSalary`, … |
| `dr-utils/constants`  | `Provincias`, `MunicipiosPorProvincia`, `ProvinciaISOCodes`, `ITBIS_RATE`, `TSS_RATES`, `ISR_SCALE_2026`, …                          |
| `dr-utils/types`      | `ParsedCedula`, `ParsedRNC`, `ParsedNCF`, `ParsedPhoneNumber`, `ParsedPlate`, `Result`, …                                            |
| `dr-utils/errors`     | `DrUtilsError`, `DrUtilsErrorCode`                                                                                                   |
