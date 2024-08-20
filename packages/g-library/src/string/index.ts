/** GENERAL STRING UTILS */

import * as escape from './escape.js'
import * as format from './format-str.js'
import * as StringUtils from './string-utils.js'
import * as StringGen from './string.js'
import * as stringTransform from './transformString/index.js'
import * as validators from './validators.js'

/** @namespace */
export const stringUtils = {
    ...StringUtils,
    ...StringGen,
    ...stringTransform,
    ...format,
    ...escape,
    ...validators,
}

export default stringUtils
export type { URL } from './validators.js'
