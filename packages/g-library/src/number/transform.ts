import { isBigInt, isFloat, isInteger, isValidNumber } from 'ramda-adjunct'
import { isNumeric, numericToInteger, numericToFloat } from './numeric.js'
import type { PossibleNumeric, Numeric } from './numeric.js'
/**
 * All functions will remove whitespace as long as the final value a valid
 * number
 *
 * WILL NOT: remove letter and punctuation characters like parseInt or
 * parseFloat
 *
 * @module Transform - this will convert a possible numeric value (ie string) to a number
 * @author Gillian Tunney
 * @category Transform
 */

/**
 * @category Transform
 * @template {PossibleNumeric} Type - Type must extend a PossibleNumeric
 *   (number|string|bigint)
 * @function toNumeric - Convert a value to a valid number type
 * @param {Type} value
 * @returns {Numeric | undefined} Valid number value
 * @see Float
 * @see Integer
 */
export const toNumeric = <Type extends PossibleNumeric>(
    value: Type
): Numeric | undefined => {
    if (isNumeric<Type>(value)) {
        if (isBigInt(value)) return BigInt(value)
        const val: number = parseFloat(value.toString())
        return isValidNumber(val) ? val : undefined
    }
    return undefined
}

/**
 * @category Transform
 * @template {number | string} Type
 * @function toFloat - Convert a value to an float. this must be exact float, ie
 *   not like 12
 * @param {Type} value
 * @returns {number | undefined} Valid number value
 * @see toNumeric -  for more specific details
 * @see numericToInt
 * @see parseToInt
 */
export const toFloat = <Type extends number | string>(
    value: Type
): number | undefined => {
    if (isNumeric<Type>(value) && !isBigInt(value)) {
        return toNumeric(value) !== undefined && isFloat(value)
            ? (numericToFloat(value) as number)
            : undefined
    } else return undefined
}

/**
 * @category Transform
 * @template {PossibleNumeric} Type - Type must extend a PossibleNumeric
 *   (number|string|bigint)
 * @function toInteger - Convert a value to an integer. this must be exact
 *   integer ie not 1.01
 * @param {Type} value
 * @returns {number | undefined} Valid number value
 * @see toNumeric -  for more specific details
 * @see numericToInt
 * @see parseToInt
 */
export const toInteger = <Type extends PossibleNumeric>(
    value: Type
): number | undefined => {
    if (isNumeric<Type>(value)) {
        if (isBigInt(value)) return undefined
        else {
            const _value = toNumeric<Type>(value)
            if (_value !== undefined && isInteger(_value))
                return numericToInteger(_value)
        }
    }
    return undefined
}
