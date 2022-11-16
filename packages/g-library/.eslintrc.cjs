/**
 * @file Eslint configuration for packages.
 * @author Gillian Tunney
 * @see [eslint](http://eslint.org)
 */

// @ts-check
/* eslint-env node */

/** @file Local package eslint config file */

const options = require('@snailicide/build-config/eslint')
const merge = require('deepmerge')

module.exports = merge(options, {
    ignorePatterns: ['src/**/*.test.ts'],
    rules: {
        '@typescript-eslint/no-unused-vars': 'warn',
    },
})
