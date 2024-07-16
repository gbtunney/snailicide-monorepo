//import * as RA from 'ramda-adjunct'
import { pipe, replace as ramda_replace } from 'ramda'
import { ensureArray, trimCharsEnd, trimCharsStart } from 'ramda-adjunct'

import {
    getRegExpEndOfString,
    getRegExpStartOfString,
} from './../regexp/stringToRegexp.js'
import type { BaseValue, BatchBaseValue, TrimCharacters } from './type.js'

const trimCharactersforSinglePattern = function ({
    value,
    pattern = ' ',
    trimStart = true,
    trimEnd = true,
}: BaseValue & {
    pattern: string //this is different.
} & TrimCharacters): string {
    if (!trimStart && !trimEnd) return value
    return [
        ...(trimStart
            ? [
                  ///if the pattern string is longer than 1 character, use ramda replace instead
                  pattern.length > 1
                      ? ramda_replace(getRegExpStartOfString(pattern), '')
                      : trimCharsStart(pattern),
              ]
            : []),
        ...(trimEnd
            ? [
                  pattern.length > 1
                      ? ramda_replace(getRegExpEndOfString(pattern), '')
                      : trimCharsEnd(pattern),
              ]
            : []),
    ].reduce((accumulator: string, func) => {
        return pipe(func)(accumulator)
    }, value)
}

//NOTES -   end of line. /gi$/g    start of line. /^gi/g
//R.replace(new RegExp( '^gi' ,'g' ) ,"","gillian"
export const trimCharacters = ({
    value,
    pattern = ' ',
    trimStart = true,
    trimEnd = true,
}: BaseValue & {
    pattern: string | string[]
} & TrimCharacters): string => {
    if (!trimStart && !trimEnd) return value
    const patterns = ensureArray(pattern)
    return patterns.reduce<string>((accumulator, pattern_single) => {
        return trimCharactersforSinglePattern({
            value: accumulator,
            pattern: pattern_single,
            trimStart,
            trimEnd,
        })
    }, value)
}

export const batchTrimCharacters = ({
    value,
    pattern = ' ',
    trimStart = true,
    trimEnd = true,
}: BatchBaseValue & {
    pattern: string | string[] //this is different.
} & TrimCharacters): string[] => {
    const _value = ensureArray(value)

    return _value.map((single_value) => {
        return trimCharacters({
            value: single_value,
            pattern,
            trimStart,
            trimEnd,
        })
    })
}

export const trimCharactersStart = ({
    value,
    pattern = ' ',
}: BaseValue & {
    pattern: string | string[]
}): string => {
    return trimCharacters({
        value,
        pattern,
        trimStart: true,
        trimEnd: false,
    })
}
export const trimCharactersEnd = ({
    value,
    pattern = ' ',
}: BaseValue & {
    pattern: string | string[]
}): string => {
    return trimCharacters({
        value,
        pattern,
        trimStart: false,
        trimEnd: true,
    })
}
