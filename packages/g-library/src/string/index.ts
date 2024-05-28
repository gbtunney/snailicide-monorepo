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
} from './_stringUtils.js'

import * as StringUtils from './_stringUtils.js'
import * as StringGen from './_string.js'
import * as Flat from 'flat'
import * as Markdown from './_markdown.js'
import * as stringTransform from './../transformString/index.js'

export const stringUtils = {
    ...StringUtils,
    ...StringGen,
    ...Flat,
    ...Markdown,

    ...stringTransform,
    // ...stringTransform
}

export type { URL } from './_string.js'
export default stringUtils
