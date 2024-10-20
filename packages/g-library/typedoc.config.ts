import { merge, typedoc } from '@snailicide/build-config'
import { TypeDocOptions } from 'typedoc'
import url from 'node:url'
import path from 'path'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
//import { Options as OptionsVitepress }from 'typedoc-vitepress-theme'
const custom: Partial<TypeDocOptions> = {
    //  categorizeByGroup: true,
    entryPoints: [path.resolve(`${__dirname}/src/node.ts`)],
    excludeInternal: true,
    navigation: {
        includeCategories: true,
        includeFolders: false,
        includeGroups: true,
    },
    plugin: ['typedoc-plugin-remove-references'],
}

const defaultConfig = typedoc.materialTheme(__dirname)

const _typeDocConfig = merge(
    defaultConfig !== undefined ? defaultConfig : {},
    custom,
)

const typeDocConfig: ReturnType<typeof typedoc.materialTheme> = _typeDocConfig
export default typeDocConfig
