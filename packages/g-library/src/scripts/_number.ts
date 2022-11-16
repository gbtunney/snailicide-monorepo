import { toInteger } from './_valueTypes'

export const randomInt = (min = 0, max = 100): number =>
    Math.floor(Math.random() * (max - min + 1) + min)

export const getRandomNumber = (_multiplier = 100): number =>
    Math.floor(Math.random() * _multiplier)

export const getDigitCount = (value: number): number =>
    (Math.log(toInteger(value) as number) * Math.LOG10E + 1) | 0

export const formatCurrency = (
    value: number,
    minimumFractionDigits = 2,
    currency = 'USD'
): string => {
    // if (!isInteger(value)) return value
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        minimumFractionDigits,
    }).format(value)
}
