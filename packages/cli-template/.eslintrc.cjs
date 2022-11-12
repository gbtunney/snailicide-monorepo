// @ts-check
/* eslint-env node */

/** @file Local package eslint config file */

/* eslint-disable @typescript-eslint/no-var-requires */
const options = require('@snailicide/build-config/eslint')
const merge = require('deepmerge')

module.exports = merge(options, {
    ignorePatterns: ['src/**/*.test.ts'],
    rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
    },
})
