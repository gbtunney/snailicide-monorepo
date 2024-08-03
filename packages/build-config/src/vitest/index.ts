/**
 * Vitest config
 *
 * @module vitest
 */
import { defineConfig } from 'vitest/config'

export const viTestConfig = defineConfig({
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
