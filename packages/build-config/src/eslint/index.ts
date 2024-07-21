import type { Config } from 'typescript-eslint'
export type EslintConfig = Config
import flatEslintConfig from './baseFlat.js'

/* * ESLint Namespace * */
export const EsLint: {
    config: typeof flatEslintConfig,
    flatConfig: typeof flatEslintConfig
} = {
    config: flatEslintConfig,
    flatConfig: flatEslintConfig,
}
export default EsLint
