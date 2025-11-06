import { Config } from 'typescript-eslint'

export const eslintCommentRules = (): Config => [
    {
        name: 'ESLint Comments : ERROR',
        rules: {
            'eslint-comments/no-aggregating-enable': 'error',
            'eslint-comments/no-duplicate-disable': 'error',
            'eslint-comments/no-unlimited-disable': 'error',
            'eslint-comments/no-unused-disable': 'error',
            'eslint-comments/no-unused-enable': 'error',
            'eslint-comments/no-use': [
                'error',
                {
                    allow: [
                        'eslint', // /* eslint ... */
                        'eslint-disable', // /* eslint-disable rule */
                        'eslint-enable', // /* eslint-enable rule */
                        'eslint-disable-next-line', // // eslint-disable-next-line rule
                        'eslint-disable-line', // // eslint-disable-line rule
                    ],
                },
            ],
        },
    },
]
