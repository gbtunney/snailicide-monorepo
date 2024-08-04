import vitestPlugin from 'eslint-plugin-vitest'
import { Config } from 'typescript-eslint'

export const vitestRules = (): Config => [
    {
        files: ['**/*.test.ts'],
        languageOptions: {
            globals: {
                ...vitestPlugin.environments.env.globals,
            },
        },
        // or any other pattern
        rules: {
            ...vitestPlugin.configs.recommended.rules,
        },
        settings: {
            vitest: {
                typecheck: true,
            },
        },
    },
]
