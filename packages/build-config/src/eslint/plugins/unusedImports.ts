//@ts-expect-error No declaration file or types for this
import unusedImports from 'eslint-plugin-unused-imports'
import { Config } from 'typescript-eslint'

export const unusedImportsConfig = async (): Promise<Config> => [
    {
        plugins: {
            'unused-imports': unusedImports,
        },
        rules: {
            'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
            'unused-imports/no-unused-imports': 'error',
        },
    },
]
export default unusedImportsConfig
