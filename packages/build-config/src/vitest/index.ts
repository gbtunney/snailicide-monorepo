/**
 * Vitest Configuration
 * @see [Vitest - A modern testing library for Vue 3](https://vitest.dev/)
 */
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
