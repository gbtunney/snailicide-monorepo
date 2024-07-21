
import { Config } from 'typescript-eslint'

export const unusedImportsConfig = async (): Promise<Config> => [
    {
        rules: {
            'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
            'unused-imports/no-unused-imports': 'error',
        },
    },
]
export default unusedImportsConfig
