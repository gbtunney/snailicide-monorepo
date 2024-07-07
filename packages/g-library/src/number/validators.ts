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
    isString as tgIsString,
} from '../typeguard/utility.typeguards.js'
import { is } from 'ramda'

export const isValidScientificNumber = (value: string | number | bigint) => {
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
export const isInteger = (value: number | bigint) => {
    return R_isInteger(value)
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
export const isNonInteger = (value: number | bigint) => {
    return isFloat(value)
}

export const isValidNumber = <Type extends number>(
    value: number | bigint | string,
): value is Type => {
    return R_isValidNumber(value)
}
export const isValidBigInt = <Type extends bigint>(
    value: unknown,
): value is Type => {
    return R_isBigInt(value)
}
const cleanString = (value: string) => trimWhiteSpace(removeAllNewlines(value))

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

export const isPossibleNumeric = (
    value: number | bigint | string,
): value is number | bigint =>
    isBigInt(value) || isValidNumber(value) || isStringNumeric(value)

//   || isBigInt(value)|| isValidNumber( value) )

export const toStringNumeric = <T extends string>(
    value: T,
    strictChars: boolean = true,
): bigint | number | undefined => {
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

export const toPossibleNumeric = <T extends string>(
    value: T,
): number | bigint | undefined => {
    if (tgIsString(value) && isStringNumeric(value)) {
        const str: string = value
        return toStringNumeric(str)
    }
    return undefined
}
