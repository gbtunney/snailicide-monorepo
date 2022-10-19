// @ts-check
/* eslint-env node */

/** @file Local package eslint config file */

/* eslint-disable @typescript-eslint/no-var-requires */
const options = require('@snailicide/build-config/.eslintrc.js')

module.exports = {
    ...options,
    rules: {
        'no-undef': 'warn',
        '@typescript-eslint/no-var-requires': 'off',
    },
}
