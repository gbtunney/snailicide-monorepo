//@ts-expect-error No declaration file or types for this
import filenamesPlugin from 'eslint-plugin-filenames'
//@ts-expect-error No declaration file or types for this
import importPlugin from 'eslint-plugin-import'
import jsdocPlugin from 'eslint-plugin-jsdoc'
// @ts-expect-error: No declaration file or types for this
import sortPlugin from 'eslint-plugin-sort'
//@ts-expect-error No declaration file or types for this
import unusedImports from 'eslint-plugin-unused-imports'
import vitestPlugin from 'eslint-plugin-vitest'
import type { Config } from 'typescript-eslint'

export const pluginsConfig =  async (): Promise<Config> => [
    {
        plugins: { ['filenames']: filenamesPlugin,
            ['import']: importPlugin,
            ['jsdoc']: jsdocPlugin,
            ['sort']: sortPlugin,
[  'unused-imports']: unusedImports,
            ['vitest']: vitestPlugin
        },
    },
]

export default pluginsConfig
