import { Config } from 'typescript-eslint'

export const importRules = (): Config => [
    {
        name: 'Import: ERROR',
        rules: {
            'import/extensions': ['error', 'ignorePackages'],
            'import/no-default-export': 'error',
            /** @todo : think this was a bug? */
            'no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
        },
    },
    {
        name: 'Import: OFF',
        rules: {
            'import/no-duplicates': 'warn',
        },
    },
]
