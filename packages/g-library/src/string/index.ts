/**
 * GENERAL STRING UTILS
 *
 * This file contains utility functions for string manipulation.
 *
 * @namespace StringUtils
 * @see https://github.com/mout/mout/tree/master/src/string
 */

export {
    lowerCase,
    upperCase,
    capitalizeWords,
    camelCase,
    unCamelCase,
    properCase,
    pascalCase,
    sentenceCase,
    slugify,
    hyphenate,
    unhyphenate,
    truncate,
    stripHtmlTags,
    underscore,
    removeNonWord,
    normalizeLineBreaks,
    replaceAccents,
    escapeHtml,
    unescapeHtml,
    escapeUnicode,
    escapeRegExp,
    trimWhiteSpace,
} from './_stringUtils.js'

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

export type { URL } from './_string.js'
export default stringUtils
