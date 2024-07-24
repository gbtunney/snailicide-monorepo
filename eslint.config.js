import url from 'node:url'

import { EsLint } from '@snailicide/build-config'
import tseslint from 'typescript-eslint'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const FLAT_CONFIG = await EsLint.flatConfig(__dirname)

export default [
    ...FLAT_CONFIG,
    {
        ignores: ['packages/**/docs/**/*'],
    },
    ...tseslint.config({
        extends: [tseslint.configs.disableTypeChecked],
        files: [
            'packages/cli-template/**/*',
            'packages/cli-app/**/*',
            'packages/g-shopify-library/**/*',
            'packages/g-windi/**/*',
            'packages/vite-plugin-shopify-liquid-modules/**/*',
            'packages/vite-plugin-shopify-theme-schema/**/*',
        ],
        rules: {
            '@typescript-eslint/naming-convention': 'off',
            '@typescript-eslint/explicit-function-return-type': 'off',
            'filenames-simple/naming-convention': 'warn',
            '@typescript-eslint/no-floating-promises': 'off',
        },
    }),
    {},
]
