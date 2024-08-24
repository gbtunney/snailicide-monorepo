import { defineConfig, UserConfig } from 'vitest/config'

export const viTestConfig = (): UserConfig =>
    defineConfig({
        test: {
            exclude: [
                'node_modules',
                './types/**/*',
                './dist/**/*',
                './**/*.test.js',
            ],
        },
    })

/** @ignore */
export const vitest = {
    config: viTestConfig,
}

export type { UserConfig as VitestUserConfig } from 'vitest/config'
