import jsdoc from 'eslint-plugin-jsdoc'
import { Config } from 'typescript-eslint'
import { getScaledWidth } from '../../prettier/index.js'

export const jsdocRules = (): Config => [
    { ...jsdoc.configs['flat/recommended'] },
    /* eslint sort/object-properties:off */
    {
        name: 'JSDoc: ERROR',
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
            'jsdoc/multiline-blocks': [
                'error',
                {
                    allowMultipleTags: true,
                    minimumLengthForMultiline: Math.floor(
                        getScaledWidth('comments') / 3,
                    ),
                    noMultilineBlocks: true,
                    noZeroLineText: true,
                },
            ],
            'jsdoc/tag-lines': ['error', 'always', { count: 0 }],

            /** Blank Lines */
            'jsdoc/no-blank-block-descriptions': 'error',
            'jsdoc/no-blank-blocks': ['error', { enableFixer: true }],

            /**
             * Asterisks
             * @todo : jsdoc/no-multi-asterisks is messed up, prettier turns to hyphens
             */
            'jsdoc/require-asterisk-prefix': 'error',
            'jsdoc/no-multi-asterisks': ['error', { allowWhitespace: false }],

            /** Misc */
            'jsdoc/convert-to-jsdoc-comments': [
                'error',
                { lineOrBlockStyle: 'both' },
            ],
        },
    },
    {
        name: 'JSDoc: OFF',
        rules: {
            'jsdoc/lines-before-block': 'off',
            'jsdoc/require-param': 'off',
            'jsdoc/require-returns': 'off',
        },
    },
]
