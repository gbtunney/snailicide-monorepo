/**
 * Prettier Configuration
 *
 * @see [Prettier - Opinionated Code Formatter](https://prettier.io/)
 */
import { Config, Options } from "prettier"
import JsdocPlugin from "prettier-plugin-jsdoc"
import { merge as deepmerge } from "ts-deepmerge"
import type { IterableElement, Merge } from "type-fest"
//import {JsdocOptions} from "prettier-plugin-jsdoc/dist/types";

// @ts-expect-error: "idk this is annoying"
export type JsDocOptions = (typeof JsdocPlugin)["Options"]

export type PrettierOptions = Merge<Options, JsDocOptions> //dont have shell options

export type PrettierOverrides = Array<
    Merge<IterableElement<Config["overrides"]>, { options: PrettierOptions }>
>

export type PrettierConfig = Merge<
    Merge<Config, PrettierOptions>,
    {
        overrides: PrettierOverrides
    }
>
export type AdditionalOptions = {
    maxEmptyLines: number
    markdownTabWidth: PrettierConfig["tabWidth"]
}

export const SHARED_FORMATTING_RULES: Merge<
    PrettierOptions,
    AdditionalOptions
> = {
    markdownTabWidth: 2,
    maxEmptyLines: 1,
    printWidth: 80,
    singleQuote: true,
    tabWidth: 4, //todo: use in "no-multiple-empty-lines" //MD012/no-multiple-blanks
} as const

export const DEFAULT_OPTIONS: PrettierOptions = {
    bracketSameLine: true,
    jsdocPrintWidth: SHARED_FORMATTING_RULES.printWidth,
    proseWrap: "never",
    quoteProps: "consistent",
    semi: false,
    tabWidth: SHARED_FORMATTING_RULES.tabWidth,
} as const

const defaultOverrides: PrettierOverrides = [
    /** Override for markdown files only */
    {
        files: "**/*.md",
        options: {
            printWidth: SHARED_FORMATTING_RULES.printWidth,
            proseWrap: "always",
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
            ? { ...DEFAULT_OPTIONS, ..._options }
            : DEFAULT_OPTIONS

    const overrides: PrettierOverrides =
        _overrides !== undefined
            ? (deepmerge(defaultOverrides, _overrides) as PrettierOverrides)
            : defaultOverrides
    return {
        ...myoption,
        ...(overrides !== undefined ? { overrides } : {}),
        plugins: ["prettier-plugin-jsdoc", "prettier-plugin-sh"],
    }
}

/* * @hidden * */
export const Prettier: {
    config: PrettierConfig
    options: PrettierOptions
    configuration: typeof prettierConfiguration
} = {
    config: prettierConfiguration(),
    configuration: prettierConfiguration,
    options: DEFAULT_OPTIONS,
}
