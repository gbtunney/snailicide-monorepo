/**
 * @module Numeric
 * @author Gillian Tunney collection of utilities for numeric values and
 *   converting values between float & integer.All functions WILL REMOVE ALL
 *   whitespace. The final value a valid number
 * @category Numeric
 * @see parseInt, parseFloat built in js functions
 */
import type { Float, Integer } from 'type-fest'
import {
    isFinite,
    isFloat,
    isInteger,
    isNotNaN,
    isValidNumber,
} from 'ramda-adjunct'

export type Numeric = bigint | number
/* * @typedef {Numeric} * */

export type PossibleNumeric = number | bigint | string
/* * @typedef {PossibleNumeric} * */

/**
 * Guard function to determine if value is numeric
 *
 * @category Numeric
 * @category TypeGuard
 * @template {PossibleNumeric} Type - Must extend PossibleNumeric
 * @function isNumeric
 * @param {Type} value - Value to test
 * @returns {boolean}
 */
export const isNumeric = <Type extends PossibleNumeric>(
    value: unknown,
): value is Type => {
    return (
        isNotNaN(Number(Number.parseFloat(String(value)))) &&
        isFinite(Number(value))
    )
}
/**
 * Guard function to determine if value is an exact float (ie not 12 or 12.00)
 *
 * @category Numeric
 * @category TypeGuard
 * @example
 *     const number_to_test = 22.25
 *     isNumericFloat<typeof number_to_test, true>(number_to_test)
 *     => true
 *
 * @template {number} Type - Must extend number
 * @function isNumericFloat
 * @param {Type} value - Value to test
 * @returns {boolean}
 */
export const isNumericFloat = <Type extends number>(
    value: Type,
): value is Type => {
    return isFloat(value)
}

/**
 * Guard function to determine if value is an exact integer (ie not 12.001 but
 * 12.00 is allowed)
 *
 * @category Numeric
 * @category TypeGuard
 * @example
 *     const number_to_test_int = 22.000
 *     isNumericInteger(number_to_test_int)
 *     => true
 *
 * @template {number} Type - Must extend number
 * @function isNumericInteger
 * @param {Type} value - Value to test
 * @returns {boolean}
 */
export const isNumericInteger = <Type extends number>(
    value: Type,
): value is Type => {
    return isInteger(value)
}
/**
 * Converts a valid number to a float
 *
 * @category Numeric
 * @example
 *     const number_to_test = 22.2002
 *     numericToFloat<typeof number_to_test, true>(number_to_test)
 *     => 22.2002
 *
 * @template {number} Type - Type must extend number
 * @template {boolean} strict [false]-enables strict typing of value using
 *   Float<Type>
 * @function numericToFloat
 * @param {Type | Float<Type>} value - Value to test
 * @returns {number | undefined}
 */
export const numericToFloat = <Type extends number>(
    value: Type,
): number | undefined => {
    return isValidNumber(value) ? parseFloat(value.toString()) : undefined
}
/**
 * Converts a integer number to a exact Integer using parseInt (ie not 12.001
 * but 12.00 is allowed)
 *
 * @category Numeric
 * @example
 *     const number_to_test_int = 22.000
 *     numericToInteger<typeof number_to_test_int, true>(number_to_test_int)
 *     => 22
 *
 * @template {number} Type - Must extend number
 * @template {boolean} strict [d=false] - enables strict typing of value
 *   parameter using Integer<Type>
 * @function numericToInt
 * @param {Type | Integer<Type>} value - Value to test
 * @returns {number | undefined}
 */
export const numericToInteger = <Type extends number, strict = false>(
    value: strict extends true ? Integer<Type> : Type,
): number | undefined => {
    return isInteger(value) ? parseInt(value.toString()) : undefined
}
