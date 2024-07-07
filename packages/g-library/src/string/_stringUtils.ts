import { replaceAll } from 'ramda-adjunct'
import { toLower, toUpper, replace, pipe, trim } from 'ramda'
import escapeStringRegexp from 'escape-string-regexp'
import type { RegExpMatchArray } from './../regexp/index.js'
import { isNotNull } from './../typeguard/utility.typeguards.js'

/**
 * Converts a string to lowercase.
 *
 * @memberof StringUtils
 * @function lowerCase
 * @param {string} value - The string to convert.
 * @returns {string} - The converted lowercase string.
 */
export const lowerCase = (value: string): string => toLower(value)

/**
 * Converts a string to uppercase.
 *
 * @memberof StringUtils
 * @function upperCase
 * @param {string} value - The string to convert.
 * @returns {string} - The converted uppercase string.
 */
export const upperCase = (value: string): string => toUpper(value)

/**
 * Capitalizes the first letter of each word in a string.
 *
 * @memberof StringUtils
 * @function capitalizeWords
 * @param {string} value - The string to capitalize.
 * @returns {string} - The capitalized string.
 */
export const capitalizeWords = (value: string): string =>
    value.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))

/**
 * Converts a string to camelCase.
 *
 * @memberof StringUtils
 * @function camelCase
 * @param {string} value - The string to convert.
 * @returns {string} - The camelCased string.
 */
export const camelCase = (value: string): string => {
    value = replaceAll(/[-_]/g, ' ', pipe(replaceAccents, removeNonWord)(value))
    if (/[a-z]/.test(value) && /^|\s[A-Z]+\s|$/.test(value)) {
        // we convert any word that isn't all caps into lowercase
        // value = value.replace(/\s(\w+)/g, function(word, m) {
        //   return /^[A-Z]+$/.test(m) ? word : lowerCase(word);
        //  });
    } else if (/\s/.test(value)) {
        // if it doesn't contain an acronym and it has spaces we should
        // convert every word to lowercase
        value = toLower(value)
    }
    return pipe(
        replace(/\s[a-z]/g, toUpper),
        replace(/^\s*[A-Z]+/g, toLower),
        replace(/\s+/g, ''),
    )(value)
}

/**
 * Adds space between camelCase text.
 *
 * @memberof StringUtils
 * @function unCamelCase
 * @param {string} value - The camelCase string.
 * @returns {string} - The string with spaces added.
 */
export const unCamelCase = (value: string): string =>
    pipe(
        replace(/([a-z])([A-Z])/g, '$1 $2'),
        replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3'),
        replace(/^./, toUpper),
    )(value)

/**
 * Converts a string to proper case (UPPERCASE first char of each word).
 *
 * @memberof StringUtils
 * @function properCase
 * @param {string} value - The string to convert.
 * @returns {string} - The properly cased string.
 */
export const properCase = (value: string): string =>
    pipe(toLower, replace(/^\w|\s\w/g, toUpper))(value)

/**
 * Converts a string to PascalCase.
 *
 * @memberof StringUtils
 * @function pascalCase
 * @param {string} value - The string to convert.
 * @returns {string} - The PascalCased string.
 */
export const pascalCase = (value: string): string =>
    replace(/^[a-z]/, toUpper, camelCase(value))

/**
 * Generates a UUID v4 string.
 *
 * @memberof StringUtils
 * @function uuidv4
 * @returns {string} - The generated UUID v4 string.
 */
export const uuidv4 = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (c) {
            const r = (Math.random() * 16) | 0,
                v = c == 'x' ? r : (r & 0x3) | 0x8
            return v.toString(16)
        },
    )
}

/**
 * Converts a string to sentence case.
 *
 * @memberof StringUtils
 * @function sentenceCase
 * @param {string} value - The string to convert.
 * @returns {string} - The sentence-cased string.
 */
export const sentenceCase = (value: string): string =>
    value
        .split('.')
        .map(function (word, index) {
            return index === 0
                ? word.charAt(0).toUpperCase().concat(word.substr(1))
                : word
        })
        .join(' ')

/**
 * Converts a string to slug format with a specified delimiter.
 *
 * @memberof StringUtils
 * @function slugify
 * @param {string} value - The string to convert.
 * @param {string} [delimiter='-'] - The delimiter to use in the slug. Default
 *   is `'-'`
 * @returns {string} - The slugified string.
 */
