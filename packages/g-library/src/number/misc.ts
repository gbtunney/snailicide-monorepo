import type { Finite, Integer, NonNegativeInteger } from 'type-fest'

type IntegerInRange = Finite<ReturnType<typeof parseInt>>

/** Return a random integer between min and max */
export const randomIntInRange = <Min extends number, Max extends number>(
    min: Integer<Min> | 0 = 0,
    max: Integer<Max> | 100 = 100,
): IntegerInRange => {
    return parseInt(
        Math.floor(Math.random() * (max - min + 1) + min).toString(),
    )
}
/** Number Rounded to Decimal */
export const getNumberRoundedToDecimal = <
    Value extends number,
    Multiplier extends number,
>(
    value: Finite<Value>,
    multiplier: Integer<Multiplier> | 100 = 100,
): number => {
    if (multiplier === 0) return value
    return Math.round((value + Number.EPSILON) * multiplier) / multiplier
}

export const getRandomNumber = (_multiplier = 100): number =>
    Math.floor(Math.random() * _multiplier)

/** Count the digits in an integer */
export const getIntegerDigitCount = <Type extends number, STRICT = false>(
    value: STRICT extends true ? NonNegativeInteger<Type> : Type,
): number => {
    const _integer: number = parseInt(value.toString())
    return _integer === 0
        ? 0
        : parseInt(Math.floor(Math.log(_integer) * Math.LOG10E + 1).toString())
}
