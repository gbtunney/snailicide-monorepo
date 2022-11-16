/** A Branded Type for values parseable to number. */
export type NumberParseable = (number | string | boolean) & {
    readonly isNumberParseble: unique symbol
}

/**
 * Check if value is parseable to number.
 *
 * @example
 *     ```js
 *     isNumberParseable('AAAA');
 *     //=> false
 *
 *     isNumberParseable('100');
 *     //=> true
 *
 *     if (!isNumberParseable(value))
 *     throw new Error('Value can\'t be parseable to `Number`.')
 *     return Number(value);
 *     ```
 *
 * @ff {value} - An `unknown` value to be checked.
 */

export const isNumberParseable = (value: unknown): value is NumberParseable =>
    !Number.isNaN(Number(value))

export { get } from './_types'

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
    stringContainsNumber,
    stringContainsLetter,
    escapeRegExp,
} from './scripts/string'

export {
    cleanIntegerType,
    cleanBooleanType,
    toInteger,
    isInteger,
} from './scripts/_valueTypes'

export {
    randomInt,
    getRandomNumber,
    getDigitCount,
    formatCurrency,
} from './scripts/_number'

export {
    transformExplodeArray,
    //  explodeCSSClassString,
    replaceCharacters,
    trimCharacters,
    batchTrimCharacters,
    trimCharactersStart,
    trimCharactersEnd,
    getRegMatchStartOfString,
    getRegMatchEndOfString,
    validateString,
    validateStringBatch,
    startsWith,
    endsWith,
    includes,
    eq,
    contains,
    match,
} from './scripts/transformString'

export type {
    EmptyObject,
    EmptyArray,
    PlainObject,
    EmptyString,
    Primitive,
    Falsy,
    NilOrEmpty,
    NilLike,
    Nullish,
    PrefixProperties,
    SuffixProperties,
    DeepPartial,
} from './_types/utilities'

/* * TYPEGUARDS!!!!!! * */
export {
    tg_isFalsy,
    tg_isTruthy,
    tg_isNilOrEmpty,
    tg_isNotNilOrEmpty,
    tg_isEmptyString,
    tg_isString,
    tg_isNotString,
    tg_isInteger,
    tg_isNotInteger,
    tg_isPrimitive,
    tg_isNotPrimitive,
    tg_isNilLike,
    tg_isNotNilLike,
    tg_isNullish,
    tg_isNotNullish,
    tg_isUndefined,
    tg_isNotUndefined,
    tg_isEmptyArray,
    tg_isNonEmptyArray,
} from './_types/utilities'
export { tg_isCSSColorSpecial, tg_isNotCSSColorSpecial } from './_types'