export const slugify = (value: string, delimiter = '-'): string => {
    const transformFunc = pipe(replaceAccents, removeNonWord, trim, toLower)
    return replaceAll(' ', delimiter, transformFunc(value) as string)
}

/**
 * Converts camelCase text to hyphenated text.
 *
 * @memberof StringUtils
 * @function hyphenate
 * @param {string} value - The camelCase string.
 * @returns {string} - The hyphenated string.
 */
export const hyphenate = (value: string): string =>
    pipe(unCamelCase, slugify)(value)

/**
 * Converts hyphenated text to spaces.
 *
 * @memberof StringUtils
 * @function unhyphenate
 * @param {string} value - The hyphenated string.
 * @returns {string} - The string with hyphens replaced by spaces.
 */
export const unhyphenate = (value: string): string =>
    replace(/(\w)(-)(\w)/g, '$1 $3', value)

/**
 * Converts camelCase text to underscored text.
 *
 * @memberof StringUtils
 * @function underscore
 * @param {string} value - The camelCase string.
 * @returns {string} - The underscored string.
 */
export const underscore = (value: string): string =>
    slugify(unCamelCase(value), '_')

/**
 * Removes non-word characters from a string.
 *
 * @memberof StringUtils
 * @function removeNonWord
 * @param {string} value - The string to process.
 * @returns {string} - The string without non-word characters.
 */
export const removeNonWord = (value: string): string =>
    replace(/[^0-9a-zA-Z\xC0-\xFF -]/g, '', value)

/**
 * Normalizes line breaks in a string to a specified line ending.
 *
 * @memberof StringUtils
 * @function normalizeLineBreaks
 * @param {string} value - The string to process.
 * @param {string} [lineEnd='\n'] - The line ending to normalize to. Default is
 *   `'\n'`
 * @returns {string} - The string with normalized line breaks.
 */
export const normalizeLineBreaks = (value: string, lineEnd = '\n'): string =>
    pipe(
        replace(/\r\n/g, lineEnd),
        replace(/\r/g, lineEnd),
        replace(/\n/g, lineEnd),
    )(value)

/** @namespace StringUtils */

/**
 * Replaces accented characters in a string with their non-accented equivalents.
 *
 * @memberof StringUtils
 * @function replaceAccents
 * @param {string} value - The string to process.
 * @returns {string} - The string with accents replaced.
 */
export const replaceAccents = (value: string): string => {
    // verifies if the String has accents and replace them
    if (value.search(/[\xC0-\xFF]/g) == -1) return value
    return value
        .replace(/[\xC0-\xC5]/g, 'A')
        .replace(/[\xC6]/g, 'AE')
        .replace(/[\xC7]/g, 'C')
        .replace(/[\xC8-\xCB]/g, 'E')
        .replace(/[\xCC-\xCF]/g, 'I')
        .replace(/[\xD0]/g, 'D')
        .replace(/[\xD1]/g, 'N')
        .replace(/[\xD2-\xD6\xD8]/g, 'O')
        .replace(/[\xD9-\xDC]/g, 'U')
        .replace(/[\xDD]/g, 'Y')
        .replace(/[\xDE]/g, 'P')
        .replace(/[\xE0-\xE5]/g, 'a')
        .replace(/[\xE6]/g, 'ae')
        .replace(/[\xE7]/g, 'c')
        .replace(/[\xE8-\xEB]/g, 'e')
        .replace(/[\xEC-\xEF]/g, 'i')
        .replace(/[\xF1]/g, 'n')
        .replace(/[\xF2-\xF6\xF8]/g, 'o')
        .replace(/[\xF9-\xFC]/g, 'u')
        .replace(/[\xFE]/g, 'p')
        .replace(/[\xFD\xFF]/g, 'y')
}

/**
 * Truncates a string to a specified length, appending '...' if truncated.
 *
 * @memberof StringUtils
 * @function truncate
 * @param {string} value - The string to truncate.
 * @param {number} [maxChars=200] - The maximum number of characters. Default is
 *   `200`
 * @param {string} [append='...'] - The string to append if truncated. Default
 *   is `'...'`
 * @param {boolean} [onlyFullWords=true] - Whether to truncate at the last full
 *   word. Default is `true`
 * @returns {string} - The truncated string.
 */
