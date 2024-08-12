import { TypeDocOptions } from 'typedoc'
import { PluginOptions } from 'typedoc-plugin-markdown'
import fs from 'fs'
import * as path from 'path'

export type TypedocMarkdownConfig = Partial<TypeDocOptions> &
    Partial<PluginOptions>

/** Typedoc-plugin-markdown is required */
export const configMarkdown = (
    __dirname: string,
): undefined | TypedocMarkdownConfig => {
    const resolvedDirname = path.resolve(__dirname)
    if (!fs.existsSync(resolvedDirname)) {
        console.error('The directory ', resolvedDirname, ' does not exist.')
    } else {
        /* eslint sort/object-properties:off */
        const options: Partial<TypeDocOptions> & Partial<PluginOptions> = {
            /** This uses a "module" format, using the index of each subfolder */
            entryPoints: [path.resolve(`${resolvedDirname}/src/**/index.ts`)],
            tsconfig: path.resolve(`${resolvedDirname}/src/`),
            readme: path.resolve(`${resolvedDirname}/README.md`),
            out: path.resolve(`${resolvedDirname}/docs`),
            exclude: [
                '**/*.test.ts',
                'node_modules/**/*',
                '**/node_modules/**/*',
            ],
            excludeExternals: true,
            gitRevision: 'master',
            /** Typedoc-plugin-markdown options */
            enumMembersFormat: 'table',
            parametersFormat: 'table',
            propertiesFormat: 'table',
            typeDeclarationFormat: 'table',
            expandObjects: true,
            indexFormat: 'table',
            mergeReadme: true,
            outputFileStrategy: 'modules',
            plugin: ['typedoc-plugin-markdown', 'typedoc-plugin-zod'],
            useCodeBlocks: true,
        }
        return options
    }
    return undefined
}
export default configMarkdown
