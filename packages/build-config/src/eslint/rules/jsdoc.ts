import { Config } from 'typescript-eslint'

export const jsdocRules = (): Config => [
    {
        //TODO: this was busted when i updated @types/eslint...jsdocPlugin.configs['flat/recommended'],
        rules: {
            'jsdoc/require-returns': 'off',
            'jsdoc/tag-lines': 'off',
        },
    },
]
