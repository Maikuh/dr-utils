# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun test                        # run all tests
bun test src/validators/cedula.validator.test.ts  # run a single test file
bun run build                   # type-check (excluding tests) + bundle with tsdown → lib/
bun run lint                    # biome lint --write
bun run biome                   # biome check --write (lint + format together)
bun run biome:ci                # biome ci (no auto-fix, used in CI)
bun run generate-rnc-cedulas    # regenerate RNC/cedula data (downloads from DGII)
bun run generate-provincias-municipios  # regenerate provinces/municipalities data
```

There is no separate `dev` or `watch` mode — run tests directly with `bun test`.

## Architecture

`dr-utils` is a zero-dependency TypeScript utility library published to npm. Source lives in `src/`, compiled output goes to `lib/` (gitignored, produced by `tsdown`).

**Module layout** — each subdirectory maps to a named package export:

| Source dir | Export path | Contents |
|---|---|---|
| `src/validators/` | `dr-utils/validators` | Luhn-based cedula, RNC, NCF regex, phone regex validators |
| `src/formatters/` | `dr-utils/formatters` | Cedula/RNC dash formatting, phone number formatting |
| `src/parsers/` | `dr-utils/parsers` | `parseCedula`, `parseRNC`, `parseNCF`, `parsePhoneNumber`, `parsePlate`, `safeParse*` |
| `src/masks/` | `dr-utils/masks` | `maskCedula`, `maskRNC`, `maskPhoneNumber` |
| `src/helpers/` | `dr-utils/helpers` | `getMunicipiosByProvincia`, `getProvinciaByMunicipio`, `amountToWords`, ITBIS calculations |
| `src/constants/` | `dr-utils/constants` | Province list, municipalities-by-province map, phone regex |
| `src/types/` | `dr-utils/types` | `FormatStyle`, `MunicipioByProvincia` types |
| `src/index.ts` | `dr-utils` (root) | Re-exports everything above |

**Validation note**: Cedula and RNC validation uses the Luhn (mod 10) algorithm. Approximately 0.01% of real cedulas issued by the Dominican government fail this check due to suspected changes in issuance — this is a known, accepted limitation documented in the README.

**Data generation**: `scripts/generate-rnc-cedulas.ts` and `scripts/generate-provincias-municipios.ts` download official DGII data and write it into `src/constants/`. Run these when upstream government data changes.

**Build**: `tsdown` bundles the library. `tsconfig.build.json` extends `tsconfig.json` but excludes test files so they don't end up in the published package.

**Linting/formatting**: Biome handles both. Config is in `biome.json`. The `preversion` and `prepublishOnly` hooks enforce lint before version bumps or publishing.
