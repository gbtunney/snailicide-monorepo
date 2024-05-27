//import * as RA from 'ramda-adjunct'
import {
    ensureArray,
    isString,
    isRegExp,
    trimCharsStart,
    trimCharsEnd,
} from 'ramda-adjunct'

import { pipe, replace as ramda_replace } from 'ramda'
import type {
    TrimCharacters,
    TrimSinglePatternCharacters,
    TransformBatch,
} from './type.js'
import { isNonEmptyArray } from './../typeguard/utility.typeguards.js'
import {
    getRegExpStartOfString,
    getRegExpEndOfString,
} from './../regexp/index.js'

const trimCharactersforSinglePattern = function ({
    value,
    pattern = ' ',
    trimStart = true,
    trimEnd = true,
}: TrimSinglePatternCharacters): string {
    if (!trimStart && !trimEnd) return value
    if (isString(pattern)) {
        return [
            ...(trimStart
                ? [
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
    } else if (isRegExp(pattern)) return ramda_replace(pattern, '')(value)
    else return value
}

//NOTES -   end of line. /gi$/g    start of line. /^gi/g
//R.replace(new RegExp( '^gi' ,'g' ) ,"","gillian"
export const trimCharacters = ({
    value,
    pattern = ' ',
    trimStart = true,
    trimEnd = true,
}: TrimCharacters): string => {
    if (!trimStart && !trimEnd) return value
    return ensureArray(pattern).reduce<typeof value>(
        (accumulator: string, pattern_single: RegExp | string) => {
            return trimCharactersforSinglePattern({
                value: accumulator,
                pattern: pattern_single,
                trimStart,
                trimEnd,
            })
        },
        value,
    )
}

export const batchTrimCharacters = ({
    value,
    pattern = ' ',
    trimStart = true,
    trimEnd = true,
}: TransformBatch<TrimCharacters>): string | string[] => {
    const _value = isString(value) ? ensureArray(value) : value //already an array

    const result = _value.map((single_value) => {
        return trimCharacters({
            value: single_value,
            pattern,
            trimStart,
            trimEnd,
        })
    })
    return isString(value) && isNonEmptyArray<string>(result)
        ? (result[0] as string)
        : (result as string[])
}

export const trimCharactersStart = ({
    value,
    pattern = ' ',
}: TrimCharacters): string => {
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
}: TrimCharacters): string => {
    return trimCharacters({
        value,
        pattern,
        trimStart: false,
        trimEnd: true,
    })
}
