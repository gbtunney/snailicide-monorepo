import { Config } from 'typescript-eslint'

export const namingConventionConfig = async (): Promise<Config> => [
    {
        rules: {
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    format: ['camelCase'],
                    selector: 'default',
                },
                /**
                 * Enforce that boolean variables are prefixed with an allowed
                 * verb
                 */
                {
                    format: ['camelCase'],
                    prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
                    selector: 'variable',
                    types: ['boolean'],
                },
                {
                    format: ['camelCase'],
                    leadingUnderscore: 'allow',
                    selector: 'parameter',
                },

                {
                    format: ['PascalCase'],
                    selector: 'typeLike',
                },
                {
                    custom: { match: true, regex: '^T[A-Z]' },
                    format: ['PascalCase'],
                    /**
                     * A generic variable must start with the capital letter T
                     * followed by a descriptive name
                     */
                    selector: 'typeParameter',
                },
                /** Enforce that all const variables are in UPPER_CASE */
                {
                    format: ['UPPER_CASE'],
                    modifiers: ['const'],
                    selector: 'variable',
                },
                /** Enforce that private members are prefixed with an underscore */
                {
                    format: ['camelCase'],
                    leadingUnderscore: 'require',
                    modifiers: ['private'],
                    selector: 'memberLike',
                },
            ],
            'camelcase': 'off',
        },
    },
]
export default namingConventionConfig
