import { merge, typedoc } from '@snailicide/build-config'
import url from 'node:url'
import path from 'path'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const custom = {
    categorizeByGroup: true,
    entryPoints: [path.resolve(`${__dirname}/src/node.ts`)],
    navigation: {
        includeCategories: true,
        includeFolders: false,
        includeGroups: true,
    },
}
const defaultConfig = typedoc.materialTheme(__dirname)

const _typeDocConfig = merge(
    defaultConfig !== undefined ? defaultConfig : {},
    custom,
)
// @ts-expect-error: "merge errors i dont know why"
const typeDocConfig: ReturnType<typeof typedoc.materialTheme> = _typeDocConfig
export default typeDocConfig
