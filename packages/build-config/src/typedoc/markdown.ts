import { ReflectionKind, TypeDocOptions } from 'typedoc'
import { PluginOptions } from 'typedoc-plugin-markdown'

import fs from 'fs'
import * as path from 'path'

export type RemarkPluginOptions = {
    /** An array of remark plugin names. */
    remarkPlugins?: unknown //|Record<string, unknown>;
    /** Custom options for the remark-stringify plugin. */
    remarkStringifyOptions?: unknown
}

export const SORT_ORDER: Array<ReflectionKind.KindString> = [
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
export type TypedocMarkdownConfig = Partial<TypeDocOptions> &
    Partial<PluginOptions> &
    RemarkPluginOptions

/** Typedoc-plugin-markdown is required */
export const configMarkdown = (
    __dirname: string,
): undefined | TypedocMarkdownConfig => {
    const resolvedDirname = path.resolve(__dirname)
    if (!fs.existsSync(resolvedDirname)) {
        console.error('The directory ', resolvedDirname, ' does not exist.')
    } else {
        /* eslint sort/object-properties:off */
        const options: TypedocMarkdownConfig = {
            /** This uses a "module" format, using the index of each subfolder */
            entryPoints: [path.resolve(`${resolvedDirname}/src/index.ts`)],
            tsconfig: path.resolve(`${resolvedDirname}/src/`),
            readme: path.resolve(`${resolvedDirname}/README.md`),
            out: path.resolve(`${resolvedDirname}/docs`),
            exclude: [
                '**/*.test.ts',
                'node_modules/**/*',
                '**/node_modules/**/*',
            ],
            /** Exclusions */
            excludeExternals: false,
            excludeInternal: true,
            excludeReferences: false,
            gitRevision: 'master',

            /** Sort order */
            kindSortOrder: SORT_ORDER,
            groupOrder: SORT_ORDER,
            sort: ['kind', 'source-order'],

            /** Typedoc-plugin-markdown formats */
            enumMembersFormat: 'table',
            parametersFormat: 'table',
            propertiesFormat: 'table',
            typeDeclarationFormat: 'table',
            indexFormat: 'table',

            expandObjects: true,
            mergeReadme: true,
            outputFileStrategy: 'modules',
            useCodeBlocks: true,
            sanitizeComments: true,
            includeVersion: true,

            /** Typedoc Plugins */
            plugin: [
                'typedoc-plugin-markdown',
                'typedoc-plugin-zod',
                'typedoc-plugin-remark',
            ],
            // "theme": "custom-markdown-theme",
            /** Remark Plugins */
            remarkPlugins: [
                'unified-prettier',
                ['remark-toc', { maxDepth: 3 }],
            ],
        }
        return options
    }
    return undefined
}
export default configMarkdown
