import simpleFilenamesPlugin from 'eslint-plugin-filenames-simple'
//@ts-expect-error No declaration file or types for this
import importPlugin from 'eslint-plugin-import'
import jsdocPlugin from 'eslint-plugin-jsdoc'
// @ts-expect-error: No declaration file or types for this
import sortPlugin from 'eslint-plugin-sort'
//@ts-expect-error No declaration file or types for this
import unusedImports from 'eslint-plugin-unused-imports'
import vitestPlugin from 'eslint-plugin-vitest'
import type { Config } from 'typescript-eslint'
import tsEslint from 'typescript-eslint'

export const pluginsConfig = (): Config => [
    {
        plugins: {
            ['@typescript-eslint']: tsEslint.plugin,
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
