**@snailicide/build-config** • **Docs**

---

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

### Snailicide Build Config Package

_Provides repository with base configurations that can be extended in new packages._

**NPM Homepage**: [@snailicide/build-config](https://www.npmjs.com/package/@snailicide/build-config)

-   **Configuration Files**

    -   **Typescript**: [tsconfig-base.json](_media/tsconfig-base.json)
    -   **ESLint Base**: [.eslintrc.ts](./.eslintrc.ts)
    -   **Prettier**: [prettier.config.js](./prettier.config.js)

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

### Prettier

```json5
/* include in package.json */
{
    prettier: '@snailicide/build-config/prettier',
}
```

**_OR_**

```js
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

## Helpful Links

-   Linting
    -   [Find and fix problems in your JavaScript code - ESLint - Pluggable JavaScript Linter](https://eslint.org/)
    -   [Getting Started | typescript-eslint](https://typescript-eslint.io/getting-started/)
    -   [Linting with Type Information | typescript-eslint](https://typescript-eslint.io/getting-started/typed-linting)
    -   [How to quickly configure ESLint for import sorting | Medium](https://medium.com/@diballesteros/how-to-quickly-configure-eslint-for-import-sorting-3a4017bd4853)
    -   [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)

> Note: to transpile to (var and no arrow functions use target = ES5

## TODO:

[ ] Implement [Linting with Type Information](https://typescript-eslint.io/getting-started/typed-linting) [ ] naming conventions for exported functions [ ] enforce explicit return types

## Modules

| Module | Description |
| --- | --- |
| [commitlint](commitlint.md) | - |
| [eslint](eslint.md) | Eslint Flat Configuration |
| [index](index.md) | - |
| [npm](npm.md) | Collection of Generic Package Utility Schemas and Typeguards |
| [prettier](prettier.md) | Prettier Configuration |
| [rollup](rollup.md) | Rollup Configuration tools and utilities |
| [tsconfig](tsconfig.md) | - |
| [typedoc](typedoc.md) | Typedoc default configurations |
| [vite](vite.md) | - |
| [vitest](vitest.md) | Vitest config |
