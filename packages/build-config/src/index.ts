export { isNPMPackage } from './npm.package/index.js'

/* * PACKAGE UTILITIES * */
export type { PackageUtils, Buildable, Lintable } from './npm.package/index.js'

/* * ESBUILD UTILITIES * */
export type {
    JSONExportConfig,
    BuildConfig,
    EntryConfig,
} from './esbuild/index.js'

/* * NODE  UTILITIES * todo:move */
export { nodeUtils } from './esbuild/index.js'

/* * ESLINT * */
export { EsLint } from './eslint/index.js'
export type { EslintConfig } from './eslint/index.js'

/* * PRETTIER * */
export { Prettier } from './prettier/index.js'
export type { PrettierConfig, PrettierOptions } from './prettier/index.js'
//export default {}

export { Jest } from './jest/index.js'
