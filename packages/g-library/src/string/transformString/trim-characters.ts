import { pipe, replace as ramda_replace } from 'ramda'
import { ensureArray, trimCharsEnd, trimCharsStart } from 'ramda-adjunct'

import type { BaseValue, BatchBaseValue, TrimCharacters } from './type.js'
import {
    getRegExpEndOfString,
    getRegExpStartOfString,
} from '../../regexp/string-to-regexp.js'

/**
 * Trims characters from the start and/or end of a string based on the provided pattern(s). If multiple patterns are
 * provided, each pattern is applied in sequence.
 * @category Trim
 * @see {@link batchTrimCharacters}
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
 * Applies the trimCharacters function to each string in an array or a single string. This function allows for batch
 * processing of multiple strings with the same trimming parameters.
 * @category Trim
 * @see {@link trimCharacters}
 */
export const batchTrimCharacters = ({
    doTrimEnd = true,
    doTrimStart = true,
    pattern = ' ',
    value,
}: BatchBaseValue & {
    /** This is different. */
    pattern: string | Array<string>
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
 * Trims characters from the start of a string based on the provided pattern(s). This is a convenience function
 * specifically for trimming the start of a string.
 * @category Trim
 * @see {@link trimCharacters}
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
 * Trims characters from the end of a string based on the provided pattern(s). This is a convenience function
 * specifically for trimming the end of a string.
 * @category Trim
 * @see {@link trimCharacters}
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
    /** This is different. */
    pattern: string
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
