import { isEmpty } from 'ramda'
import { trimCharacters, batchTrimCharacters } from './_trimCharacters.js'
import {
    isNotUndefined,
    isArray,
    isString,
} from './../typeguard/utility.typeguards.js'
import type { TrimCharacters, BaseValue, BatchBaseValue } from './type.js'
import { Pattern } from './type.js'

//todo: fix these mangled chars
export const transformExplodeArray = function ({
    value,
    delimiter = ',',
    trim = undefined,
    prefix = undefined,
}: BatchBaseValue & {
    delimiter?: string | RegExp
    trim?: (TrimCharacters & { pattern: string | string[] }) | undefined
    prefix?: string | undefined
}): string | Array<string> {
    if (isEmpty(value)) return []
    //if it is an array already,delimiter is disregarded & array is just cleaned & prefixed.
    //the only case for delimiter being undefined is if value as an array
    let result: string[] = isArray<string[]>(value)
        ? value
        : isString(value) && isNotUndefined<string>(delimiter)
          ? value.split(delimiter)
          : [value]

    if (isNotUndefined<TrimCharacters>(trim)) {
        const patternTrim = trim

        const newObj: BatchBaseValue & {
            pattern: string | string[]
        } & TrimCharacters = {
            value: result,
            ...trim,
            //  pattern: "ddfdf"
        }
        result = batchTrimCharacters(newObj).filter((_str) =>
            _str.length > 2 ? true : false,
        )
    }

    if (isNotUndefined<string>(prefix)) {
        const cleaned_prefix = trimCharacters({
            value: prefix,
            pattern: TRIM_CHARS_DEFAULT,
        })
        result = result.map((_str) => `${cleaned_prefix}${_str}`)
    }
    return result.length === 1 && isNotUndefined<string>(result[0])
        ? result[0]
        : result
}

const TRIM_CHARS_DEFAULT = ['.', "'", '"', ' ', '-', '[', ']', '(', ')'] ///stuff to trim from css classes.
const DEFAULT_EXPLODE_REGEX = new RegExp(/[ ,]/g) /// default splitter by class
///this splits a string of windicss classes.
export const explodeCSSClassString = ({
    value,
    delimiter = DEFAULT_EXPLODE_REGEX,
    trim = { pattern: TRIM_CHARS_DEFAULT },
    prefix = undefined,
}: Parameters<typeof transformExplodeArray>[0]): string | string[] =>
    transformExplodeArray({ value, delimiter, trim, prefix })

export default transformExplodeArray
