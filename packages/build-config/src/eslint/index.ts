export type EslintConfig = Config

import type { Config } from 'typescript-eslint'
import config from './base.js'
/* * ESLint Namespace * */
export const EsLint: {
    config: typeof config
    flatConfig: typeof config
} = {
    config,
    flatConfig: config,
}
export default EsLint
