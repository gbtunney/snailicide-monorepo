# @snailicide/g-library@0.2.1

## 1.2.3

### Patch Changes

- df43ef7: BREAKING (build-config)
  - Markdown linting is enforced in CI and pre-commit.
  - Prefer named exports; default exports will fail lint.
  - Tightened @typescript-eslint and JSDoc rules:
    - no-deprecated
    - no-unnecessary-type-conversion
    - no-unsafe-argument
    - jsdoc/no-undefined-types
  - Logger Scripts

  Migration
  - Replace ZodSchema with z.ZodType (or z.ZodTypeAny).
  - Remove string.toString() and BigInt(bigint) patterns.
  - Replace default exports with named exports.
  - When constructing entries/tuples, use readonly [K, V] typing or a typed
    entries helper.

  @g-library (patch)
  - Clean up numeric transforms (remove needless conversions, fix JSDoc). No
    runtime behavior change.

  @snailicide/cli-app (patch)
  - Align to new lint + markdownlint setup.

## 1.2.2

### Patch Changes

- d16db7d: testing release workflow

## 1.2.1

### Patch Changes

- ce1e3cf: updated dependencies

## 1.2.0

### Minor Changes

- 964e865: - g-library added minimatch
  - reworked cli-app
  - build-config fixed eslint rules

## 1.1.0

### Minor Changes

- 2dc7185: - fix(cli-app): fixed bug with default aliases
  - feat(g-library): added branded ip address and url validator functions and
    reorganized
  - feat(g-library): new branded / tagged json stuff

## 1.0.1

### Patch Changes

- 1e1828c: - complete refactor of @snailicide/cli-app
  - updated dependencies
  - add documentation

## 1.0.0

### Major Changes

- 7ec0345: - added typeChecked eslint rules like: naming conventions, better
  sorting
  - fixed wildcard export error in g-library, made compliant with eslint rules

## 0.4.7

### Patch Changes

- b952b6f: - updated tsconfig base properties
  - added eslint import-extensions
  - updated dependencies

## 0.4.6

### Patch Changes

- bef28f2: fixed the missing files :(

## 0.4.5

### Patch Changes

- 8c088b2: - fixed cli-app compilation, updated dependencies
  - added g-library documentation
  - g-library new zod schemas and formatters

## 0.4.4

### Patch Changes

- tried to fix the default imports

## 0.4.3

### Patch Changes

- fixed package exports

## 0.4.2

### Patch Changes

- added date section, fixed rollup script

## 0.4.1

### Patch Changes

- fixed bug with recursive stringUtils

## 0.4.0

### Minor Changes

- - fixed missing .mjs index file
  - tried to fix bundling issue ( probably unsucessful)
  - added moment date functions
  - added json deserializing functions
  - seperated node functions from main

## 0.3.0

### Minor Changes

- fixed bundling (hopefully)
- added new color functions

## 0.2.2

### Patch Changes

- fixed dependencies and rollup issues. Added missing vite config file for the
  document viewer.

## 0.2.1

### Patch Changes

- new custom schemas in zod module,added more functions in node module for file
  handling.

## 0.2.0

### Minor Changes

- added new functions for file arrays, yargs and base64 encoding

## 0.1.3

### Patch Changes

- added new zod functions and validators

## 0.1.2

### Patch Changes

- initial release for g-shopify-library with fixes for g-library

## 0.1.1

### Patch Changes

- bumping to fix npm publishing issue

## 0.1.0

### Minor Changes

- added npm package validator function with NPMPackage type namespace

## 0.0.5

### Patch Changes

- fixed bug in package file

## 0.0.4

### Patch Changes

- added docs to package

## 0.0.3

### Patch Changes

- Added changelog to NPM publish files

## 0.0.2

### Patch Changes

- Initial release of g-Library
