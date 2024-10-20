import { Config } from 'typescript-eslint'
import {
    getFileExtensionList,
    JSLIKE_FILE_EXTENSIONS,
} from '../../utilities.js'

export const importRules = (): Config => [
    {
        name: 'Import: Default Rules',
        rules: {
            'import/extensions': ['error', 'ignorePackages'],
            'import/no-default-export': 'off',
            'import/no-duplicates': 'warn',
            /** @todo : think this was a bug? */
            'no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
        },
    },
    {
        files: [
            ...getFileExtensionList(
                JSLIKE_FILE_EXTENSIONS,
                false,
                '**/src/**/*.',
            ),
        ],
        name: 'Import: no-default-export rule overridden for src files ',
        rules: {
            'import/no-default-export': 'warn',
        },
    },
]
