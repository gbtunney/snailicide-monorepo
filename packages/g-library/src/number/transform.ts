import { isNaN } from 'ramda-adjunct'
import { Integer } from 'type-fest'

import { removeAllNewlines, trimWhiteSpace } from '../string/_stringUtils.js'
import {
    isBigInt,
    isNumber,
    isString as tgIsString,
} from '../typeguard/utility.typeguards.js'
import type { Numeric, PossibleNumeric } from './numeric.js'
import { parseStringToInteger, parseToFloat } from './parse.js'
import { isPossibleNumeric } from './typeguards.js'
import { isStringNumeric } from './validators.js'

export const toStringNumeric = <T extends string>(
    value: T,
    strictChars: boolean = true,
): Numeric | undefined => {
    if (strictChars && isStringNumeric(value, true)) {
        const trimmedValue = cleanString(value)

        const newNumber = new Number(value).valueOf()

        const _parsedInt = parseInt(trimmedValue)
        const _parsedFloat = parseFloat(trimmedValue)

        if (isNaN(newNumber)) {
            if (
                /[n]$/.test(trimmedValue) &&
                /[n]/.test(trimmedValue.replace(/[n]$/, '')) === false
            ) {
                console.log('BIG INT!!!!', trimmedValue)
                //if ( /[n]/.test(  trimmedValue.replace(/[n]$/ , ""))  ===  false ) {
                //if it ends in 'n' its a bigint ( exampel 0x01n or 2n ) >>> remove n and new BigInt and test its validity
                return BigInt(trimmedValue.replace(/[n]$/, ''))
            } else if (/^\+0x|^-0x|^0x/.test(trimmedValue)) {
                return parseInt(trimmedValue)
            } else {
                return parseFloat(trimmedValue)
            }
        } else {
            if (newNumber === _parsedInt && _parsedInt !== _parsedFloat) {
                return _parsedInt
            } else if (newNumber === _parsedFloat) {
                return _parsedFloat
            } else {
                console.log(
                    'THERE HAS BEEN AN ERROR',
                    'newNumber',
                    newNumber,
                    'parsedFLoat',
                    _parsedFloat,
                    '_parsedInt',
                    _parsedInt,
                )
                return undefined
            }
        }
    }

    if (!strictChars && isStringNumeric(value, false)) {
        const regex = new RegExp(/([a-z]|[A-Z]|,|\?|$|\$|!|@|#|%|&)/, 'g')
        const replaced_value = removeAllNewlines(value.toString()).replace(
            regex,
            '',
        )
        if (replaced_value.length > 0) {
            const _pre = replaced_value
            return parseFloat(_pre)
        }
    }
    return undefined
}

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
    if (isPossibleNumeric<Type>(value)) {
        if (isBigInt(value)) return BigInt(value)
        else if (isNumber(value)) return value
        else if (tgIsString(value) && isStringNumeric(value)) {
            return toStringNumeric(value)
        }
    }
    return undefined
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
export const numericToFloat = <Type extends Numeric>(
    value: Type,
): Numeric | undefined => parseToFloat<Type>(value)

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
export const numericToInteger = <Type extends Numeric, strict = false>(
    value: strict extends true ? Integer<Type> : Type,
): Numeric | undefined => parseStringToInteger(value.toString())

const cleanString = (value: string) => trimWhiteSpace(removeAllNewlines(value))
