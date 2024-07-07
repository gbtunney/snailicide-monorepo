import { scientificNumber } from './../regexp/dictionary.js'
import {
    isFloat,
    isString,
    isBigInt as R_isBigInt,
    isValidNumber as R_isValidNumber,
    isInteger as R_isInteger,
    isNaN,
} from 'ramda-adjunct'
import {
    trimWhiteSpace,
    removeAllNewlines,
    escapeUnicode,
    escapeRegExp,
} from '../string/_stringUtils.js'
import {
    isBigInt,
    isNumber,
    isInteger as tgIsInteger,
    isString as tgIsString,
} from '../typeguard/utility.typeguards.js'
import { is } from 'ramda'
import { PossibleNumeric, Numeric } from './numeric.js'

export const isValidScientificNumber = <T extends PossibleNumeric>(
    value: unknown,
): value is T => {
    return scientificNumber.test(value.toString())
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
export const isNumericInteger = <T extends Numeric>(value: T): value is T => {
    return tgIsInteger<T>(value)
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
export const isNumericNonInteger = <T extends Numeric>(
    value: T,
): value is T => {
    return isFloat(value)
}

export const isNumericFloat = isNumericNonInteger

//determines if string can be parsed/cast to numeric
export const isStringNumeric = <T extends string>(
    value: unknown,
    strictChars: boolean = true,
): value is T => {
    if (isString(value)) {
        const trimmedValue = cleanString(value)
        return strictChars
            ? isValidScientificNumber(trimmedValue)
            : /\d/.test(trimmedValue)
    } else return false
}

export const isNumeric = <T extends Numeric>(value: unknown): value is T =>
    isBigInt(value) || isNumber(value)

export const isPossibleNumeric = <T extends PossibleNumeric>(
    value: unknown,
): value is T => isBigInt(value) || isNumber(value) || isStringNumeric(value)

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
        const trimmedValue = cleanString(value)

        return parseFloat(trimmedValue)

        // return  ( strictChars)? isValidScientificNumber(trimmedValue ) :  /\d/.test(trimmedValue)
    }
    return undefined
}

const cleanString = (value: string) => trimWhiteSpace(removeAllNewlines(value))
