import { EsLint } from '@snailicide/build-config'
import tseslint from 'typescript-eslint'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const FLAT_CONFIG = await EsLint.flatConfig(__dirname)

export default [
    ...FLAT_CONFIG,
    {
        ignores: [
            'packages/**/docs/**/*',
            '.history/**/*',
            '**/.vitepress/cache',
        ],
    },
    ...tseslint.config({
        extends: [tseslint.configs.disableTypeChecked],
        files: [
            'packages/cli-template/**/*',
            'packages/g-shopify-library/**/*',
            'packages/g-windi/**/*',
            'packages/vite-plugin-shopify-liquid-modules/**/*',
            'packages/vite-plugin-shopify-theme-schema/**/*',
        ],
        rules: {
            '@typescript-eslint/explicit-function-return-type': 'warn',
            //todo: this needs to ditch the typechecked thing for now
            '@typescript-eslint/naming-convention': 'off',
            '@typescript-eslint/no-floating-promises': 'off',
        },
    }),
    ...tseslint.config({
        files: ['packages/g-shopify-library/**/*'],
        rules: {
            'filenames-simple/naming-convention': 'warn',
        },
    }),
    //TODO TEMPORARY   - problem in jsdoc file g-librry dictionary
    // @TODO: Temporarily disabled rules - review later - has to do with eslint fixer jsdoc and prettier order busted.
    ...tseslint.config({
        files: ['packages/**/*'],
        rules: {
            'jsdoc/check-indentation': 'warn',
        },
    }),
    {
        files: ['packages/cli-app/**/*.ts'],
        rules: { '@typescript-eslint/unified-signatures': 'off' },
    },
    {},
]
