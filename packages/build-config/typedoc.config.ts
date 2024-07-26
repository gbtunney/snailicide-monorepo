import url from 'node:url'
import { typedoc } from './types/index.js'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const typeDocConfig = typedoc.configMarkdown(__dirname)

export default typeDocConfig
