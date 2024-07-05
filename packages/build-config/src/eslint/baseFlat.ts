//@ts-expect-error No declaration file or types for this
import pluginJs from '@eslint/js'
import globals from 'globals'
import type { Config } from 'typescript-eslint'

import filenamesConfig from './plugins/filenames.js'
import jsdocConfig from './plugins/jsdoc.js'
import importSortConfig from './plugins/sort.js'
import _tsEslintConfig from './plugins/typescript.js'
import { unusedImportsConfig } from './plugins/unusedImports.js'
import vitestConfig from './plugins/vitest.js'

export const base_files = ['**/*.{js,mjs,cjs,ts}']
export const base_ignores = [
    '**/dist/**/*',
    '**/node_modules/**',
    '**/dist/**',
    '**/types/**',
    'packages/g-library/**/*',
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
        pluginJs.configs.recommended,
        ...(await _tsEslintConfig()),
        ...(await jsdocConfig()),
        ...(await importSortConfig()),
        ...(await vitestConfig()),
        ...(await filenamesConfig()),
        ...(await unusedImportsConfig()),
        {
            files: ['**/*.cjs'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
                'no-undef': 'error',
                '@typescript-eslint/no-unused-vars': 'warn',
            },
        },
    ]
    return EslintConfig
}

export default flatEslintConfig
