import { Config, Options } from 'prettier'

import { codeStyleOptions } from './code.style.js'

const options: Options = codeStyleOptions

const config: Config = {
    ...options,
    plugins: ['prettier-plugin-jsdoc', 'prettier-plugin-sh'],
}

/* * Prettier Namespace * */
export const Prettier = {
    options,
    config,
}
/* * Export Types * */
export type PrettierOptions = Config
export type PrettierConfig = Config

export default Prettier
