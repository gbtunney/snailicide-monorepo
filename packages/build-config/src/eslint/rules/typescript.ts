import type { Config } from 'typescript-eslint'
import tsEslint from 'typescript-eslint'

export const typescriptRules = (): Config => {
    return [
        ...tsEslint.configs.recommended,
        ...tsEslint.configs.strictTypeChecked,
        {
            rules: {
                '@typescript-eslint/array-type': [
                    'error',
                    { default: 'generic' },
                ],
                //  this errors "@typescript-eslint/switch-exhaustiveness-check": "error",
                '@typescript-eslint/ban-ts-comment': [
                    'error',
                    {
                        'ts-check': false,
                        'ts-expect-error': 'allow-with-description',
                        'ts-ignore': false,
                        'ts-nocheck': true,
                    },
                ],
                /* TODO: is this deprecated?     '@typescript-eslint/ban-types': [
                    'error',
                    {
                        types: {
                            /!*
                             * Allow use of '{}' - we use it to define React components with no properties
                             *!/
                            '{}': false,
                            'Boolean':
                                'Avoid using the `Boolean` type. Did you mean `boolean`?',
                            'Function':
                                'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
                            'Number':
                                'Avoid using the `Number` type. Did you mean `number`?',
                            'Object':
                                'Avoid using the `Object` type. Did you mean `object`?',
                            'String':
                                'Avoid using the `String` type. Did you mean `string`?',
                            'Symbol':
                                'Avoid using the `Boolean` type. Did you mean `symbol`?',
                        },
                    },
                ],*/
                '@typescript-eslint/consistent-type-definitions': [
                    'error',
                    'type',
                ],
                '@typescript-eslint/no-explicit-any': 'warn',
                '@typescript-eslint/no-namespace': 'warn',
                '@typescript-eslint/no-unnecessary-type-parameters': 'off',
                '@typescript-eslint/no-unused-vars': 'off',
                '@typescript-eslint/prefer-as-const': 'error',
            },
        },
        {
            files: ['**/src/**/*.ts'],
            rules: {
                '@typescript-eslint/explicit-function-return-type': 'error',
            },
        },
        {
            files: ['**/*.ts', '**/*.tsx'],
            rules: {
                '@typescript-eslint/no-unnecessary-condition': 'warn',
                '@typescript-eslint/no-unsafe-argument': 'warn',
                '@typescript-eslint/no-unsafe-assignment': 'warn',
                '@typescript-eslint/no-unsafe-call': 'warn',
                '@typescript-eslint/no-unsafe-member-access': 'warn',
                '@typescript-eslint/no-unsafe-return': 'warn',
            },
        },
    ]
}
