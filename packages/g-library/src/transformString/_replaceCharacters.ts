import * as RA from 'ramda-adjunct'
import type {
    ReplaceCharacters,
    ReplaceSinglePatternCharacters,
    TransformBatch,
} from './type'
import { tg } from './../index.js'

const replaceCharactersSinglePattern = ({
    value,
    pattern = ' ',
    replacement = '',
}: ReplaceSinglePatternCharacters): string =>
    RA.replaceAll(pattern, replacement, value)

/* * Function replaceAllCharacters * * * *
 * @param { string } - single value
 * @param { string | RegExp | (string | RegExp)[] }  [d=" "] pattern - (blacklist)
 * @param {string} [d=""] replacement -empty string or string with new characters
 * @return { string } - trimmed value */
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

/* * Function batchReplaceAll * * * * TODO: NEEDS UPDATE!!!
 * @param { string | string[] } - array of strings to be replaced.
 * @param { string | RegExp | (string | RegExp)[] }  [d=" "] - pattern (blacklist )
 * @param {string} [d=""] replacement -empty string or string with new characters
 * @return { string } - array of trimmed strings.  */
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
