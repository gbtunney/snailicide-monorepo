import { pipe, replace, toLower, toUpper, trim } from 'ramda'
import { replaceAll } from 'ramda-adjunct'

import type { RegExpMatchArray } from './../regexp/index.js'
import { isNotNull } from './../typeguard/utility.typeguards.js'

/**
 * Converts a string to lowercase.
 *
 * @group Case
 */
export const lowerCase = (value: string): string => toLower(value)

/**
 * Converts a string to uppercase.
 *
 * @group Case
 */
export const upperCase = (value: string): string => toUpper(value)

/**
 * Capitalizes the first letter of each word in a string.
 *
 * @group Case
 */
export const capitalizeWords = (value: string): string =>
    value.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))

/**
 * Converts a string to camelCase.
 *
 * @group Case
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
 * @group Case
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
 * @group Case
 */
export const properCase = (value: string): string =>
    pipe(toLower, replace(/^\w|\s\w/g, toUpper))(value)

/**
 * Converts a string to PascalCase.
 *
 * @group Case
 */
export const pascalCase = (value: string): string =>
    replace(/^[a-z]/, toUpper, camelCase(value))

/**
 * Converts a string to sentence case.
 *
 * @group Case
 */
export const sentenceCase = (value: string): string =>
    value
        .split('.')
        .map(function (word, index) {
            return index === 0
                ? word.charAt(0).toUpperCase().concat(word.substring(1))
                : word
        })
        .join(' ')

/**
 * Converts a string to slug format with a specified delimiter.
 *
 * @group Case
 */
export const slugify = (value: string, delimiter = '-'): string => {
    const transformFunc = pipe(replaceAccents, removeNonWord, trim, toLower)
    return replaceAll(' ', delimiter, transformFunc(value))
}

/**
 * Converts camelCase text to hyphenated text. ( kabobcase!)
 *
 * @group Case
 */
export const hyphenate = (value: string): string =>
    pipe(unCamelCase, slugify)(value)

/**
 * Converts hyphenated text to spaces.
 *
 * @group Case
 */
export const unhyphenate = (value: string): string =>
    replace(/(\w)(-)(\w)/g, '$1 $3', value)

/**
 * Converts camelCase text to underscored text.
 *
 * @group Case
 */
export const underscore = (value: string): string =>
    slugify(unCamelCase(value), '_')

/**
 * Removes non-word characters from a string.
 *
 * @group Remove Characters
 */
export const removeNonWord = (value: string): string =>
    replace(/[^0-9a-zA-Z\xC0-\xFF -]/g, '', value)

/** Generates a UUID v4 string. */
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
 * Normalizes line breaks in a string to a specified line ending.
 *
 * @group Remove Characters
 */
export const normalizeLineBreaks = (value: string, lineEnd = '\n'): string =>
    pipe(
        replace(/\r\n/g, lineEnd),
        replace(/\r/g, lineEnd),
        replace(/\n/g, lineEnd),
    )(value)

/**
 * Replaces accented characters in a string with their non-accented equivalents.
 *
 * @group Remove Characters
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
 * Capture all capital letters following a word boundary (in case the input is
 * in all caps).
 */
export const abbreviate = (value: string): string => {
    if (!value.match(/\b([A-Z])/g)) return value
    const matchArr: RegExpMatchArray = value.match(/\b([A-Z])/g)
    if (isNotNull<Exclude<RegExpMatchArray, null>>(matchArr)) {
        return matchArr.join('')
    } else {
        return value
    }
}

/**
 * Removes HTML tags from a string.
 *
 * @group Remove Characters
 */
export const stripHtmlTags = (value: string): string =>
    replace(/<[^>]*>/g, '', value)

/**
 * Removes non-printable ASCII characters from a string.
 *
 * @group Remove Characters
 * @see {@link http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters}
 */
export const removeNonASCII = (value: string): string =>
    replace(/[^\x20-\x7E]/g, '', value)

/**
 * Removes all newlines from a string.
 *
 * @group Remove Characters
 */
export const removeAllNewlines = (value: string): string =>
    replace(/\r?\n|\r/g, '', value)

/**
 * Removes whitespace from the start and end of a string.
 *
 * @group Remove Characters
 * @group Trim
 */
export const trimWhiteSpace = (value: string): string =>
    value.replace(new RegExp(/^\s|\s$/, 'g'), '')
