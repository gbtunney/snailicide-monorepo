/**
 * Typedoc Configuration
 *
 * @see [Typedoc - Documentation Generator for TypeScript Projects](https://typedoc.org/)
 */
import type { PluginOptions as MarkdownPluginOptions } from 'typedoc-plugin-markdown'

import { configMarkdown, configVitepress } from './markdown.js'
import { TypedocConfigFunction } from './shared.js'
import { config, materialTheme, MaterialThemeOptions } from './standard.js'

// ...existing code...
export type Typedoc = {
    config: TypedocConfigFunction
    materialTheme: TypedocConfigFunction<MaterialThemeOptions>
    configMaterialTheme: TypedocConfigFunction<MaterialThemeOptions>

    // Avoid TS2590: don't expose the full plugin option type here
    configMarkdown: TypedocConfigFunction<Record<string, unknown>>
    configVitepressTheme: TypedocConfigFunction<Record<string, unknown>>

    /* plugin: {  //todo: error.
         load: MarkdownPlugin
     }*/
}
// ...existing code...

/** @ignore */
export const typedoc = {
    config,
    configMarkdown,
    configMaterialTheme: materialTheme,
    configVitepressTheme: configVitepress,
    materialTheme,
    //  plugin:{load} //todo: triggers error
} as const
export {
    configMarkdown as typedocMarkdownConfig,
    configVitepress as typedocVitepressConfig,
} from './markdown.js'
export type { TypedocConfigFunction, TypedocOptions } from './shared.js'

export {
    config as typedocStandardConfig,
    materialTheme as typedocMaterialTheme,
} from './standard.js'
export type { MaterialThemeOptions, TypedocConfig } from './standard.js'
export type { PluginOptions as MarkdownPluginOptions } from 'typedoc-plugin-markdown'
