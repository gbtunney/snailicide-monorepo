/**
 * @namespace Commitlint configuration for use in Monorepo.
 * @see [commitlint - Lint commit messages](https://commitlint.js.org/#/)
 * @see [commitlint-config-conventional - Shareable commitlint config](https://www.npmjs.com/package/@commitlint/config-conventional)
 * @see [Commitizen](https://commitizen-tools.github.io/commitizen/)
 */
export * as commitlint from './commitlint/index.js'
export type * from './commitlint/index.js'

/**
 * @namespace Eslint / Tslint Configuration
 * @see [eslint - Find and fix problems in your JavaScript code.](https://eslint.org/)
 * @see [typescript-eslint](https://typescript-eslint.io/getting-started/)
 */
export * as EsLint from './eslint/index.js'
export type * from './eslint/index.js'

/**
 * @namespace Collection of Generic NPM Package Utility Schemas and Typeguards
 * @see [NPM - Node Package Manager](https://www.npmjs.com/)
 */
export * as npm from './npm/index.js'
export type * from './npm/index.js'

/**
 * @namespace Prettier Configuration
 * @see [Prettier - Opinionated Code Formatter](https://prettier.io/)
 */
export * as Prettier from './prettier/index.js'
export type { PrettierConfig, PrettierOptions } from './prettier/index.js'

/**
 * @namespace Rollup Configuration, Plugins, and helper functions
 * @see [Rollup - The JavaScript module bundler](https://rollupjs.org/guide/en/)
 */
export * as rollup from './rollup/index.js'
export type * from './rollup/index.js'

/**
 * @namespace Typedoc Configuration
 * @see [Typedoc - Documentation Generator for TypeScript Projects](https://typedoc.org/)
 */
export { typedoc } from './typedoc/index.js'
export type * from './typedoc/index.js'

/* *  UTILITIES *  */
export { exportJSON, isPlainObject, safeDeserializeJSON } from './utilities.js'
export type * from './utilities.js'

/**
 * @namespace Vite Configuration ( only docserver for now )
 * @see [Vite - Next Generation Frontend Tooling](https://vitejs.dev/)
 */
export * as vite from './vite/index.js'
export type * from './vite/index.js'

/**
 * @namespace Vitest Configuration
 * @see [Vitest - A modern testing library for Vue 3](https://vitest.dev/)
 */
export * as vitest from './vitest/index.js'
export type * from './vitest/index.js'

export { merge } from 'ts-deepmerge'
