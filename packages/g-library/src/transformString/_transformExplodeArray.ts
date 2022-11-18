import * as RA from 'ramda-adjunct'
import { isEmpty } from 'ramda'
import { trimCharacters, batchTrimCharacters } from './_trimCharacters.js'
import { tg } from './../index.js'
import type { ExplodeArray } from './type.js'

export const transformExplodeArray = function ({
    value,
    delimiter = ',',
    trim = undefined,
    prefix = undefined,
}: ExplodeArray): Array<string> {
    if (isEmpty(value)) return []

    //if it is an array already,delimiter is disregarded & array is just cleaned & prefixed.
    let explodedStringArr = RA.isArray(value) ? value : value.toString()

    if (
        RA.isString(explodedStringArr) &&
        tg.isNotUndefined<string | RegExp>(delimiter)
    ) {
        explodedStringArr = explodedStringArr.split(delimiter)
    }

    if (
        tg.isNotUndefined(trim) &&
        RA.isArray(explodedStringArr) &&
        RA.isNonEmptyArray(explodedStringArr)
    ) {
        explodedStringArr = (
            batchTrimCharacters({
                ...trim,
                value: explodedStringArr, //merge with exploded arr.
            }) as string[]
        ).filter((_str) => (_str.length > 2 ? true : false))
    }
    if (
        tg.isNotUndefined<string>(prefix) &&
        RA.isArray(explodedStringArr) &&
        RA.isNonEmptyArray(explodedStringArr)
    ) {
        const cleaned_prefix = trimCharacters({
            value: prefix,
            pattern: TRIM_CHARS_DEFAULT,
        })
        explodedStringArr = explodedStringArr.map(
            (_str) => `${cleaned_prefix}${_str}`
        )
    }
    return RA.ensureArray(explodedStringArr) //bc the type errors otherwise
}

const TRIM_CHARS_DEFAULT = ['.', "'", '"', ' ', '-', '[', ']', '(', ')'] ///stuff to trim from css classes.
const DEFAULT_EXPLODE_REGEX = new RegExp(/[ ,]/g) /// default splitter by class
///this splits a string of windicss classes.
export const explodeCSSClassString = ({
    value,
    prefix = undefined,
    delimiter = DEFAULT_EXPLODE_REGEX,
    trim = { pattern: TRIM_CHARS_DEFAULT },
}: ExplodeArray): string[] =>
    transformExplodeArray({ value, prefix, delimiter, trim })

export default transformExplodeArray

/*.
OLD STUFFF. . ,
map(function (item) {
  return prefix ? `${prefix}${delimiter}${item}` : item;
}).filter(function (_item) {
  return (isInteger(_item)
      || RA.isInteger(_item)
      || (RA.isString(_item)
          && _item.length > 2));
}*/
