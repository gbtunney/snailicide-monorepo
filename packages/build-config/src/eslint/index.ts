import merge from 'deepmerge'
import { baseOptions } from './base.js'
import { typeScriptOptions } from './typescript.js'

/* * Types * */
import type { Linter } from 'eslint'
export type EslintConfig = Linter.BaseConfig

const eslintConfigMerged: EslintConfig = merge(typeScriptOptions, baseOptions)
const config: EslintConfig = baseOptions

/* * ESLint Namespace * */
export const EsLint = {
    typeScriptOptions,
    baseOptions,
    eslintConfigMerged,
    config,
}
export default EsLint
