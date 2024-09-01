import { merge as deepmerge } from 'ts-deepmerge'
import type { Merge } from 'type-fest'
import { ReflectionKind } from 'typedoc'
import { PluginOptions as MarkdownPluginOptions } from 'typedoc-plugin-markdown'

import {
    fileSharedOptions,
    TypedocConfigFunction,
    TypedocOptions,
} from './shared.js'
export type RemarkPluginOptions = {
    /** An array of remark plugin names. */

    /** |Record<string, unknown>; */
    remarkPlugins?: unknown

    /** Custom options for the remark-stringify plugin. */
    remarkStringifyOptions?: unknown
}
export type TypedocMarkdownOptions = TypedocOptions<
    Merge<MarkdownPluginOptions, RemarkPluginOptions>
>

const markdownBase = (): TypedocMarkdownOptions => {
    const options: TypedocMarkdownOptions = {
        categorizeByGroup: true,

        /** Typedoc-plugin-markdown formats */
        enumMembersFormat: 'table',

        /** Exclusions */
        excludeExternals: false,

        excludeInternal: true,
        excludeReferences: false,
        expandObjects: true,
        groupOrder: SORT_ORDER,
        includeVersion: true,
        indexFormat: 'table',

        /** Sort order */
        kindSortOrder: SORT_ORDER,
        mergeReadme: true,
        outputFileStrategy: 'members',

        parametersFormat: 'table',

        /** Typedoc Plugins */
        plugin: ['typedoc-plugin-markdown', 'typedoc-plugin-zod'],
        propertiesFormat: 'table',
        sanitizeComments: true,
        sort: ['kind', 'source-order'],
        typeDeclarationFormat: 'table',

        useCodeBlocks: true,
    }
    return options
}
const SORT_ORDER: Array<ReflectionKind.KindString> = [
    'Module',
    'Namespace',
    'Function',
    'Variable',
    'TypeAlias',
    'Enum',
    'EnumMember',
    'Parameter',
    'TypeParameter',
    'TypeLiteral',
    'IndexSignature',
    'Property',
    'Accessor',
    'Method',
    'Class',
    'Interface',
    'Constructor',
    'Reference',
    'Project',
    'CallSignature',
    'ConstructorSignature',
    'GetSignature',
    'SetSignature',
]
const enableRemarkPlugins = (
    prettier: boolean = true,
    toc: boolean = true,
    maxDepth: number = 3,
): TypedocMarkdownOptions => {
    return prettier || toc
        ? {
              plugin: ['typedoc-plugin-remark'],
              remarkPlugins: [
                  ...(prettier ? ['unified-prettier'] : []),
                  ...(toc ? [['remark-toc', { maxDepth }]] : []),
              ],
          }
        : {}
}

/** Typedoc-plugin-markdown is required */
export const configMarkdown: TypedocConfigFunction<
    Merge<MarkdownPluginOptions, RemarkPluginOptions>
> = (__dirname, _options) => {
    const _fileOptions = fileSharedOptions(__dirname)
    const options_to_merge: TypedocMarkdownOptions =
        _options !== undefined ? _options : {}

    if (_fileOptions !== undefined) {
        const options: TypedocMarkdownOptions = deepmerge(
            {
                ..._fileOptions,
                ...markdownBase(),
            },
            enableRemarkPlugins(true, true),
        ) as TypedocMarkdownOptions
        return deepmerge(options, options_to_merge) as TypedocMarkdownOptions
    }
    return undefined
}

export const configVitepress: TypedocConfigFunction<
    Merge<MarkdownPluginOptions, RemarkPluginOptions>
> = (__dirname, _options) => {
    const _fileOptions = fileSharedOptions(__dirname)
    const options_to_merge: TypedocMarkdownOptions =
        _options !== undefined ? _options : {}
    if (_fileOptions !== undefined) {
        const options: TypedocMarkdownOptions = deepmerge(
            {
                ..._fileOptions,
                ...markdownBase(),
                ...enableRemarkPlugins(false, false),
            },
            { plugin: ['typedoc-vitepress-theme'] },
        ) as TypedocMarkdownOptions
        return deepmerge(options, options_to_merge) as TypedocMarkdownOptions
    }

    return undefined
}
export default configMarkdown
