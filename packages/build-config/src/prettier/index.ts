import { codeStyleOptions } from './code.style.js'
import { Options, Config } from 'prettier'

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
