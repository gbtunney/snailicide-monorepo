import { EsLint } from '@snailicide/build-config'

const FLAT_CONFIG = await EsLint.flatConfig()

export default [
    ...FLAT_CONFIG,
    {
        ignores: ['packages/**/docs/**/*'],
    },
]
