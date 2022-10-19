/**
 * @file Eslint configuration for packages.
 * @author Gillian Tunney
 * @see [eslint](http://eslint.org)
 */

// @ts-check
/* eslint-env node */

/** @file Local package eslint config file */
const options = require('@snailicide/build-config/.eslintrc.js')

module.exports = {
    ...options,
    rules: {},
}
