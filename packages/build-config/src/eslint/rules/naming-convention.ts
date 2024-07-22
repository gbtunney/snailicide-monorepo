import { Config } from 'typescript-eslint'
export const namingConventionRules = async (
    error: boolean = true,
): Promise<Config> => [
    {
        files: ['**/src/**/*.ts'],
        rules: {
            '@typescript-eslint/naming-convention': [
                error ? 'error' : 'warn',
                {
                    format: ['camelCase', 'UPPER_CASE'],
                    modifiers: ['exported', 'const'],
                    selector: ['variable'],
                },
                {
                    format: ['camelCase'],
                    modifiers: ['exported'],
                    selector: ['variable', 'function'],
                },
                /**
                 * Enforce that boolean variables are prefixed with an allowed
                 * verb
                 */
                {
                    format: ['StrictPascalCase'],
                    prefix: ['is', 'should', 'has', 'can', 'did', 'will'],
                    selector: 'variable',
                    types: ['boolean'],
                },
                {
                    format: ['snake_case', 'camelCase'],
                    leadingUnderscore: 'allowSingleOrDouble',
                    selector: 'parameter',
                },

                {
                    format: ['PascalCase'],
                    selector: 'typeLike',
                },
                {
                    // prefixed with T or K regex: '^(T|K)([A-Z]|[a-z]){2,}'
                    custom: { match: true, regex: '^[A-Z]([A-Z]|[a-z]){2,}' },
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
                    modifiers: ['exported', 'const'],
                    selector: 'variable',
                    types: ['array'],
                },
                {
                    format: ['UPPER_CASE'],
                    selector: 'enum',
                },
                {
                    format: ['PascalCase'],
                    selector: 'enumMember',
                },
                //@typescript-eslint/naming-convention
                /** Enforce that private members are prefixed with an underscore */
                {
                    format: ['camelCase'],
                    leadingUnderscore: 'require',
                    modifiers: ['private'],
                    selector: 'memberLike',
                },
            ],
        },
    },
    {
        files: ['**/src/**/index.ts'],
        rules: {
            '@typescript-eslint/naming-convention': [
                error ? 'error' : 'warn',
                {
                    format: ['strictCamelCase', 'PascalCase'],
                    modifiers: ['exported'],
                    selector: ['function'],
                },
                {
                    format: ['strictCamelCase', 'PascalCase', 'UPPER_CASE'],
                    modifiers: ['exported', 'const'],
                    selector: ['variable'],
                },
            ],
        },
    },
]
