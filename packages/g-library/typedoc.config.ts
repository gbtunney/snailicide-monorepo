import { typedoc } from '@snailicide/build-config'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const typeDocConfig: ReturnType<typeof typedoc.materialTheme> = {
    ...typedoc.materialTheme(__dirname),
    categorizeByGroup: true,
    navigation: {
        includeCategories: true,
        includeFolders: false,
        includeGroups: true,
    },
}

export default typeDocConfig