export const truncate = (
    value: string,
    maxChars = 200,
    append = '...',
    onlyFullWords = true,
): string => {
    maxChars = onlyFullWords ? maxChars + 1 : maxChars
    value = trim(value)
    if (value.length <= maxChars) return value
    value = value.substr(0, maxChars - append.length)
    //crop at last space or remove trailing whitespace
    value = onlyFullWords
        ? value.substr(0, value.lastIndexOf(' '))
        : trim(value)
    return `${value}${append}`
}

/**
 * Capture all capital letters following a word boundary (in case the input is
 * in all caps).
 *
 * @memberof StringUtils
 * @function abbreviate
 * @param {string} value - The string to abbreviate.
 * @returns {string} - The abbreviated string.
 */
export const abbreviate = (value: string): string => {
    if (!value.match(/\b([A-Z])/g)) return value
    const matchArr: RegExpMatchArray | null = value.match(/\b([A-Z])/g)
    if (isNotNull<Exclude<RegExpMatchArray, null>>(matchArr)) {
        return matchArr.join('')
    } else {
        return value
    }
}

/**
 * Escapes special characters in string for regexp.
 *
 * @memberof StringUtils
 * @function escapeRegExp
 * @param {string} value - The string to escape.
 * @returns {string} - The escaped string.
 */
export const escapeRegExp = (value: string): string => escapeStringRegexp(value)

/**
 * Escapes a string for insertion into HTML.
 *
 * @memberof StringUtils
 * @function escapeHtml
 * @param {string} value - The string to escape.
 * @returns {string} - The escaped string.
 */
export const escapeHtml = (value: string): string =>
    pipe(
        replace(/&/g, '&amp;'),
        replace(/</g, '&lt;'),
        replace(/>/g, '&gt;'),
        replace(/'/g, '&#39;'),
        replace(/"/g, '&quot;'),
    )(value)

/**
 * Unescapes HTML special chars.
 *
 * @memberof StringUtils
 * @function unescapeHtml
 * @param {string} value - The string to unescape.
 * @returns {string} - The unescaped string.
 */
export const unescapeHtml = (value: string): string =>
    pipe(
        replace(/&amp;/g, '&'),
        replace(/&lt;/g, '<'),
        replace(/&gt;/g, '>'),
        replace(/&#39;/g, "'"),
        replace(/&quot;/g, '"'),
    )(value)

/**
 * Escapes a string into unicode sequences.
 *
 * @memberof StringUtils
 * @function escapeUnicode
 * @param {string} value - The string to escape.
 * @param {boolean} [shouldEscapePrintable=false] - Whether to escape printable
 *   characters. Default is `false`
 * @returns {string} - The escaped string.
 */
export function escapeUnicode(
    value: string,
    shouldEscapePrintable = false,
): string {
    return value.replace(/[\s\S]/g, function (ch) {
        // skip printable ASCII chars if we should not escape them
        if (!shouldEscapePrintable && /[\x20-\x7E]/.test(ch)) {
            return ch
        }
        // we use "000" and slice(-4) for brevity, need to pad zeros,
        // unicode escape always have 4 chars after "\u"
        return '\\u' + ('000' + ch.charCodeAt(0).toString(16)).slice(-4)
    })
}

/**
 * Removes HTML tags from a string.
 *
 * @memberof StringUtils
 * @function stripHtmlTags
 * @param {string} value - The string to strip tags from.
 * @returns {string} - The string without HTML tags.
 */
export const stripHtmlTags = (value: string): string =>
    replace(/<[^>]*>/g, '', value)

/**
 * Removes non-printable ASCII characters from a string.
 *
 * @memberof StringUtils
 * @function removeNonASCII
 * @param {string} value - The string to process.
 * @returns {string} - The string without non-printable ASCII characters.
 */
export const removeNonASCII = (value: string): string =>
    // Matches non-printable ASCII chars -
    // http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters
    replace(/[^\x20-\x7E]/g, '', value)

/**
 * Removes all newlines from a string.
 *
 * @memberof StringUtils
 * @function removeAllNewlines
 * @param {string} value - The string to process.
 * @returns {string} - The string without newlines.
 */
export const removeAllNewlines = (value: string): string =>
    // Matches non-printable ASCII chars -
    // http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters
    replace(/\r?\n|\r/g, '', value)

/**
 * Removes whitespace from the start and end of a string.
 *
 * @memberof StringUtils
 * @function trimWhiteSpace
 * @param {string} value - The string to process.
 * @returns {string} - The string without leading or trailing whitespace.
 */
export const trimWhiteSpace = (value: string): string =>
    value.replace(new RegExp(/^\s|\s$/), '')
