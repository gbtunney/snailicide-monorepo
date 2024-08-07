/* *     COMMITLINT CONFIG and COMMITIZEN * */
export { commitlint } from './commitlint/index.js'
/* * ESLINT * */
export { EsLint } from './eslint/index.js'

export type { EslintConfig } from './eslint/index.js'
/* * NPM UTILITIES * */
export { npm } from './npm/index.js'

export type { BasePackage, PackageJson, PackageJsonInput } from './npm/index.js'
/* * PRETTIER * */
export { Prettier } from './prettier/index.js'

export type { PrettierConfig, PrettierOptions } from './prettier/index.js'
/* * ROLLUP * */
export { rollup } from './rollup/index.js'

export type {
    ConfigOptions,
    EntryConfig,
    ExportType,
    PluginKey,
} from './rollup/index.js'

/** TYPEDOC */
export { typedoc } from './typedoc/index.js'
export type {
    MaterialThemeOptions,
    TypedocConfig,
    TypedocMarkdownConfig,
} from './typedoc/index.js'

/* *  UTILITIES *  */
export { exportJSON, isPlainObject, safeDeserializeJSON } from './utilities.js'

/* * VITE CONFIGS * */
export { vite } from './vite/index.js'

/* * VITEST CONFIG * */
export { vitest } from './vitest/index.js'

export { merge } from 'ts-deepmerge'
