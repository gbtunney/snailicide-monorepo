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
} from './_stringUtils'

//todo: rename and move
export {
    stringContainsNumber,
    stringContainsLetter,
    isValidUrl,
} from './_string'
export type { URL } from './_string'
