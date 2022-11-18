import { z } from 'zod'

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

export type { JSON, Jsonifiable, Jsonify } from './object/json.js'
export { getJSONString, getJSON } from './object/json.js'

/* * NODE UTILITIES * */
export { getFilePathArr } from './node/file.path.array.js'
export type { FilePath } from './node/file.path.array.js'

export { exportJSONFile } from './node/export.json.file.js'
export type { JSONExportConfig } from './node/export.json.file.js'

export { getYArgs } from './node/yargs.js'

/* * GENERIC TYPEGUARDS * */
export * as tg from './typeguard/utility.typeguards.js'

/* * ZOD * */
export const zod = z

export type {
    PlainObject,
    Primitive,
    PrefixProperties,
    SuffixProperties,
    DeepPartial,
} from './types/utility'

export type {
    EmptyObject,
    EmptyArray,
    EmptyString,
    Falsy,
    NilOrEmpty,
    NilLike,
    Nullish,
} from './types/empty'
//todo:reorganize
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
} from './string/index.js'
//
// export {
//     cleanIntegerType,
//     cleanBooleanType,
//     toInteger,
//     isInteger,
// } from './scripts/_valueTypes.js'
//
// export {
//     randomInt,
//     getRandomNumber,
//     getDigitCount,
//     formatCurrency,
// } from './scripts/_number.js'
//
// /* * STRING TRANSFORM UTILITIES * */
// export {
//     transformExplodeArray,
//     replaceCharacters,
//     trimCharacters,
//     batchTrimCharacters,
//     trimCharactersStart,
//     trimCharactersEnd,
//     getRegMatchStartOfString,
//     getRegMatchEndOfString,
//     validateString,
//     validateStringBatch,
//     startsWith,
//     endsWith,
//     includes,
//     eq,
//     contains,
//     match,
// } from './transformString/index.js'
//
//
