/**
 * Vitest config
 *
 * @module vitest
 */
import { defineConfig, UserConfig } from 'vitest/config'

export const viTestConfig: UserConfig = defineConfig({
    test: {
        exclude: [
            'node_modules',
            './types/**/*',
            './dist/**/*',
            './**/*.test.js',
        ],
    },
})

export const vitest = {
    config: viTestConfig,
}
export default vitest
