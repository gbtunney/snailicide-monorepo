// @ts-check
/* eslint-env node */

/**
 * @file Manages the base configuration for Prettier.
 * @author Gillian Tunney
 */

/**
 * An object with Prettier.js options.
 *
 * @type {import('prettier').Options}
 */
const options = {
    bracketSameLine: true,
    quoteProps: 'consistent',
    singleQuote: true,
    tabWidth: 4,
    semi: false,
    proseWrap: 'never',
    plugins: ['prettier-plugin-jsdoc', 'prettier-plugin-sh'],
}

module.exports = options
