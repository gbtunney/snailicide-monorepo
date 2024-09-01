import jsdoc from 'eslint-plugin-jsdoc'
import { Config } from 'typescript-eslint'
import { SHARED_FORMATTING_RULES } from '../../prettier/index.js'

export const jsdocRules = (): Config => [
    { ...jsdoc.configs['flat/recommended'] },

    { ...jsdoc.configs['flat/recommended-typescript'] },
    /* eslint sort/object-properties:off */
    {
        rules: {
            /** Indentation and alignment */
            'jsdoc/check-alignment': 'error',
            'jsdoc/check-indentation': ['error', { excludeTags: ['example'] }],
            'jsdoc/check-line-alignment': [
                'error',
                'any',
                { wrapIndent: '  ' },
            ],

            /** Lines */
            'jsdoc/lines-before-block': [
                'error',
                { ignoreSameLine: true, lines: 1 },
            ],
            'jsdoc/multiline-blocks': [
                'error',
                {
                    allowMultipleTags: true,
                    minimumLengthForMultiline:
                        SHARED_FORMATTING_RULES.printWidth / 2,
                    noMultilineBlocks: true,
                    noZeroLineText: true,
                },
            ],
            'jsdoc/tag-lines': [
                'error',
                'never',
                { tags: { param: { count: 0, lines: 'always' } } },
            ],

            /** Blank Lines */
            'jsdoc/no-blank-block-descriptions': 'error',
            'jsdoc/no-blank-blocks': ['error', { enableFixer: true }],

            /** Asterisks */
            'jsdoc/require-asterisk-prefix': 'error',
            'jsdoc/no-multi-asterisks': 'error',

            /** Misc */
            'jsdoc/require-param': 'off',
            'jsdoc/require-returns': 'off',
            'jsdoc/convert-to-jsdoc-comments': [
                'error',
                { lineOrBlockStyle: 'both' },
            ],
        },
    },
]
