import vitestPlugin from 'eslint-plugin-vitest'
import { Config } from 'typescript-eslint'
import { getFileExtensionList, TS_FILE_EXTENSIONS } from '../../utilities.js'

export const vitestRules = (): Config => [
    {
        files: [
            ...getFileExtensionList(TS_FILE_EXTENSIONS, false, '**/*.test.'),
        ],
        languageOptions: {
            globals: {
                ...vitestPlugin.environments.env.globals,
            },
        },
        name: 'Vitest: Recommended, Typecheck enabled',
        rules: {
            ...vitestPlugin.configs.recommended.rules,
        },
        settings: {
            vitest: {
                typecheck: true,
            },
        },
    },
]
