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

//todo: rename and move
export {
    stringContainsNumber,
    stringContainsLetter,
    isValidUrl,
} from './_string.js'
export type { URL } from './_string.js'
export { NEW_LINE_CHARACTERS, WHITE_SPACE_CHARACTERS } from './_stringUtils.js'
