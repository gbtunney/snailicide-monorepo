import { isValidNumber, isNotString, isBoolean } from 'ramda-adjunct'
import { stringContainsNumber } from './string'

type singleValue = string | boolean | number

export const toInteger = (value: singleValue): singleValue =>
    cleanIntegerType(value, false)

export const isInteger = (value: singleValue): boolean =>
    isValidNumber(toInteger(value))

/**
 * CleanIntegerType - parses string to integer by removing nondigits
 *
 * @example
 *     cleanIntegerType('2px', true)
 *     => 2.0
 *
 * @param {singleValue} value - Value [false]
 * @param {boolean} removeNonDigits [false] - removeNonDigits flag
 * @returns {singleValue}
 */
export function cleanIntegerType(
    value: singleValue = false,
    removeNonDigits = false
): singleValue {
    if (
        isBoolean(value) ||
        isNotString(value) ||
        !stringContainsNumber(value.toString())
    )
        return value
    const castToNumber: number = parseInt(value.toString())
    return removeNonDigits === true || castToNumber.toString() === value
        ? castToNumber
        : value
}

export const cleanBooleanType = (value: string | boolean): string | boolean =>
    isNotString(value)
        ? value
        : value === 'true'
        ? true
        : value === 'false'
        ? false
        : value
