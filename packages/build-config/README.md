# @snailicide/build-config 🐌

<p align="center">
	<img alt="Version" src="https://img.shields.io/npm/v/@snailicide/build-config"/>
	<a href="#" target="_blank">
		<img alt="License: MIT" src="https://img.shields.io/npm/l/@snailicide/build-config"/>
	</a>
	<a href="#" target="_blank">
		<img alt="Typescript" height="20px" src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
	</a>
</p>

_Provides repository with base configurations that can be extended in new packages._

### Repository

-   **Github:** [snailicide-monorepo](https://github.com/gbtunney/snailicide-monorepo.git)

-   **NPM Homepage**: [@snailicide/build-config](https://www.npmjs.com/package/@snailicide/build-config)

### Author

👤 **Gillian Tunney**

-   [github](https://github.com/gbtunney)
-   [email](mailto:gbtunney@mac.com)

> Important! Suggested package manager is [pnpm](https://pnpm.io)

## @snailicide/build-config 🐌

The `@snailicide/build-config` package provides reusable configuration files for commonly used tooling. It aims to define,extend, and manage build settings , ensuring consistency across different environments and projects

#### Build/Config Tools

-   [commitlint - Lint commit messages](https://commitlint.js.org/#/)
-   [commitlint-config-conventional - Shareable commitlint config](https://www.npmjs.com/package/@commitlint/config-conventional)
-   [Commitizen](https://commitizen-tools.github.io/commitizen/)
-   [eslint - Find and fix problems in your JavaScript code.](https://eslint.org/)
-   [typescript-eslint](https://typescript-eslint.io/getting-started/)
-   [NPM - Node Package Manager](https://www.npmjs.com/)
-   [Prettier - Opinionated Code Formatter](https://prettier.io/)
-   [Rollup - The JavaScript module bundler](https://rollupjs.org/guide/en/)
-   [Typedoc - Documentation Generator for TypeScript Projects](https://typedoc.org/)
-   [Typedoc-plugin-markdown](https://typedoc-plugin-markdown.org/)
-   [Vite - Next Generation Frontend Tooling](https://vitejs.dev/)
-   [Vitest - A modern testing library for Vue 3](https://vitest.dev/)

## Installation

```sh
#pnpm
pnpm add @snailicide/build-config -D

#yarn
yarn add @snailicide/build-config -D

#npm
npm install @snailicide/build-config --development
```

## Examples

### Typescript

```json5
/* tsconfig.json */

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

```js
/* eslint.config.js */

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
/* include in package.json */
{
    prettier: '@snailicide/build-config/prettier',
}
```

**_OR_**

```ts
/* prettier.config.cjs */

/* extend the base config */
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
//typedoc.config.ts

/** Basic Typedoc Config */
import url from 'node:url'
import path from 'path'
import { typedoc } from '@snailicide/build-config'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const typeDocConfig = typedoc.config(__dirname)

export default typeDocConfig
```

**_OR_**

```ts
//typedoc.config.ts

/** Typedoc Config with custom options added */
import url from 'node:url'
import path from 'path'
import { merge, typedoc, isPlainObject } from '@snailicide/build-config'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const _config = typedoc.configMarkdown(__dirname)

const typedocConfig = merge.withOptions(
    { mergeArrays: false },
    isPlainObject(_config) ? _config : {},
    {
        /**
         * Entrypoint array is overwritten by this value, use mergeArrays : true
         * to merge all arrays
         */
        entryPoints: [path.resolve(`${__dirname}/src/typedoc/markdown.ts`)],
    },
)

export default typedocConfig
```

## Helpful Links

-   [Linting with Type Information | typescript-eslint](https://typescript-eslint.io/getting-started/typed-linting)
-   [How to quickly configure ESLint for import sorting | Medium](https://medium.com/@diballesteros/how-to-quickly-configure-eslint-for-import-sorting-3a4017bd4853)
-   [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)

> Note: to transpile to (var and no arrow functions use target = ES5
