# @snailicide/build-config

## 2.0.0

### Major Changes

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

## 1.4.4

### Patch Changes

- d16db7d: testing release workflow

## 1.4.3

### Patch Changes

- ce1e3cf: updated dependencies

## 1.4.2

### Patch Changes

- 50ef4ff: fixed bug with missing viitepress dependency

## 1.4.1

### Patch Changes

- fbf7e30: updated lint rules and formatting

## 1.4.0

### Minor Changes

- 964e865: - g-library added minimatch
  - reworked cli-app
  - build-config fixed eslint rules

## 1.3.0

### Minor Changes

- 2dc7185: - fix(cli-app): fixed bug with default aliases
  - feat(g-library): added branded ip address and url validator functions and
    reorganized
  - feat(g-library): new branded / tagged json stuff

## 1.2.1

### Patch Changes

- d587221: - refactored cli-app and added documentation
  - added parsePackage to cli-app
  - added commitlint module to build-config, fixed bug with typedoc module

## 1.2.0

### Minor Changes

- 1e1828c: - complete refactor of @snailicide/cli-app
  - updated dependencies
  - add documentation

## 1.1.0

### Minor Changes

- 7ec0345: - added typeChecked eslint rules like: naming conventions, better
  sorting
  - fixed wildcard export error in g-library, made compliant with eslint rules

## 1.0.0

### Major Changes

- b952b6f: - updated tsconfig base properties
  - added eslint import-extensions
  - updated dependencies

## 0.3.0

### Minor Changes

- eeb96be: eslint 9 upgrade

## 0.2.7

### Patch Changes

- Fixed bug with vite docserver in build-config (base key) Updated dependencies

## 0.2.6

### Patch Changes

- fixed large dependency issues

## 0.2.5

### Patch Changes

- fixed "tsconfig-base" link in package exports

## 0.2.4

### Patch Changes

- fixed bug in package file

## 0.2.3

### Patch Changes

- added docs to package

## 0.2.2

### Patch Changes

- Added changelog to NPM publish files

## 0.2.1

### Patch Changes

- added rollup instead of esbuild (so no cjs issues)

## 0.2.0

### Minor Changes

- Initial package release test
