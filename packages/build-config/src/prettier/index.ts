import { Config, Options } from 'prettier'

export const options: Options = {
    bracketSameLine: true,
    proseWrap: 'never',
    quoteProps: 'consistent',
    semi: false,
    singleQuote: true,
    tabWidth: 4,
}

export const prettierConfiguration = (_options?: Options): Config => {
    const defaultOptions = options
    const myoption =
        _options !== undefined
            ? { ...defaultOptions, ..._options }
            : defaultOptions

    return {
        ...myoption,
        plugins: ['prettier-plugin-jsdoc', 'prettier-plugin-sh'],
    }
}
/* * @hidden * */
export const config: Config = prettierConfiguration()

/* * @hidden * */
export const Prettier = {
    config,
    options,
}

/* * Export Types * */
export type {
    Config as PrettierConfig,
    Options as PrettierOptions,
} from 'prettier'
