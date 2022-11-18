import { z } from 'zod'
import { isNotUndefined, isNotNullish } from './../typeguard/utility.typeguards'
import { isBoolean, isNotString, isString, isInteger } from 'ramda-adjunct'
import { Primitive } from 'type-fest'
import { stringContainsNumber } from './../string/_string.js'
import { values } from 'ramda'
/**
 * ParseIntegerType - parses string to integer by removing nondigits
 *
 * @example
 *     cleanIntegerType('2px', true)
 *     => 2.0
 *
 * @param {Type extends Primitive} value - Value
 * @returns {number | undefined}
 */
export const parseIntegerType = <
    Type extends boolean | string | number | null | undefined
>(
    value: Type,
    parseFloat = true
): number | undefined => {
    if (isNotUndefined<string | number | boolean>(value)) {
        if (value === false) return 0
        else if (value === true) return 1
        else if (isString(value) && !stringContainsNumber(value.toString())) {
            return undefined
        } else {
            if (stringContainsNumber(value.toString())) {
                if (parseFloat === true) {
                    const castToNumber: number = parseInt(value.toString())
                    return castToNumber
                } else if (isInteger(value)) {
                    const castToNumber: number = parseInt(value.toString())
                    return castToNumber
                } else {
                    const castToNumber: number = parseInt(value.toString())
                    return castToNumber
                    if (castToNumber.toString() === value) {
                        return castToNumber
                    } else {
                    }
                }
            }
        }
    }
    return undefined
}

export const toInteger = parseIntegerType

const testem = parseIntegerType('2px')
/* * Generic Number Utility * */
export const randomInt = (min = 0, max = 100): number =>
    Math.floor(Math.random() * (max - min + 1) + min)

export const getRandomNumber = (_multiplier = 100): number =>
    Math.floor(Math.random() * _multiplier)
/*
export const getDigitCount = (value: number): number =>
    (Math.log(toInteger(value) as number) * Math.LOG10E + 1) | 0
*/
