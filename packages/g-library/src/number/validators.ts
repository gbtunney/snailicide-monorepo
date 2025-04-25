import { isFinite, isFloat, isNotNaN, isValidNumber } from 'ramda-adjunct'

import { scientificNumber } from './../regexp/dictionary.js'
import { Numeric, PossibleNumeric } from './numeric.js'
import { removeAllNewlines, trimWhiteSpace } from '../string/string-utils.js'
import {
    isBigInt,
    isInteger as tgIsInteger,
    isNumber,
    isString,
} from '../typeguard/utility.typeguards.js'

export const isPossibleNumeric = <Type extends PossibleNumeric>(
    value: Type,
    strict: boolean = true,
): value is Type => {
    if (isBigInt(value) || isValidNumber(value)) return true
    if (isString<string>(value) && value.toString().length > 0) {
        let _pre: string = cleanString(value)

        const regex = new RegExp(/([a-z]|[A-Z]|,|\?|$|\$|!|@|#|%|&)/, 'g')

        if (!strict) {
            const replaced_value = _pre.replace(regex, '')
            if (replaced_value.length > 0) _pre = replaced_value
        }

        return isStringNumeric(_pre)
    }
    return false
}

export const isTrueNumeric = <Type extends Numeric>(
    value: unknown,
): value is Type => {
    return (
        isNotNaN(Number(Number.parseFloat(String(value)))) &&
        isFinite(Number(value))
    )
}
export const isValidScientificNumber = <Type extends PossibleNumeric>(
    value: Type,
): value is Type => {
    const _value: string = value.toString()
    return scientificNumber.test(_value)
}

/** Determines if string can be parsed/cast to numeric */
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

/**
 * Guard function to determine if value is an exact integer (ie not 12.001 but 12.00 is allowed)
 *
 * @category Numeric
 * @example
 *     const number_to_test_int = 22.000
 *     isNumericInteger(number_to_test_int)
 *     => true
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
 * @example
 *     const number_to_test = 22.25
 *     isNonInteger(number_to_test)
 *     => true
 */
export const isNumericNonInteger = <Type extends Numeric>(
    value: Type,
): value is Type => {
    return isFloat(value)
}

export const isNumericFloat = isNumericNonInteger
export const cleanString = (value: string): string =>
    trimWhiteSpace(removeAllNewlines(value))
