import { pipe, replace } from 'ramda'

import type { RegExpMatchArray } from './../regexp/index.js'
import { isNotNull } from './../typeguard/utility.typeguards.js'

/**
 * Removes non-word characters from a string.
 *
 * @category Remove Characters
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
 * @category Remove Characters
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
 * @category Remove Characters
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

/** Capture all capital letters following a word boundary (in case the input is in all caps). */
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
 * @category Remove Characters
 */
export const stripHtmlTags = (value: string): string =>
    replace(/<[^>]*>/g, '', value)

/**
 * Removes non-printable ASCII characters from a string.
 *
 * @category Remove Characters
 * @see {@link http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters}
 */
export const removeNonASCII = (value: string): string =>
    replace(/[^\x20-\x7E]/g, '', value)

/**
 * Removes all newlines from a string.
 *
 * @category Remove Characters
 */
export const removeAllNewlines = (value: string): string =>
    replace(/\r?\n|\r/g, '', value)

/**
 * Removes whitespace from the start and end of a string.
 *
 * @category Remove Characters
 * @category Trim
 */
export const trimWhiteSpace = (value: string): string =>
    value.replace(new RegExp(/^\s|\s$/, 'g'), '')
