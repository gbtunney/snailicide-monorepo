import pluginJs from '@eslint/js'
import globals from 'globals'
import type { Config } from 'typescript-eslint'
import tseslint from 'typescript-eslint'
import pluginsConfig from './plugins.js'
import { eslintCommentRules } from './rules/eslint-comments.js'
import { filenamesRules } from './rules/filenames.js'
import { importRules } from './rules/import.js'
import { jsdocRules } from './rules/jsdoc.js'
import { namingConventionRules } from './rules/naming-convention.js'
import { sortRules } from './rules/sort.js'
import { typescriptRules } from './rules/typescript.js'
import { vitestRules } from './rules/vitest.js'
import { SHARED_FORMATTING_RULES } from '../prettier/index.js'
import {
    getFileExtensionList,
    JS_FILE_EXTENSIONS,
    JSLIKE_FILE_EXTENSIONS,
} from '../utilities.js'

const base_files: Array<string> = [
    ...getFileExtensionList(JSLIKE_FILE_EXTENSIONS, false, '*.'),
]
const base_ignores = [
    '**/dist/**/*',
    '**/node_modules/**',
    '**/dist/**',
    '**/types/**/*',
    '**/types/**',
    /** SYSTEM */
    '**/.history/**',
    /** DECLARATIONS */
    '**/*.d.*',
    '**/*.d.mts',
    '**/*.d.cts',
    '**/*.map',
]

export const flatEslintConfig = async (__dirname: string): Promise<Config> => {
    const EslintConfig: Config = [
        { files: base_files, name: 'Custom Base Configuration : Includes' },
        { ignores: base_ignores, name: 'Custom Base Configuration : Ignores' },
        {
            languageOptions: {
                globals: { ...globals.browser, ...globals.node },
                parserOptions: {
                    project: true,
                    projectService: true,
                    tsconfigRootDir: __dirname,
                },
            },
            name: 'Custom Base Configuration : globals, parserOptions, projectService',
        },
        ...(await pluginsConfig()),

        /** RULES START HERE */
        pluginJs.configs.recommended,
        ...(await typescriptRules()),
        ...(await importRules()),
        ...(await sortRules()),
        ...(await vitestRules()),
        ...(await jsdocRules()),
        ...(await filenamesRules()),
        ...(await namingConventionRules()),
        ...(await eslintCommentRules()),

        /**
         * No multiple empty lines should ERROR
         *
         * @todo: not even sure if this works?
         */
        {
            name: 'TODO: No multiple empty lines ERROR',
            rules: {
                'no-multiple-empty-lines': [
                    'error',
                    { max: SHARED_FORMATTING_RULES.maxEmptyLines },
                ],
            },
        },

        /** Common JS Rules */
        {
            files: [...getFileExtensionList(['cjs', 'cts'], false, '*/**.')],
            name: 'Custom CommonJS Rules',
            rules: {
                '@typescript-eslint/no-unused-vars': 'warn',
                '@typescript-eslint/no-var-requires': 'off',
                'no-undef': 'error',
            },
        },

        /** ** Typescript Eslint : Disable Type Checked for js files */
        {
            // Take the preset and apply only to JS extensions
            ...tseslint.configs.disableTypeChecked,
            files: [
                ...getFileExtensionList(JS_FILE_EXTENSIONS, false, '**/*.'),
            ],
            name: 'Typescript Eslint : Disable Type Checked for js files',
        },
    ]
    return EslintConfig
}

export default flatEslintConfig
