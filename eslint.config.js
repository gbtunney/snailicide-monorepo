import url from 'node:url'

import { EsLint } from '@snailicide/build-config'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const FLAT_CONFIG = await EsLint.flatConfig(__dirname)

export default [
    ...FLAT_CONFIG,
    {
        ignores: ['packages/**/docs/**/*'],
    },
]
