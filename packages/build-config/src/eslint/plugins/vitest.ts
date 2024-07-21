import vitestPlugin from 'eslint-plugin-vitest'

export const vitestConfig = async () => [
    {
        files: ['**/*.test.ts'], languageOptions: {
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
