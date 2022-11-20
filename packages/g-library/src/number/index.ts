import type { NonNegativeInteger, Integer } from 'type-fest'
import * as parse from './parse.js'
import * as transform from './transform.js'
import * as _numeric from './numeric.js'

/* * Generic Number Utility * */
const randomIntInRange = <Min extends number, Max extends number>(
    min: Integer<Min> | 0 = 0,
    max: Integer<Max> | 100 = 100
): number =>
    parseInt(Math.floor(Math.random() * (max - min + 1) + min).toString())

const getRandomNumber = (_multiplier = 100): number =>
    Math.floor(Math.random() * _multiplier)

const getIntegerDigitCount = <T extends number>(
    value: NonNegativeInteger<T>
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
    getRandomNumber,
    getIntegerDigitCount,
}
export type { Numeric, PossibleNumeric } from './numeric'
