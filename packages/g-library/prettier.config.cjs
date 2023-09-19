/* eslint-env node */
'use strict'
// @ts-check
/** @file Local package prettier config file */
const { Prettier, merge } = require('@snailicide/build-config')
//import prettier from 'prettier'

//prettier.options.
module.exports = merge(Prettier.config, {
    trailingComma: 'none',
})
console.log(Prettier.config)
