//@ts-expect-error No declaration file or types for this
import pluginJs from '@eslint/js'
import globals from 'globals'
import type { Config } from 'typescript-eslint'
import filenamesConfig from './plugins/filenames.js'
import importConfig from './plugins/import.js'
import jsdocConfig from './plugins/jsdoc.js'
import sortConfig from './plugins/sort.js'
import _tsEslintConfig from './plugins/typescript.js'
import { unusedImportsConfig } from './plugins/unused-imports.js'
import vitestConfig from './plugins/vitest.js'
import pluginsConfig from './plugins.js'

export const base_files = ['**/*.{js,mjs,cjs,ts}']
export const base_ignores = [
    '**/dist/**/*',
    '**/node_modules/**',
    '**/dist/**',
    '**/types/**/*',
    '**/types/**',
]

export const flatEslintConfig = async (): Promise<Config> => {
    const EslintConfig: Config = [
        { files: base_files },

        { ignores: base_ignores },
        {
            languageOptions: {
                globals: { ...globals.browser, ...globals.node },
            },
        },
        ...(await pluginsConfig()),
        pluginJs.configs.recommended,
        ...(await _tsEslintConfig()),
        ...(await importConfig()),
        ...(await unusedImportsConfig()),
        ...(await sortConfig()),
        ...(await vitestConfig()),
        ...(await jsdocConfig()),
        ...(await filenamesConfig()),
        // ...(await namingConventionConfig()),
        {
            files: ['**/*.cjs'],
            rules: {
                '@typescript-eslint/no-unused-vars': 'warn',
                '@typescript-eslint/no-var-requires': 'off',
                'no-undef': 'error',
            },
        },
    ]
    return EslintConfig
}

export default flatEslintConfig
