import { typedoc } from '@snailicide/build-config'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const typeDocConfig = typedoc.configMarkdown(__dirname)

export default typeDocConfig
