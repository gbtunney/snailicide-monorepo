/**
 * @file Manages the base typescript configuration for ESLint.
 * @author Gillian Tunney
 * @see {@link https://www.npmjs.com/package/@typescript-eslint/eslint-plugin | @typescript-eslint/eslint-plugin}
 */
import type { Linter } from 'eslint'

const options: Linter.BaseConfig = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
    },
    plugins: ['@typescript-eslint'],
    extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    rules: {
        '@typescript-eslint/no-namespace': 'warn',
        '@typescript-eslint/no-unused-vars': 'error',
        //'@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/ban-types': [
            'error',
            {
                types: {
                    'Boolean':
                        'Avoid using the `Boolean` type. Did you mean `boolean`?',
                    'Symbol':
                        'Avoid using the `Boolean` type. Did you mean `symbol`?',
                    'Number':
                        'Avoid using the `Number` type. Did you mean `number`?',
                    'String':
                        'Avoid using the `String` type. Did you mean `string`?',
                    'Object':
                        'Avoid using the `Object` type. Did you mean `object`?',
                    'Function':
                        'Avoid using the `Function` type. Prefer a specific function type, like `() => void`.',
                    /*
                     * Allow use of '{}' - we use it to define React components with no properties
                     */
                    '{}': false,
                },
            },
        ],
    },
    overrides: [
        {
            files: ['*.cjs'],
            rules: {
                '@typescript-eslint/no-var-requires': 'off',
                'no-undef': 'error',
            },
        },
    ],
}
export const typeScriptOptions = options
