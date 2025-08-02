import { vitest } from '@snailicide/build-config'
import { defineConfig, mergeConfig } from 'vitest/config'

export default mergeConfig(
    vitest.config(),
    defineConfig({
        test: {
            coverage: {
                enabled: true,
                exclude: [
                    'node_modules/**',
                    'dist/**',
                    'types/**',
                    '**/*.d.ts',
                    '**/*.config.*',
                    '**/test-swatch.ts', // Visual test helper
                    '**/*.test.ts',
                    '**/*.spec.ts',
                ],
                include: ['src/**/*.ts'],
                provider: 'v8',
                // Fast and accurate coverage
                reporter: ['text', 'json', 'html'],
                // Multiple output formats
                reportsDirectory: './coverage',
                thresholds: {
                    global: {
                        branches: 80,
                        functions: 80,
                        lines: 80,
                        statements: 80,
                    },
                },
            },
        },
    }),
)
