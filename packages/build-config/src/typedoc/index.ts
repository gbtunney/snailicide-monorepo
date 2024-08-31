/**
 * Typedoc default configurations
 *
 * @module typedoc
 */

import { configMarkdown, TypedocMarkdownConfig } from './markdown.js'
import {
    config,
    materialTheme,
    MaterialThemeOptions,
    TypedocConfig,
} from './standard.js'

export type Typedoc = {
    config: (__dirname: string) => TypedocConfig | undefined
    configMarkdown: (__dirname: string) => TypedocMarkdownConfig | undefined
    materialTheme: (
        __dirname: string,
    ) => (TypedocConfig & MaterialThemeOptions) | undefined
}

/** @ignore */
export const typedoc: Typedoc = {
    config,
    configMarkdown,
    materialTheme,
}

export type { TypedocMarkdownConfig } from './markdown.js'
export type { MaterialThemeOptions, TypedocConfig } from './standard.js'
export {
    config as typedocStandardConfig,
    materialTheme as typedocMaterialTheme,
} from './standard.js'
