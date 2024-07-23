import { Config } from 'typescript-eslint'

export const filenamesRules = (): Config => [
    {
        rules: {
            'filenames-simple/no-index': 'off',
            'filenames-simple/pluralize': 'off',
        },
    },
    {
        files: ['**/src/**/*'],
        rules: {
            'filenames-simple/naming-convention': 'error',
        },
    },
]
