import { ensureArray } from 'ramda-adjunct'

import type { ValueOf } from 'type-fest'
import { escapeStringRegexp } from './escape.js'
import { isStringValidRegExp } from './validators.js'
export const stringToRegexp = (
    value: string,
    escape: boolean = false,
): RegExp | undefined => {
    if (escape) {
        return isStringValidRegExp(escapeStringRegexp(value))
            ? new RegExp(escapeStringRegexp(value))
            : undefined
    } else return isStringValidRegExp(value) ? new RegExp(value) : undefined
}

/**
 * StringListToRegexp Turn a string or strings into a regexp with an |
 *
 * @param {Flag} flag - Regexp flag (like g,m)
 * @returns {RegExp} - A joined list
 */
export const stringListToRegexp = (
    _value: string | Array<string>,
    flag: Flag | Array<Flag> | undefined = 'global',
): RegExp => {
    return new RegExp(stringListJoinRegexp(_value), mapFlags(flag))
}

/** Turn a string or strings into a regexp to trim the start and finish */
export const getRegExpTrim = (
    _value: string | Array<string>,
    flag: Flag | Array<Flag> | undefined = 'global',
): RegExp => {
    const start = getRegExpStartOfString(_value, flag).source.toString()
    const end = getRegExpEndOfString(_value, flag).source.toString()
    const value: string = `${start}}${end}`
    return new RegExp(value, mapFlags(flag))
}

/**
 * Turn a string or strings into a regexp that checks the start
 *
 * @see {@link getRegExpEndOfString}
 */
export const getRegExpStartOfString = (
    _value: string | Array<string>,
    flag: Flag | Array<Flag> | undefined = 'global',
): RegExp => {
    return new RegExp(`^${stringListJoinRegexp(_value)}`, mapFlags(flag))
}

/**
 * Turn a string or strings into a regexp that checks the end
 *
 * @see {@link getRegExpStartOfString}
 */
export const getRegExpEndOfString = (
    _value: string | Array<string>,
    flag: Flag | Array<Flag> | undefined = 'global',
): RegExp => {
    return new RegExp(`${stringListJoinRegexp(_value)}$`, mapFlags(flag))
}

const stringListJoinRegexp = (_value: string | Array<string>): string => {
    const value: Array<string> = ensureArray(_value)
    const escaped: Array<string> = value.map((str: string) =>
        escapeStringRegexp(str),
    )
    return escaped.join('|')
}
const flagMap = {
    dotAll: 's',

    global: 'g',
    ignoreCase: 'i',
    multiline: 'm',
    sticky: 'y',
    unicode: 'u',
} as const

export type Flag = keyof typeof flagMap
export type FlagAlias = ValueOf<typeof flagMap>

const mapFlags = (
    flags: Flag | FlagAlias | Array<FlagAlias | Flag> | undefined = undefined,
): string => {
    if (flags === undefined) return ''
    else {
        const flagArr = ensureArray(flags).map((value: Flag | FlagAlias) => {
            // @ts-expect-error: this is an ongoing issue i keep having TODO: find solution
            if (flagMap[value] !== undefined) return flagMap[value]
            const _foundAlias: ValueOf<typeof flagMap> | undefined = Array.from(
                Object.values(flagMap),
            ).find((flagAliases: string) => value)
            if (_foundAlias !== undefined) {
                return _foundAlias
            }

            return ''
        })
        return flagArr.join('')
    }
}
