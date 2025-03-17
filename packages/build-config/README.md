# @snailicide/build-config 🐌

[![NPM](https://img.shields.io/npm/v/@snailicide/build-config)](http://www.npmjs.com/package/@snailicide/build-config)
![License: MIT](https://img.shields.io/npm/l/@snailicide/build-config)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

_Provides repository with base configurations that can be extended in new
packages._

---

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![RollupJS](https://img.shields.io/badge/RollupJS-ef3335?style=for-the-badge&logo=rollup.js&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Vitest](https://img.shields.io/badge/vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)

### Repository

- **Github:**
  [`@snailicide/build-config`](https://github.com/gbtunney/snailicide-monorepo/tree/main/packages/build-config)
  • [`snailicide-monorepo`](https://github.com/gbtunney/snailicide-monorepo.git)
- **CDN**:
  [jsdeliver](https://cdn.jsdelivr.net/npm/@snailicide/build-config/dist/index.min.js)
- **Documentation**:
  [@snailicide/build-config docs](http://gilliantunney.com/docs/build-config/)

### Author

👤 **Gillian Tunney**

- [github](https://github.com/gbtunney)
- [email](mailto:gbtunney@mac.com)

> Recommended package manager is [pnpm](http://pnpm.io)
>
> [![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)](http://pnpm.io)

## @snailicide/build-config 🐌

---

This package provides reusable configuration files for commonly used tooling. It
aims to define,extend, and manage build settings , ensuring consistency across
different environments, projects and packages.

### `@snailicide/build-config` _contains configurations for:_

#### Build Tooling

- [**commitlint**](https://commitlint.js.org/#/) • _Lint commit messages_
- [**@commitlint/config-conventional**](https://www.npmjs.com/package/@commitlint/config-conventional)
  • _Shareable commitlint configuration_
- [**commitizen**](https://commitizen-tools.github.io/commitizen/) •
  _Command-line utility to create commits with your rules._
- [**eslint**](https://eslint.org/) • _Find and fix problems in your JavaScript
  code._
- [**typescript-eslint**](https://typescript-eslint.io/getting-started/) •
  _Tooling that enables ESLint and Prettier to support TypeScript._
- [**npm**](https://www.npmjs.com/) • _Node package manager_
- [**prettier**](https://prettier.io/) • _Opinionated code formatter_
- [**rollup**](https://rollupjs.org/guide/en/) • _The JavaScript module bundler_
- [**typedoc**](https://typedoc.org/) • _Documentation generator for TypeScript
  projects_
- [**typedoc-plugin-markdown**](https://typedoc-plugin-markdown.org/) •
  _Generate TypeScript documentation as markdown_
- [**vite**](https://vitejs.dev/) • _Next generation frontend tooling_
- [**vitest**](https://vitest.dev/) • _A Vite-native testing framework_
- [**vitepress**](https://vitepress.dev/) • _Vite & Vue powered static site
  generator_

#### Eslint Plugins

- [**typescript-eslint**](https://typescript-eslint.io/packages/typescript-eslint/)
  • _Provides linting rules for TypeScript code._
- [**eslint-comments**](https://www.npmjs.com/package/eslint-plugin-eslint-comments)
  • _Enforces best practices for ESLint directive comments._
- [**filenames-simple**](https://www.npmjs.com/package/eslint-plugin-filenames-simple)
  • _Ensures consistent and simple file naming conventions._
- [**import**](https://www.npmjs.com/package/eslint-plugin-import) • _Supports
  linting of ES2015+ import/export syntax, and prevent issues with misspelling
  of file paths and import names._
- [**jsdoc**](https://www.npmjs.com/package/eslint-plugin-jsdoc) • _Enforces
  JSDoc comments and validates their syntax._
- [**sort**](https://www.npmjs.com/package/eslint-plugin-sort) • _Provides rules
  for sorting various code elements, including: exports, object properties,
  TypeScript type properties, and string unions._
- [**unused-imports**](https://www.npmjs.com/package/eslint-plugin-unused-imports)
  • _Identifies and removes unused imports in your code._
- [**vitest**](https://www.npmjs.com/package/eslint-plugin-vitest) • _Contains
  linting rules for Vitest, a Vite-native testing framework._

#### Rollup Plugins

- [**rollup-plugin-ts**](https://www.npmjs.com/package/rollup-plugin-ts) •
  _Allows Rollup to bundle declarations, and respects Browserslists, and enables
  integration with transpilers_
- [**@rollup/plugin-json**](https://www.npmjs.com/package/@rollup/plugin-json) •
  _Allows Rollup to import JSON files, converting them to ES6 modules._
- [**@rollup/plugin-commonjs**](https://www.npmjs.com/package/@rollup/plugin-commonjs)
  • _Converts CommonJS modules to ES6, so they can be included in a Rollup
  bundle._
- [**@rollup/plugin-node-resolve**](https://www.npmjs.com/package/@rollup/plugin-node-resolve)
  • _Locates and bundles third-party dependencies in `node_modules`._
- [**rollup-plugin-node-externals**](https://www.npmjs.com/package/rollup-plugin-node-externals)
  • _Excludes Node.js built-in modules, dependencies & devDependencies from the
  bundle._
- [**rollup-plugin-polyfill-node**](https://www.npmjs.com/package/rollup-plugin-polyfill-node)
  • _Provides polyfills for Node.js core modules when bundling for the browser._
- [**@rollup/plugin-terser**](https://www.npmjs.com/package/@rollup/plugin-terser)
  • _Minifies the generated Rollup bundle using Terser._

## Installation

```sh
#pnpm
$ pnpm add @snailicide/build-config -D

#yarn
$ yarn add @snailicide/build-config -D

#npm
$ npm install @snailicide/build-config --development
```

## Examples

### Typescript

```json5
/* @file tsconfig.json */

{
  extends: '@snailicide/build-config/tsconfig-base',
  compilerOptions: {
    outDir: './../types',
    rootDir: '.',
    declarationDir: './../types',
  },
  exclude: ['**/*.test.ts'],
  include: ['**/*.ts', '**/*.cts', '**/*.mts'],
}
```

---

### Eslint

```ts
/* @file eslint.config.js */

import { EsLint } from '@snailicide/build-config'

const FLAT_CONFIG = await EsLint.flatConfig()

export default [
  ...FLAT_CONFIG,
  {
    ignores: ['packages/**/docs/**/*'],
  },
]
```

---

### Prettier

```json5
/* @file package.json (include prettier property) */
{
  prettier: '@snailicide/build-config/prettier',
}
```

**_OR_**

```ts
/** @file Prettier.config.cjs Extend the base configuration */
const { Prettier, merge } = require('@snailicide/build-config')
const options = {
  plugins: ['@shopify/prettier-plugin-liquid'],
  overrides: [
    {
      files: '*.liquid',
      options: {
        tabWidth: 2,
      },
    },
  ],
}
module.exports = merge(Prettier.config, options)
```

---

### Typedoc

```ts
/** @file Typedoc.config.ts Basic Typedoc Config using Material Theme */
import { typedoc } from '@snailicide/build-config'
import url from 'node:url'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const typeDocConfig = typedoc.configMaterialTheme(__dirname, {})

export default typeDocConfig
```

**_OR_**

```ts
/** @file Typedoc.config.ts Basic Typedoc Markdown Config */
import path from 'node:path'
import url from 'node:url'
import { typedoc } from './types/index.js'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

/** Custom properties to override */
const newTypeDocConfig = {
  githubPages: false,
  useCodeBlocks: true,
}
const typeDocConfig = {
  /** Markdown Configuration */
  ...typedoc.configMarkdown(__dirname, newTypeDocConfig),

  /** Entrypoint and excludes array is overwritten */
  entryPoints: [
    path.resolve(`${__dirname}/src/**/index.ts`),
    path.resolve(`${__dirname}/src/utilities.ts`),
  ],
  exclude: [path.resolve(`${__dirname}/src/index.ts`)],
}

export default typeDocConfig
```

## Helpful Links

- [Linting with Type Information | typescript-eslint](https://typescript-eslint.io/getting-started/typed-linting)
- [How to quickly configure ESLint for import sorting | Medium](https://medium.com/@diballesteros/how-to-quickly-configure-eslint-for-import-sorting-3a4017bd4853)
