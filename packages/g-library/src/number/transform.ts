import { isNaN } from 'ramda-adjunct'
import { Integer } from 'type-fest'
import type { Numeric, PossibleNumeric } from './numeric.js'
import { parseStringToInteger, parseToFloat } from './parse.js'
import { isPossibleNumeric, isStringNumeric } from './validators.js'
import { removeAllNewlines, trimWhiteSpace } from '../string/string-utils.js'
import {
    isBigInt,
    isNumber,
    isString as tgIsString,
} from '../typeguard/utility.typeguards.js'

/**
 * Convert a string to a numeric value
 * @group Transform
 */
export const toStringNumeric = <Type extends string>(
    value: Type,
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
                !/[n]/.test(trimmedValue.replace(/[n]$/, ''))
            ) {
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
 * @group Transform
 * @see {@link parseToNumeric}
 * @see {@link parseToInteger}
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
 * @group Transform
 */
export const numericToFloat = <Type extends Numeric>(
    value: Type,
): Numeric | undefined => parseToFloat<Type>(value)

/**
 * Converts a integer number to a exact Integer using parseInt (ie not 12.001 but 12.00 is allowed)
 * @example
 *     const number_to_test_int = 22.000
 *     numericToInteger<typeof number_to_test_int, true>(number_to_test_int)
 *     => 22
 *
 * @group Transform
 */
export const numericToInteger = <Type extends Numeric, Strict = false>(
    value: Strict extends true ? Integer<Type> : Type,
): Numeric | undefined => parseStringToInteger(value.toString())

const cleanString = (value: string): string =>
    trimWhiteSpace(removeAllNewlines(value))
