import { ensureArray } from 'ramda-adjunct'
import { isStringValidRegExp } from './validators.js'
import { escapeStringRegexp } from './escape.js'

export const stringToRegexp = (
    value: string,
    escape: boolean = false,
): RegExp | undefined => {
    if (escape) {
        return isStringValidRegExp(escapeStringRegexp(value))
            ? new RegExp(escapeStringRegexp(value))
            : undefined
    } else return isStringValidRegExp(value) ? new RegExp(value) : undefined

    return undefined
}

/**
 * StringListToRegexp Turn a string or strings into a regexp with an |
 *
 * @param {string | string[]} value - String or Array of Strings to be converted
 *   to RegExp, all characters will be escaped
 * @param {Flag} Flag - Regexp flag (like g,m)
 * @returns {RegExp} -
 */
export const stringListToRegexp = (
    _value: string | string[],
    flag: Flag | Flag[] | undefined = 'global',
): RegExp => {
    return new RegExp(stringListJoinRegexp(_value), mapFlags(flag))
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
    return new RegExp(`^${stringListJoinRegexp(_value)}`, mapFlags(flag))
}

/**
 * @function getRegExpMatchEndOfString
 * @see getRegExpMatchStartOfString
 */
export const getRegExpEndOfString = (
    _value: string | string[],
    flag: Flag | Flag[] | undefined = 'global',
): RegExp => {
    return new RegExp(`${stringListJoinRegexp(_value)}$`, mapFlags(flag))
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

const stringListJoinRegexp = (_value: string | string[]): string => {
    const value: string[] = ensureArray(_value)
    const escaped: string[] = value.map((str: string) =>
        escapeStringRegexp(str),
    )
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
