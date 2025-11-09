/**
 * Vitest Configuration
 *
 * @see [Vitest - A modern testing library for Vue 3](https://vitest.dev/)
 */
import { defineConfig, ViteUserConfig } from 'vitest/config'

export const viTestConfig = (): ViteUserConfig =>
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

// Vitest v2+: avoid missing 'UserConfig' export by deriving the type
export type VitestUserConfig = Parameters<typeof defineConfig>[0]
