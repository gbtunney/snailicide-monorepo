import { escapeRegExp } from './../string/index.js'
import { ensureArray } from 'ramda-adjunct'

const _match = 'String'.match
export type RegExpMatchArray = ReturnType<typeof _match>
const TRIM_CHARS_DEFAULT = ['.', "'", '"', ' ', '-', '[', ']', '(', ')'] ///stuff to trim from css classes.

/**
 * GetRegExpFromStrings Turn a string or strings into a regexp
 *
 * @param {string | string[]} value - String or Array of Strings to be converted
 *   to RegExp
 * @param {Flag} Flag - Regexp flag (like g,m)
 * @returns {RegExp} -
 */
export const getRegExpFromStrings = (
    _value: string | string[],
    flag: Flag | Flag[] | undefined = 'global',
): RegExp => {
    return new RegExp(regexListString(_value), mapFlags(flag))
}

/**
 * Turn a string or strings into a regexp that checks the start
 *
 * @function getRegExpStartOfString
 * @param {string | string[]} value - String or Array of Strings to be converted
 *   to RegExp
 * @param {Flag} Flag - Regexp flag (like g,m)
 * @returns {RegExp} -
 */
export const getRegExpStartOfString = (
    _value: string | string[],
    flag: Flag | Flag[] | undefined = 'global',
): RegExp => {
    return new RegExp(`^${regexListString(_value)}`, mapFlags(flag))
}

/**
 * @function getRegExpMatchEndOfString
 * @see getRegExpMatchStartOfString
 */
export const getRegExpEndOfString = (
    _value: string | string[],
    flag: Flag | Flag[] | undefined = 'global',
): RegExp => {
    return new RegExp(`${regexListString(_value)}$`, mapFlags(flag))
}

/**
 * Turn a string or strings into a regexp to trim the start and finish
 *
 * @function getRegExpTrim
 * @param {string | string[]} value - String or Array of Strings to be converted
 *   to RegExp
 * @param {Flag} Flag - Regexp flag (like g,m)
 * @returns {RegExp} -
 */
export const getRegExpTrim = (
    _value: string | string[],
    flag: Flag | Flag[] | undefined = 'global',
): RegExp => {
    const start = getRegExpStartOfString(_value, flag)
    const end = getRegExpEndOfString(_value, flag)
    return new RegExp(`${start}}${end}`, mapFlags(flag))
}

const regexListString = (_value: string | string[]): string => {
    const value: string[] = ensureArray(_value)
    const escaped: string[] = value.map((str: string) => escapeRegExp(str))
    return escaped.join('|')
}
const mapFlags = (flags: Flag | Flag[] | undefined = undefined): string => {
    if (flags === undefined) return ''
    else {
        const flagArr = ensureArray(flags).map((value: Flag) => {
            if (value === 'global') return 'g'
            else if (value === 'ignoreCase') return 'i'
            else if (value === 'multiline') return 'm'
            else if (value === 'unicode') return 'u'
            else if (value === 'sticky') return 'y'
            else if (value === 'dotAll') return 's'
            else return ''
        })
        return flagArr.join('')
    }
    return ''
}

export type Flag =
    /** Global(g) Makes the expression search for all occurrences. */
    | 'global'
    /* * Ignore Casing(i) Makes the expression search case-insensitively. * */
    | 'ignoreCase'
    /* * Multiline(m) Makes the boundary characters ^ and $ match the beginning and ending of every single line instead of the beginning and ending of the whole string. * */
    | 'multiline'
    /**
     * Unicode(u) Makes the expression assume individual characters as code
     * points, not code units, and thus match 32-bit characters as well.
     */
    | 'unicode'
    /** Dot All(s) Makes the wild character . match newlines as well. */
    | 'dotAll'
    /**
     * Sticky(y) Makes the expression start its searching from the index
     * indicated in its lastIndex property.
     */
    | 'sticky'

export const newLineChars = [
    /* * Unicode:line feed * */
    '\u000a',
    /* * Unicode:carriage return * */
    '\u000d',
    /* * Unicode:line separator * */
    '\u2028',
    /* * Unicode:paragraph separator * */
    '\u2029',
    /* * line feed * */
    '\n',
    /* * carriage return * */
    '\r',
]

///    in Unicode: \u000a or \n, which is a line feed; \u000d or \r, which is a carriage return; \u2028, a line separator; and \u2029, a paragraph separator. In practice though, the regex you posted is suffici
export const whiteSpaceCharacters = [
    ' ',
    '\n',
    '\r',
    '\t',
    '\f',
    '\v',
    '\u00A0',
    '\u1680',
    '\u180E',
    '\u2000',
    '\u2001',
    '\u2002',
    '\u2003',
    '\u2004',
    '\u2005',
    '\u2006',
    '\u2007',
    '\u2008',
    '\u2009',
    '\u200A',
    '\u2028',
    '\u2029',
    '\u202F',
    '\u205F',
    '\u3000',
]

export { escapeRegExp } from './../string/index.js'
