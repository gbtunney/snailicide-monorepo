import vitestPlugin from 'eslint-plugin-vitest'

export const vitestConfig = async () => [
    {
        files: ['**/*.test.ts'], // or any other pattern

        plugins: { ['vitest']: vitestPlugin },
        rules: {
            ...(await vitestPlugin.configs.recommended.rules),
        },
        settings: {
            vitest: {
                typecheck: true,
            },
        },
        languageOptions: {
            globals: {
                ...(await vitestPlugin.environments.env.globals),
            },
        },
    },
]

export default vitestConfig
