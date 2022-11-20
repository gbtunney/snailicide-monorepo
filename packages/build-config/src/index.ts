/* * ESLINT * */
export { EsLint } from './eslint/index.js'
export type { EslintConfig } from './eslint/index.js'

/* * PRETTIER * */
export { Prettier } from './prettier/index.js'
export type { PrettierConfig, PrettierOptions } from './prettier/index.js'
//export default {}

export { Jest } from './jest/index.js'

/* * ESBUILD UTILITIES * */
export type { JSONExportConfig } from './esbuild/nodeutils.js'

/* * NODE  UTILITIES * todo:move */
export { nodeUtils } from './esbuild/nodeutils.js'

/* * VITE CONFIGS * */
export { vite } from './vite/index.js'

import deepmerge from 'deepmerge'
export const merge = deepmerge
