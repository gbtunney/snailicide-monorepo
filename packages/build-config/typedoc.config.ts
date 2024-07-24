import { TypeDocOptions } from 'typedoc'
import { PluginOptions } from 'typedoc-plugin-markdown'

const options: Partial<TypeDocOptions> & Partial<PluginOptions> = {
    entryPoints: ['./src/**/index.ts'],
    enumMembersFormat: 'table',
    exclude: ['./src/index.ts', '**/*.test.ts', '/node_modules/**/*'],
    excludeExternals: true,
    expandObjects: true,
    indexFormat: 'table',
    mergeReadme: true,
    out: './docs',
    // "textContentMappings": {
    //"breadcrumbs.home": "Home"
    // },
    outputFileStrategy: 'members',
    parametersFormat: 'table',
    plugin: ['typedoc-plugin-markdown'],
    propertiesFormat: 'table',
    readme: './README.md',
    tsconfig: './src/',
    typeDeclarationFormat: 'table',
    useCodeBlocks: true,
}
export default options
