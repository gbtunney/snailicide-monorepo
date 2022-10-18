// @ts-check
/* eslint-env node */

/** @file Local package eslint config file */
const options = require('./.eslintrc.js')
module.exports = {
    ...options,
    rules: {
        // 'no-undef': 'warn',
    },
    overrides: [
        {
            files: ['.eslintrc.js'],
            rules: {
                'no-undef': 'off',
            },
        },
    ],
}
