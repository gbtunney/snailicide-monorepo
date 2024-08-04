/**
 * GENERAL STRING UTILS
 *
 * This file contains utility functions for string manipulation. *
 *
 * @category Utility
 * @category String
 * @namespace StringUtils
 */

import * as stringTransform from './../transformString/index.js'
import * as format from './format-str.js'
import * as StringUtils from './string-utils.js'
import * as StringGen from './string.js'
import * as validators from './validators.js'

export const stringUtils = {
    ...StringUtils,
    ...StringGen,
    ...stringTransform,
    ...validators,
    ...format,
}

export default stringUtils
export type { URL } from './validators.js'
