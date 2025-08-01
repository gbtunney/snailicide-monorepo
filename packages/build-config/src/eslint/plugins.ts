// @ts-expect-error: no types
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments'
import simpleFilenamesPlugin from 'eslint-plugin-filenames-simple'
import importPlugin from 'eslint-plugin-import'
import jsdocPlugin from 'eslint-plugin-jsdoc'
import sortPlugin from 'eslint-plugin-sort'
import unusedImports from 'eslint-plugin-unused-imports'
import vitestPlugin from 'eslint-plugin-vitest'
import type { Config } from 'typescript-eslint'
import tsEslint from 'typescript-eslint'

export const pluginsConfig = (): Config => [
    {
        name: 'Custom Base Configuration : Included plugins',
        plugins: {
            ['@typescript-eslint']: tsEslint.plugin,
            ['eslint-comments']: eslintCommentsPlugin,
            ['filenames-simple']: simpleFilenamesPlugin,
            ['import']: importPlugin,
            ['jsdoc']: jsdocPlugin,
            ['sort']: sortPlugin,
            ['unused-imports']: unusedImports,
            ['vitest']: vitestPlugin,
        },
    },
]

export default pluginsConfig
