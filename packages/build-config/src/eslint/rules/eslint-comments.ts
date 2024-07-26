import { Config } from 'typescript-eslint'

export const eslintCommentRules = (): Config => [
    {
        rules: {
            // disallow a eslint-enable comment for multiple eslint-disable comments
            'eslint-comments/no-aggregating-enable': 'error',
            // disallow duplicate eslint-disable comments
            'eslint-comments/no-duplicate-disable': 'error',
            // disallow eslint-disable comments without rule names
            'eslint-comments/no-unlimited-disable': 'error',
            // disallow unused eslint-disable comments
            'eslint-comments/no-unused-disable': 'error',
            // disallow unused eslint-enable comments
            'eslint-comments/no-unused-enable': 'error',
            // disallow ESLint directive-comments
            'eslint-comments/no-use': [
                'error',
                {
                    allow: ['eslint'],
                },
            ],
        },
    },
]
