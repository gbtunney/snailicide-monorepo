// @ts-check
/* eslint-env node */

/** @file Local package eslint config file */
const options = require('@snailicide/build-config/.eslintrc.js')
module.exports = {
    ...options,
    rules: {
        'no-undef': 'warn',
    },
}