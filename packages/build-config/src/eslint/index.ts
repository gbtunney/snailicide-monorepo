/* * Types * */
import type { Linter } from 'eslint'

import flatEslintConfig from './baseFlat.js'
import { typeScriptOptions } from './typescript-extends-config.js'

export type EslintConfig = Linter.BaseConfig

/* * ESLint Namespace * */
export const EsLint: {
    typeScriptOptions: Linter.BaseConfig
    flatConfig: typeof flatEslintConfig
} = {
    typeScriptOptions,
    flatConfig: flatEslintConfig,
}
export default EsLint
