import {
    isBigInt,
    isInteger,
    isNaN,
    isString,
    isValidNumber,
} from 'ramda-adjunct'
import { PossibleNumeric } from './numeric.js'
/**
 * All functions WILL REMOVE ALL whitespace,letter and punctuation as long as
 * the final value a valid number This will convert a possible numeric value (ie
 * string) to a number (like built in parseInt or parseFloat)
 *
 * @module Parse
 * @author Gillian Tunney
 * @category Parse
 * @see parseInt, parseFloat built in js functions
 */

export type EmptyString = ''

/** @typedef {EmptyString} This Is an empty string */

/**
 * Guard function to determine if value is parsable (contains)
 *
 * @category Parse
 * @category TypeGuard
 * @template {unknown} Type
 * @function isParsableToNumeric
 * @param {Type} value - Value to test
 * @returns {boolean}
 */
export const isParsableToNumeric = <Type = unknown>(
    value: Type,
): value is Type extends PossibleNumeric ? Type : never => {
    //const regex = new RegExp(/(\?+1)([a-z]|[A-Z]|\$|!|@|#|%|&)+(\d)/ )
    if (isString(value) && /\d/.test(value) && value.toString().length > 0) {
        //if string and contains digits
        if (isNaN(Number(Number.parseFloat(String(value))))) return false
        else return true
    } else if (isBigInt(value) || isValidNumber(value)) return true
    return false
}

/**
 * Parse value if is numeric ( like result of parseFloat ). Will remove
 * whitespace,letter and punctuation
 *
 * @category Parse
 * @template {PossibleNumeric} Type - Type must extend a PossibleNumeric
 *   (number|string|bigint)
 * @function parseToNumeric
 * @param {Type} value - Value to parse
 * @returns {number | undefined}
 */
export const parseToNumeric = <Type extends PossibleNumeric>(
    value: Type,
): number | undefined => {
    if (isParsableToNumeric<Type>(value)) {
        const _value: number = parseFloat(value.toString())
        return isValidNumber(_value) ? _value : undefined
    }
    return undefined
}

/**
 * Parse value to Integer if isParseable to numeric. **Will** remove
 * whitespace,letter and punctuation along will additional float values ie 1.02
 * will become 1
 *
 * @category Parse
 * @template {PossibleNumeric} Type - Type must extend a PossibleNumeric
 *   (number|string|bigint)
 * @function parseToInteger
 * @param {Type} value - Value to parse.
 * @returns {number | undefined}
 */
export const parseToInteger = <Type extends PossibleNumeric>(
    value: Type,
): number | undefined => {
    if (isParsableToNumeric<Type>(value)) {
        const _value: number = parseInt(value.toString())
        return isInteger(_value) ? _value : undefined
    }
    return undefined
}

/**
 * @category Parse
 * @function parseToFloat
 * @alias {parseToNumeric}
 * @see {parseToNumeric}
 */
export const parseToFloat = parseToNumeric
