import { isEmpty } from 'ramda'

import {
    isArray,
    isNotUndefined,
    isString,
} from './../typeguard/utility.typeguards.js'
import { batchTrimCharacters, trimCharacters } from './trim-characters.js'
import type { BatchBaseValue, TrimCharacters } from './type.js'

//todo: fix these mangled chars
export const transformExplodeArray = function ({
    delimiter = ',',
    prefix = undefined,
    trim = undefined,
    value,
}: BatchBaseValue & {
    delimiter?: string | RegExp
    trim?: (TrimCharacters & { pattern: string | Array<string> }) | undefined
    prefix?: string | undefined
}): string | Array<string> {
    if (isEmpty(value)) return []
    //if it is an array already,delimiter is disregarded & array is just cleaned & prefixed.
    //the only case for delimiter being undefined is if value as an array
    let result: Array<string> = isArray<Array<string>>(value)
        ? value
        : isString(value) && isNotUndefined<string>(delimiter)
          ? value.split(delimiter)
          : [value]

    if (isNotUndefined<TrimCharacters>(trim)) {
        const patternTrim = trim

        const newObj: BatchBaseValue & {
            pattern: string | Array<string>
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
            pattern: TRIM_CHARS_DEFAULT,
            value: prefix,
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
    delimiter = DEFAULT_EXPLODE_REGEX,
    prefix = undefined,
    trim = { pattern: TRIM_CHARS_DEFAULT },
    value,
}: Parameters<typeof transformExplodeArray>[0]): string | Array<string> =>
    transformExplodeArray({ delimiter, prefix, trim, value })

export default transformExplodeArray
