import { isFloat, isString } from 'ramda-adjunct'

import { scientificNumber } from './../regexp/dictionary.js'
import { Numeric, PossibleNumeric } from './numeric.js'
import { removeAllNewlines, trimWhiteSpace } from '../string/string-utils.js'
import {
    isBigInt,
    isInteger as tgIsInteger,
    isNumber,
} from '../typeguard/utility.typeguards.js'

export const isValidScientificNumber = <Type extends PossibleNumeric>(
    value: Type,
): value is Type => {
    const _value: string = value.toString()
    return scientificNumber.test(_value)
}

//determines if string can be parsed/cast to numeric
export const isStringNumeric = <Type extends string>(
    value: unknown,
    strictChars: boolean = true,
): value is Type => {
    if (isString(value)) {
        const trimmedValue = cleanString(value)
        return strictChars
            ? isValidScientificNumber(trimmedValue)
            : /\d/.test(trimmedValue)
    } else return false
}

export const isNumeric = <Type extends Numeric>(
    value: unknown,
): value is Type => isBigInt(value) || isNumber(value)

/*
todo: see if this function is better than the other one?
export const isPossibleNumeric = <T extends PossibleNumeric>(
    value: unknown,
): value is T => isBigInt(value) || isNumber(value) || isStringNumeric(value)
*/

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
export const isNumericInteger = <Type extends Numeric>(
    value: Type,
): value is Type => {
    return tgIsInteger(value)
}

/**
 * Guard function to determine if value is an exact float (ie not 12 or 12.00)
 *
 * @category Numeric
 * @category Validator
 * @example
 *     const number_to_test = 22.25
 *     isNonInteger(number_to_test)
 *     => true
 *
 * @template {number} Type - Must extend number
 * @function isNumericFloat
 * @param {Type} value - Value to test
 * @returns {boolean}
 */
export const isNumericNonInteger = <Type extends Numeric>(
    value: Type,
): value is Type => {
    return isFloat(value)
}

export const isNumericFloat = isNumericNonInteger
export const cleanString = (value: string): string =>
    trimWhiteSpace(removeAllNewlines(value))
