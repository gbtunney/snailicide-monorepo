import { Numeric, PossibleNumeric } from './numeric.js'
import { toStringNumeric } from './transform.js'
import { isStringNumeric } from './validators.js'
import {
    isBigInt,
    isNumber,
    isString,
} from '../typeguard/utility.typeguards.js'
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

export const parseToNumeric = <Type extends PossibleNumeric>(
    value: Type,
): Numeric | undefined => {
    //|| isNumber(value)
    if (isBigInt<bigint>(value) || isNumber<number>(value)) return value
    if (isString(value)) {
        return parseStringToNumeric(value)
    }
    return undefined
}

/**
 * Parse value if is numeric ( like result of parseFloat ). Will remove
 * whitespace,letter and punctuation
 *
 * @category Parse
 * @template {PossibleNumeric} Type - Type must extend a PossibleNumeric
 *   (number|string|bigint)
 * @function parseToNumeric
 * @param {T} value - A value that will need to be replaced soon
 * @returns {number | undefined} - Parsed value
 */
export const parseStringToNumeric = <Type extends string>(
    value: Type,
): Numeric | undefined => {
    return toStringNumeric(value, false)
}

export const parseStringToInteger = <Type extends string>(
    value: Type,
): number | undefined => {
    if (isStringNumeric<Type>(value, false)) {
        const result = toStringNumeric(value, false)
        return result !== undefined && isNumber<number>(result)
            ? Math.round(result)
            : undefined
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
