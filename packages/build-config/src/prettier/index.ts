/**
 * Prettier Configuration
 *
 * @see [Prettier - Opinionated Code Formatter](https://prettier.io/)
 */
import { Config, Options } from 'prettier'
import * as JsdocPlugin from 'prettier-plugin-jsdoc'
import { merge as deepmerge } from 'ts-deepmerge'
import type { IterableElement, Merge } from 'type-fest'

const PRETTIER_WIDTH_BASE: PrettierConfig['tabWidth'] = 100

const PRETTIER_WIDTH_SCALE = {
    code: 0.8,
    comments: 1.2,
    markdown: 0.8,
} as const

// @ts-expect-error: "idk this is annoying"
export type JsDocOptions = (typeof JsdocPlugin)['Options']

export type PrettierOptions = Merge<Options, JsDocOptions> //dont have shell options

export type PrettierOverrides = Array<
    Merge<IterableElement<Config['overrides']>, { options: PrettierOptions }>
>

export type PrettierConfig = Merge<
    Merge<Config, PrettierOptions>,
    {
        overrides: PrettierOverrides
    }
>

export const SHARED_FORMATTING_RULES: Merge<
    PrettierOptions,
    {
        maxEmptyLines: number
        markdownTabWidth: PrettierConfig['tabWidth']
    }
> = {
    markdownTabWidth: 2,
    maxEmptyLines: 1,
    tabWidth: 4, //todo: use in "no-multiple-empty-lines" //MD012/no-multiple-blanks
} as const

export const getScaledWidth = (
    scaleKey: keyof typeof PRETTIER_WIDTH_SCALE,
    baseWidth: number = PRETTIER_WIDTH_BASE,
    scaleMap: typeof PRETTIER_WIDTH_SCALE = PRETTIER_WIDTH_SCALE,
): number => {
    return Math.floor(scaleMap[scaleKey] * baseWidth)
}

const getDefaultOptions = (): PrettierOptions => {
    return {
        bracketSameLine: true,

        /** JS Doc */
        jsdocPrintWidth: getScaledWidth('comments'),
        printWidth: getScaledWidth('code'),
        proseWrap: 'never',
        quoteProps: 'consistent',
        semi: false,

        singleQuote: true,
        tabWidth: SHARED_FORMATTING_RULES.tabWidth,
    } as const
}

const defaultOverrides: PrettierOverrides = [
    /** Override for markdown files only */
    {
        files: '**/*.md',
        options: {
            printWidth: getScaledWidth('markdown'),
            proseWrap: 'always',
            tabWidth: SHARED_FORMATTING_RULES.markdownTabWidth,
        },
    },
]

export const prettierConfiguration = (
    _options?: PrettierOptions,
    _overrides?: PrettierOverrides,
): PrettierConfig => {
    const myoption: PrettierOptions =
        _options !== undefined
            ? { ...getDefaultOptions(), ..._options }
            : getDefaultOptions()

    const overrides: PrettierOverrides =
        _overrides !== undefined
            ? (deepmerge(defaultOverrides, _overrides) as PrettierOverrides)
            : defaultOverrides
    return {
        ...myoption,
        ...(overrides !== undefined ? { overrides } : {}),
        plugins: [
            '@prettier/plugin-xml',
            '@prettier/plugin-php',
            'prettier-plugin-jsdoc',
            'prettier-plugin-sh',
            'prettier-plugin-packagejson',
            'prettier-plugin-tailwindcss',
        ],
    }
}

/** @ignore */
export const Prettier: {
    config: PrettierConfig
    options: PrettierOptions
    configuration: typeof prettierConfiguration
} = {
    config: prettierConfiguration(),
    configuration: prettierConfiguration,
    options: getDefaultOptions(),
}
