import * as _lookup from './dictionary.js'
import { escapeStringRegexp } from './escape.js'
import {
    getRegExpEndOfString,
    getRegExpStartOfString,
    getRegExpTrim,
    stringListToRegexp,
    stringToRegexp,
} from './stringToRegexp.js'
import { isStringValidRegExp, isValidRegExp } from './validators.js'

const _match = 'String'.match
export type RegExpMatchArray = ReturnType<typeof _match>
export const lookup: typeof _lookup = _lookup

/**
 * Return a file extension if it is within the character count
 *
 * @function fileExtension
 * @param {number} [min=2] - Minimum characters in the file extension. Default
 *   is `2`
 * @param {number} [max=8] - Minimum characters in the file extension. Default
 *   is `8`
 * @returns {RegExp}
 */

export const fileExtension = (min: number = 2, max: number = 8) =>
    new RegExp(`.[a-z]{${min},${max}$`)

/* TODO: finish
export const joinRegexList = (_value: (string ) | (string )[]): RegExp|undefined => {
    const value: (string )[] = ensureArray(_value)

    if ( value.length ===  value.filter((_innerValue)=>isStringValidRegExp(_innerValue) ).length){
        const result :RegExp[]= value
            .map((_innerValue)  : RegExp|undefined=> getStringRegExp(_innerValue))
            .reduce<RegExp[]>((acc,value) => {
                return   ( value !== undefined ) ? [...acc,value ]:[...acc]
            }, [])

        const _str =  result.map( ( _inner): string=>{
            return _inner.toString()
        }).join('|')
        return  ( isRawStringValidRegExp(_str) )? new RegExp( _str):undefined

    }

    return undefined
}*/

export const regexp = {
    escapeStringRegexp,
    stringToRegexp,
    stringListToRegexp,
    getRegExpStartOfString,
    getRegExpEndOfString,
    getRegExpTrim,
    isStringValidRegExp,
    isValidRegExp,
    fileExtension,
    lookup: _lookup,
}
export default regexp
