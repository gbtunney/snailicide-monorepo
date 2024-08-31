import path from 'node:path'
import url from 'node:url'
import { typedoc } from './types/index.js'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const typeDocConfig = typedoc.configMarkdown(__dirname)

const newTypeDocConfig: typeof typeDocConfig = {
    ...typeDocConfig,
    entryPoints: [path.resolve(`${__dirname}/src/index-typedoc.ts`)],
}
export default newTypeDocConfig
