import * as RA from 'ramda-adjunct'
import type {
    ReplaceCharacters,
    ReplaceSinglePatternCharacters,
    TransformBatch,
} from './type.js'
import { tg } from './../index.js'

const replaceCharactersSinglePattern = ({
    value,
    pattern = ' ',
    replacement = '',
}: ReplaceSinglePatternCharacters): string =>
    RA.replaceAll(pattern, replacement, value)
/**
 * @function replaceAllCharacters
 * @param {string} value - Single value
 * @param {string | RegExp | string[] | RegExp[]} pattern - Blacklisted chars
 * @param {string} replacement [""] - empty string or string with new characters
 * @returns {string}
 * @see batchReplaceAll
 */
export const replaceAllCharacters = ({
    value,
    pattern = ' ',
    replacement = '',
}: ReplaceCharacters): string => {
    return RA.ensureArray(pattern).reduce<typeof value>(
        (accumulator: string, _pattern) =>
            replaceCharactersSinglePattern({
                pattern: _pattern,
                value: accumulator,
                replacement,
            }),
        value
    )
}
//TODO: NEEDS UPDATE!!!
/**
 * @function batchReplaceAll
 * @param {string | string[]} - Array of strings to be replaced.
 * @param {string | RegExp | string[] | RegExp[]} pattern [" "] - blacklisted
 *   chars
 * @param {string} replacement [ ""] - empty string or string with newcharacters
 * @returns {string} - Array of trimmed strings.
 * @see replaceAllCharacters
 */
export const batchReplaceAll = ({
    value,
    pattern = ' ',
    replacement = '',
}: TransformBatch<ReplaceCharacters>): string | string[] => {
    const _value = RA.isString(value) ? RA.ensureArray(value) : value //already an array

    const result = _value.map((single_value) => {
        return replaceAllCharacters({
            value: single_value,
            pattern,
            replacement,
        })
    })
    return RA.isString(value) && tg.isNonEmptyArray<string>(result)
        ? (result[0] as string)
        : result
}
export default replaceAllCharacters
