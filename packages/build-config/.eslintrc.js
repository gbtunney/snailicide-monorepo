// @ts-check
/* eslint-env node */
'use strict'

/**
 * ESLINT CONFIG BASE
 *
 * @file Base ESLint Configuration for all packages.
 * @author Gillian Tunney
 * @see [eslint-plugin-filenames-simple - npm](https://www.npmjs.com/package/eslint-plugin-filenames-simple)
 * @see {@link ./prettier.config.js}
 */

const options = {
    root: true,
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
    },
    plugins: ['@typescript-eslint', 'eslint-plugin-import', 'filenames-simple'],
    extends: [
        'eslint:recommended',
        'plugin:prettier/recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
        //"plugin:filenames-simple/recommended"       // for pure ECMAScript/TypeScript project
        //"plugin:filenames-simple/recommended-react" // for React.js project
        //"plugin:filenames-simple/recommended-vue"   // for Vue.js project
    ],
    rules: {
        'import/no-unresolved': 'error',
        'filenames-simple/extension': 'error',
        'filenames-simple/naming-convention': [
            'warn',
            {
                rule: 'camelCase',
                excepts: ['.eslintrc.js'],
            },
        ],

        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-var-requires': 'off',
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
    settings: {
        'filenames-simple': {
            //  allowedExtensions: ['.eslintrc.js'],
        },
        /* * I have no idea what this means, i literally copied it from [eslint-import-resolver-typescript - npm](https://www.npmjs.com/package/eslint-import-resolver-typescript) * */
        'import/extensions': ['.js', '.jsx', '.ts'],
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`

                // Multiple tsconfigs (Useful for monorepos)

                // use a glob pattern
                project: 'packages/*/tsconfig.json',
            },
        },
    },
    overrides: [
        {
            files: ['.eslintrc.js', '**/?(*.)+(spec|test).[jt]s?(x)'],
            rules: {
                'filenames-simple/naming-convention': 'off',
            },
        },
    ],
}

module.exports = options
