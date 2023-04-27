import type { NonNegativeInteger, Integer, Finite } from 'type-fest'
import * as parse from './parse.js'
import * as transform from './transform.js'
import * as _numeric from './numeric.js'

type IntegerInRange = Finite<ReturnType<typeof parseInt>>

/**
 * @category Numeric
 * @template {number} Min Must extend number
 * @template {number} Max Must extend number
 * @function randomIntInRange
 * @param {Integer<Min>} [0] Min
 * @param {Integer<Min>} [100] Max
 * @returns {IntegerInRange}
 */
const randomIntInRange = <Min extends number, Max extends number>(
    min: Integer<Min> | 0 = 0,
    max: Integer<Max> | 100 = 100
): IntegerInRange => {
    return parseInt(
        Math.floor(Math.random() * (max - min + 1) + min).toString()
    )
}
/**
 * @category Numeric
 * @template {number} Value - Value extend number
 * @template {number} Multiplier - Multiplier extend number
 * @function getNumberRoundedToDecimal
 * @param {Finite<Value>} value
 * @param {Finite<Multiplier>} multiplier [100] multiplier
 * @returns {number}
 */
const getNumberRoundedToDecimal = <
    Value extends number,
    Multiplier extends number
>(
    value: Finite<Value>,
    multiplier: Integer<Multiplier> | 100 = 100
): number => {
    if (multiplier === 0) return value
    return Math.round((value + Number.EPSILON) * multiplier) / multiplier
}

/* * @function getRandomNumber * */
const getRandomNumber = (_multiplier = 100): number =>
    Math.floor(Math.random() * _multiplier)

/**
 * @category Numeric
 * @example
 *     getIntegerDigitCount(100)
 *     => 3
 *
 * @template {number} Type - Must extend number
 * @function getIntegerDigitCount
 * @param {NonNegativeInteger<Type>} value
 * @returns {number}
 */
const getIntegerDigitCount = <Type extends number, strict = false>(
    value: strict extends true ? NonNegativeInteger<Type> : Type
): number => {
    const _integer: number = parseInt(value.toString())
    return _integer === 0
        ? 0
        : parseInt(Math.floor(Math.log(_integer) * Math.LOG10E + 1).toString())
}
export const numeric = {
    ..._numeric,
    ...transform,
    ...parse,
    randomIntInRange,
    getNumberRoundedToDecimal,
    getRandomNumber,
    getIntegerDigitCount,
}
export type { Numeric, PossibleNumeric } from './numeric.js'
