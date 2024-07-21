import jsdocPlugin from 'eslint-plugin-jsdoc'
import { Config } from 'typescript-eslint'

export const jsdocConfig = async (): Promise<Config> => [
    {
        plugins: { ['jsdoc']: jsdocPlugin },
        ...(await jsdocPlugin.configs['flat/recommended']),
        rules: {
            'jsdoc/require-returns': 'off',
            'jsdoc/tag-lines': 'off',
        },
    },
]
export default jsdocConfig
