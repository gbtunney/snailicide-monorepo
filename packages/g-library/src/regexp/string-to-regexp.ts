import { ensureArray } from 'ramda-adjunct'

import type { ValueOf } from 'type-fest'
import { escapeStringRegexp } from './escape.js'
import { isStringValidRegExp } from './validators.js'
import { isArray, isRegExp } from '../typeguard/utility.typeguards'

/**
 * Converts a string to a regular expression.
 * @param value - The string value to convert.
 * @param escape - Indicates whether to escape special characters in the string. Default is false.
 * @param flag - The flag(s) to apply to the regular expression. Default is 'global'.
 * @returns The converted regular expression or undefined if the conversion fails.
 */
export const stringToRegexp = (
    value: string,
    escape: boolean = false,
    flag: Flag | Array<Flag> | undefined = 'global',
): RegExp | undefined => {
    if (escape) {
        return isStringValidRegExp(escapeStringRegexp(value))
            ? new RegExp(escapeStringRegexp(value), mapFlags(flag))
            : undefined
    } else
        return isStringValidRegExp(value)
            ? new RegExp(value, mapFlags(flag))
            : undefined
}

/**
 * Turn a string or strings into a regexp concatinated with a with an |
 * @param flag - Regexp flag (like g,m)
 * @returns - A joined list
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
 * @see {@link getRegExpEndOfString}
 */
export const getRegExpStartOfString = (
    _value: RegExp | string | Array<string>,
    flag: Flag | Array<Flag> | undefined = 'global',
): RegExp => {
    return isRegExp(_value)
        ? new RegExp(`^${_value.source}`, mapFlags(flag))
        : isArray<Array<string>>(_value)
          ? new RegExp(`^${stringListJoinRegexp(_value, true)}`, mapFlags(flag))
          : new RegExp(`^${stringListJoinRegexp(_value)}`, mapFlags(flag))
}

/**
 * Turn a string or strings into a regexp that checks the end
 * @see {@link getRegExpStartOfString}
 */
export const getRegExpEndOfString = (
    _value: RegExp | string | Array<string>,
    flag: Flag | Array<Flag> | undefined = 'global',
): RegExp => {
    return isRegExp(_value)
        ? new RegExp(`${_value.source}$`, mapFlags(flag))
        : isArray<Array<string>>(_value)
          ? new RegExp(`${stringListJoinRegexp(_value, true)}$`, mapFlags(flag))
          : new RegExp(`${stringListJoinRegexp(_value)}$`, mapFlags(flag))
}

const stringListJoinRegexp = (
    _value: string | Array<string>,
    useParenthesis: boolean = false,
): string => {
    const value: Array<string> = ensureArray(_value)
    const escaped: Array<string> = value.map((str: string) =>
        escapeStringRegexp(str),
    )
    return useParenthesis ? `(${escaped.join('|')})` : escaped.join('|')
}
export const flagMap = {
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
