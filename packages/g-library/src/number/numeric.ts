import type { Float, Integer } from 'type-fest'
import {
    isFinite,
    isFloat,
    isInteger,
    isNotNaN,
    isValidNumber,
} from 'ramda-adjunct'
/**
 * All functions WILL REMOVE ALL whitespace,letter and punctuation as long as
 * the final value a valid number
 *
 * @module Numeric - utilities for numeric values and converting values betweeen float & integer
 * @author Gillian Tunney
 * @category Numeric
 * @see parseInt, parseFloat built in js functions
 */
export type Numeric = bigint | number
export type PossibleNumeric = number | bigint | string

/**
 * @category Numeric
 * @category TypeGuard
 * @template {unknown} Type
 * @function isParsableToNumeric - Guard function to determine if value is
 *   numeric
 * @param {Type} value - Value to test
 * @returns {boolean}
 */
export const isNumeric = <Type = unknown>(value: Type): value is Type => {
    return (
        isNotNaN(Number(Number.parseFloat(String(value)))) &&
        isFinite(Number(value))
    )
}

/**
 * @category Numeric
 * @category TypeGuard
 * @example
 *     const number_to_test = 22.25
 *     isNumericFloat<typeof number_to_test, true>(number_to_test)
 *     => true
 *
 * @template {number} Type - Must extend number
 * @template {boolean} strict [d=false] - enables strict typing of value
 *   parameter using Float<Type>
 * @function isNumericFloat - Guard function to determine if value is an exact
 *   float (ie not 12 or 12.00)
 * @param {Type | Float<Type>} value - Value to test
 * @returns {boolean}
 */
export const isNumericFloat = <Type extends number, strict = false>(
    value: strict extends true ? Float<Type> : Type
): value is Float<Type> => {
    return isFloat(value)
}

/**
 * @category Numeric
 * @category TypeGuard
 * @example
 *     const number_to_test_int = 22.000
 *     isNumericInteger<typeof number_to_test_int, true>(number_to_test_int)
 *     => true
 *
 * @template {number} Type - Must extend number
 * @template {boolean} strict [d=false] - enables strict typing of value
 *   parameter using Integer<Type>
 * @function isNumericInteger - Guard function to determine if value is an exact
 *   integer (ie not 12.001 but 12.00 is allowed)
 * @param {Type | Integer<Type>} value - Value to test
 * @returns {boolean}
 */
export const isNumericInteger = <Type extends number, strict = false>(
    value: strict extends true ? Integer<Type> : Type
): value is Integer<Type> => {
    return isInteger(value)
}

///todo: see if this is useful idk?
/**
 * @category Numeric
 * @example
 *     const number_to_test = 22.2002
 *     numericToFloat<typeof number_to_test, true>(number_to_test)
 *     => 22.2002
 *
 * @template {number} Type - Must extend number
 * @template {boolean} strict [d=false] - enables strict typing of value
 *   parameter using Float<Type>
 * @function numericToFloat - Converts a valid number to a float
 * @param {Type | Float<Type>} value - Value to test
 * @returns {number | undefined}
 */
export const numericToFloat = <Type extends number, strict = false>(
    value: strict extends true ? Float<Type> : Type
): number | undefined => {
    return isValidNumber(value) ? parseFloat(value.toString()) : undefined
}
/**
 * @category Numeric
 * @example
 *     const number_to_test_int = 22.000
 *     numericToInteger<typeof number_to_test_int, true>(number_to_test_int)
 *     => 22
 *
 * @template {number} Type - Must extend number
 * @template {boolean} strict [d=false] - enables strict typing of value
 *   parameter using Integer<Type>
 * @function numericToInt - Converts a integer number to a exact Integer using
 *   parseInt (ie not 12.001 but 12.00 is allowed)
 * @param {Type | Integer<Type>} value - Value to test
 * @returns {number | undefined}
 */
export const numericToInteger = <Type extends number, strict = false>(
    value: strict extends true ? Integer<Type> : Type
): number | undefined => {
    return isInteger(value) ? parseInt(value.toString()) : undefined
}
