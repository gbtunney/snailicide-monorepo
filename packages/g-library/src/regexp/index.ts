import * as _lookup from './dictionary.js'
import * as escape from './escape.js'
import * as helpers from './helpers.js'
import * as strToRegexp from './string-to-regexp.js'
import * as validators from './validators.js'

/* eslint  @typescript-eslint/unbound-method: "warn" */
const _match = String().match
export type RegExpMatchArray = ReturnType<typeof _match>
export const lookup: typeof _lookup = _lookup

/** Returns a file extension if it is within the character count */
export const fileExtension = (min: number = 2, max: number = 8): RegExp =>
    helpers.regExpCharacterCount(new RegExp('.[a-z]'))

/** @namespace */
export const regexp = {
    fileExtension,
    lookup: _lookup,
    ...escape,
    ...helpers,
    ...validators,
    ...strToRegexp,
}

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
