//@ts-expect-error No declaration file or types for this
import pluginJs from '@eslint/js'
import globals from 'globals'
import type { Config } from 'typescript-eslint'
import path from 'node:path'
import pluginsConfig from './plugins.js'
import { filenamesRules } from './rules/filenames.js'
import { importRules } from './rules/import.js'
import { jsdocRules } from './rules/jsdoc.js'
import { namingConventionRules } from './rules/naming-convention.js'
import { sortRules } from './rules/sort.js'
import { typescriptRules } from './rules/typescript.js'
import { vitestRules } from './rules/vitest.js'

const base_files = ['**/*.{js,mjs,cjs,ts}']
const base_ignores = [
    '**/dist/**/*',
    '**/node_modules/**',
    '**/dist/**',
    '**/types/**/*',
    '**/types/**',
    '**/*.d.ts',
    'packages/**/*.js',
    '*.js',
]

export const flatEslintConfig = async (__dirname: string): Promise<Config> => {
    const EslintConfig: Config = [
        { files: base_files },
        { ignores: base_ignores },
        //   ...tsEslint.configs.stylisticTypeChecked,
        {
            languageOptions: {
                globals: { ...globals.browser, ...globals.node },
                parserOptions: {
                    project: [
                        path.resolve(
                            `${__dirname}/./packages/*/src/tsconfig.json`,
                        ),
                        path.resolve(`${__dirname}/./packages/*/tsconfig.json`),
                    ],
                    tsconfigRootDir: __dirname,
                },
            },
        },
        ...(await pluginsConfig()),
        pluginJs.configs.recommended,
        ...(await typescriptRules()),
        ...(await importRules()),
        ...(await sortRules()),
        ...(await vitestRules()),
        ...(await jsdocRules()),
        ...(await filenamesRules()),
        ...(await namingConventionRules()),
        {
            files: ['**/*.cjs'],
            rules: {
                '@typescript-eslint/no-unused-vars': 'warn',
                '@typescript-eslint/no-var-requires': 'off',
                'no-undef': 'error',
            },
        },
    ]
    return EslintConfig
}

export default flatEslintConfig
