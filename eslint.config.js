import { EsLint } from '@snailicide/build-config'
import tseslint from 'typescript-eslint'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const FLAT_CONFIG = await EsLint.flatConfig(__dirname)

export default [
    ...FLAT_CONFIG,
    {
        ignores: ['packages/**/docs/**/*', '.history/**/*'],
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
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/naming-convention': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
            'filenames-simple/naming-convention': 'warn',
        },
    }),
    {},
]
