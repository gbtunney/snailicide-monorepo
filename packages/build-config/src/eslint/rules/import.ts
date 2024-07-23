import { Config } from 'typescript-eslint'

export const importRules = (): Config => [
    {
        rules: {
            'import/extensions': ['error', 'ignorePackages'],
            'import/no-default-export': 'error',
            'import/no-duplicates': 'warn',
            'no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
        },
    },
]
