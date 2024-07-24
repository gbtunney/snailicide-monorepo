import { ensureArray, isString, replaceAll } from 'ramda-adjunct'

import type {
    BaseValue,
    BatchBaseValue,
    Pattern,
    ReplaceCharacters,
} from './type.js'

const replaceCharactersSinglePattern = ({
    pattern = ' ',
    replacement = '',
    value,
}: BaseValue & {
    pattern: Pattern
} & ReplaceCharacters): string => replaceAll(pattern, replacement, value)
/**
 * @function replaceAllCharacters
 * @param {string} value - Single value
 * @param {string | RegExp | string[] | RegExp[]} pattern - Blacklisted chars
 * @param {string} replacement [""] - empty string or string with new characters
 * @returns {string}
 * @see batchReplaceAll
 */
export const replaceAllCharacters = ({
    pattern = ' ',
    replacement = '',
    value,
}: BaseValue & {
    pattern: Pattern | Array<Pattern>
} & ReplaceCharacters): string => {
    return ensureArray(pattern).reduce<typeof value>(
        (accumulator: string, _pattern) =>
            replaceCharactersSinglePattern({
                pattern: _pattern,
                replacement,
                value: accumulator,
            }),
        value,
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
    pattern = ' ',
    replacement = '',
    value,
}: BatchBaseValue & {
    pattern: Pattern | Array<Pattern>
} & ReplaceCharacters): string | Array<string> => {
    const _value = isString(value) ? ensureArray(value) : value //already an array

    const result = _value.map((single_value) => {
        return replaceAllCharacters({
            pattern,
            replacement,
            value: single_value,
        })
    })
    return isString(value) && result.length > 0 ? (result[0] as string) : result
}
export default replaceAllCharacters
