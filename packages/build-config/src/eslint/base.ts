/**
 * @file Manages the base configuration for ESLint.
 * @author Gillian Tunney
 * @see {@link https://www.npmjs.com/package/@typescript-eslint/eslint-plugin | @typescript-eslint/eslint-plugin}
 * @see {@link https://www.npmjs.com/package/eslint-plugin-prettier | eslint-plugin-prettier}
 * @see {@link https://github.com/epaew/eslint-plugin-filenames-simple | eslint-plugin-filenames-simple}
 * @see {@link https://www.npmjs.com/package/eslint-import-resolver-typescript | eslint-import-resolver-typescript}
 * @see {@link https://www.npmjs.com/package/eslint-plugin-import | eslint-plugin-import}
 */
import type { Linter } from 'eslint'

const options: Linter.BaseConfig = {
    // root: true,
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,
    },
    plugins: ['eslint-plugin-import', 'filenames-simple'],
    extends: [
        'eslint:recommended',
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
        //'@typescript-eslint/no-var-requires': 'off',
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
export const baseOptions = options
export default options
