import vitestPlugin from 'eslint-plugin-vitest'
import { Config } from 'typescript-eslint'

export const vitestConfig = async (): Promise<Config> => [
    {
        files: ['**/*.test.ts'],
        languageOptions: {
            globals: {
                ...(await vitestPlugin.environments.env.globals),
            },
        },
        // or any other pattern
        rules: {
            ...(await vitestPlugin.configs.recommended.rules),
        },
        settings: {
            vitest: {
                typecheck: true,
            },
        },
    },
]

export default vitestConfig
