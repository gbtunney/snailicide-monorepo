// @ts-check
/* eslint-env node */

/** @file Local package eslint config file */
const options = require('./dist/.eslintrc.json')
const merge = require('deepmerge')
module.exports = merge(options, {
    ignorePatterns: ['src/**/*.test.ts'],
    rules: {
        'no-undef': 'warn',
        '@typescript-eslint/no-unused-vars': 'warn',
    },
})
