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
import * as StringGen from './_string.js'
import * as StringUtils from './_stringUtils.js'
import * as format from './formatStr.js'
import * as validators from './validators.js'

export const stringUtils = {
    ...StringUtils,
    ...StringGen,
    ...stringTransform,
    ...validators,
    ...format,
}

export type { URL } from './validators.js'
export default stringUtils
