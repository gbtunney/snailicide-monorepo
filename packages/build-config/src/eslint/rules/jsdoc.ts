import jsdocPlugin from 'eslint-plugin-jsdoc'
import { Config } from 'typescript-eslint'

export const jsdocRules = (): Config => [
    {
        plugins: { ['jsdoc']: jsdocPlugin },
        ...jsdocPlugin.configs['flat/recommended'],
        rules: {
            'jsdoc/require-returns': 'off',
            'jsdoc/tag-lines': 'off',
        },
    },
]
