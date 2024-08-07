import { pipe, replace as ramda_replace } from 'ramda'
import { ensureArray, trimCharsEnd, trimCharsStart } from 'ramda-adjunct'

import type { BaseValue, BatchBaseValue, TrimCharacters } from './type.js'
import {
    getRegExpEndOfString,
    getRegExpStartOfString,
} from '../regexp/string-to-regexp.js'

/**
 * Trims characters from the start and/or end of a string based on the provided
 * pattern(s). If multiple patterns are provided, each pattern is applied in
 * sequence.
 *
 * @template {BaseValue & { pattern: string | string[] } & TrimCharacters} Type
 *   - Type must
 *
 * @function trimCharacters
 * @namespace StringUtils
 * @param {Type} params
 *
 *   - The parameters object.
 *
 * @param {string} params.value - The string to be trimmed.
 * @param {string | string[]} [params.pattern=' '] - The pattern(s) to trim from
 *   the string. Can be a single string or an array of strings. Default is `'
 *   '`. Default is `' '`
 * @param {boolean} [params.trimStart=true] - Whether to trim characters from
 *   the start of the string. Default is `true`
 * @param {boolean} [params.trimEnd=true] - Whether to trim characters from the
 *   end of the string. Default is `true`
 * @returns {string} The trimmed string.
 */
export const trimCharacters = ({
    doTrimEnd = true,
    doTrimStart = true,
    pattern = ' ',
    value,
}: BaseValue & {
    pattern: string | Array<string>
} & TrimCharacters): string => {
    if (!doTrimStart && !doTrimEnd) return value
    const patterns = ensureArray(pattern)
    return patterns.reduce<string>((accumulator, pattern_single) => {
        return trimCharactersforSinglePattern({
            doTrimEnd,
            doTrimStart,
            pattern: pattern_single,
            value: accumulator,
        })
    }, value)
}

/**
 * Applies the trimCharacters function to each string in an array or a single
 * string. This function allows for batch processing of multiple strings with
 * the same trimming parameters.
 *
 * @template {BaseValue & { pattern: string | string[] } & TrimCharacters} Type
 *   - Type must
 *
 * @function batchTrimCharacters
 * @namespace StringUtils
 * @param {Type} params
 *
 *   - The parameters object.
 *
 * @param {string | string[]} params.value - The string(s) to be trimmed. Can be
 *   a single string or an array of strings.
 * @param {string | string[]} [params.pattern=' '] - The pattern(s) to trim from
 *   the string(s). Can be a single string or an array of strings. Default is `'
 *   '`. Default is `' '`
 * @param {boolean} [params.doTrimStart=true] - Whether to trim characters from
 *   the start of the string(s). Default is `true`
 * @param {boolean} [params.doTrimEnd=true] - Whether to trim characters from
 *   the end of the string(s). Default is `true`
 * @returns {string[]} An array of trimmed strings.
 */
export const batchTrimCharacters = ({
    doTrimEnd = true,
    doTrimStart = true,
    pattern = ' ',
    value,
}: BatchBaseValue & {
    pattern: string | Array<string> //this is different.
} & TrimCharacters): Array<string> => {
    const _value = ensureArray(value)

    return _value.map((single_value) => {
        return trimCharacters({
            doTrimEnd,
            doTrimStart,
            pattern,
            value: single_value,
        })
    })
}

/**
 * Trims characters from the start of a string based on the provided pattern(s).
 * This is a convenience function specifically for trimming the start of a
 * string.
 *
 * @template {BaseValue & { pattern: string | string[] } & TrimCharacters} Type
 *   - Type must
 *
 * @function trimCharactersStart
 * @namespace StringUtils
 * @param {Type} params - The parameters object.
 * @param {string} params.value - The string to be trimmed.
 * @param {string | string[]} [params.pattern=' '] - The pattern(s) to trim from
 *   the start of the string. Can be a single string or an array of strings.
 *   Default is `' '`
 * @returns {string} The string with characters trimmed from the start.
 */
export const trimCharactersStart = ({
    pattern = ' ',
    value,
}: BaseValue & {
    pattern: string | Array<string>
}): string => {
    return trimCharacters({
        doTrimEnd: false,
        doTrimStart: true,
        pattern,
        value,
    })
}

/**
 * Trims characters from the end of a string based on the provided pattern(s).
 * This is a convenience function specifically for trimming the end of a
 * string.
 *
 * @template {BaseValue & { pattern: string | string[] } & TrimCharacters} Type
 *   - Type must
 *
 * @function trimCharactersEnd
 * @namespace StringUtils
 * @param {Type} params - The parameters object.
 * @param {string} params.value - The string to be trimmed.
 * @param {string | string[]} [params.pattern=' '] - The pattern(s) to trim from
 *   the end of the string. Can be a single string or an array of strings.
 *   Default is `' '`
 * @returns {string} The string with characters trimmed from the end.
 */
export const trimCharactersEnd = ({
    pattern = ' ',
    value,
}: BaseValue & {
    pattern: string | Array<string>
}): string => {
    return trimCharacters({
        doTrimEnd: true,
        doTrimStart: false,
        pattern,
        value,
    })
}

const trimCharactersforSinglePattern = function ({
    doTrimEnd = true,
    doTrimStart = true,
    pattern = ' ',
    value,
}: BaseValue & {
    pattern: string //this is different.
} & TrimCharacters): string {
    if (!doTrimStart && !doTrimEnd) return value
    return [
        ...(doTrimStart
            ? [
                  ///if the pattern string is longer than 1 character, use ramda replace instead
                  pattern.length > 1
                      ? ramda_replace(getRegExpStartOfString(pattern), '')
                      : trimCharsStart(pattern),
              ]
            : []),
        ...(doTrimEnd
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
