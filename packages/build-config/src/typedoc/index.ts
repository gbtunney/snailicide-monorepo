/**
 * Typedoc Configuration
 *
 * @see [Typedoc - Documentation Generator for TypeScript Projects](https://typedoc.org/)
 */
import type { PluginOptions as MarkdownPluginOptions } from 'typedoc-plugin-markdown'

import { configMarkdown, configVitepress } from './markdown.js'
import { TypedocConfigFunction } from './shared.js'
import { config, materialTheme, MaterialThemeOptions } from './standard.js'

type MaterialThemeConfig = TypedocConfigFunction<MaterialThemeOptions>;
type MarkdownConfig = TypedocConfigFunction<MarkdownPluginOptions>;

export type Typedoc = {
    config: TypedocConfigFunction;
    materialTheme: MaterialThemeConfig;
    configMaterialTheme: MaterialThemeConfig;
    configMarkdown: MarkdownConfig;
    configVitepressTheme: MarkdownConfig;
};

/** @ignore */
export const typedoc: Typedoc = {
    config,
    configMarkdown,
    configMaterialTheme: materialTheme,
    configVitepressTheme: configVitepress,
    materialTheme,
    //  plugin:{load} //todo: triggers error
}
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
