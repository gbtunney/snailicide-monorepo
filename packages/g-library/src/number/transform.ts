import { isBigInt, isFloat, isInteger, isValidNumber } from 'ramda-adjunct'
import type { Numeric, PossibleNumeric } from './numeric.js'
import { isNumeric, numericToFloat, numericToInteger } from './numeric.js'

/**
 * Convert a value to a valid number type
 *
 * @category Transform
 * @template {PossibleNumeric} Type - Type must extend a
 *   PossibleNumeric(number|string|bigint)
 * @function toNumeric
 * @param {Type} value
 * @returns {Numeric | undefined} Valid number value
 * @see parseToNumeric
 * @see parseToInteger
 */
export const toNumeric = <Type extends PossibleNumeric>(
    value: Type,
): Numeric | undefined => {
    if (isNumeric<Type>(value)) {
        if (isBigInt(value)) return BigInt(value)
        const val: number = parseFloat(value.toString())
        return isValidNumber(val) ? val : undefined
    }
    return undefined
}

/**
 * Convert a value to an float. this must be exact float, not like 12
 *
 * @category Transform
 * @template {number | string} Type
 * @function toFloat
 * @param {Type} value
 * @returns {number | undefined} Valid number value
 * @see toNumeric -  for more specific details
 * @see numericToFloat
 * @see parseToFloat
 * @see toNumeric
 */
export const toFloat = <Type extends number | string>(
    value: Type,
): number | undefined => {
    if (isNumeric<Type>(value) && !isBigInt(value)) {
        return toNumeric(value) !== undefined && isFloat(value)
            ? (numericToFloat(value) as number)
            : undefined
    } else return undefined
}

/**
 * Convert a value to an integer. this must be exact integer ie not 1.01
 *
 * @category Transform
 * @template {PossibleNumeric} Type - Type must extend
 *   PossibleNumeric(number|string|bigint)
 * @function toInteger
 * @param {Type} value
 * @returns {number | undefined} Valid number value
 * @see toNumeric -  for more specific details
 * @see numericToInt
 * @see parseToInt
 * @see PossibleNumeric
 */
export const toInteger = <Type extends PossibleNumeric>(
    value: Type,
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
