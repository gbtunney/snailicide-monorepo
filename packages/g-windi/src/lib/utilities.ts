import {
    clampGamut,
    type Color,
    converter,
    displayable,
    type Mode as ColorMode,
} from 'culori'

import type {
    OklchColor,
    ValidOklchColor,
} from './types.js'

export const rgbConverter: ReturnType<typeof converter<'rgb'>> =
    converter('rgb')

export const okchlConverter: ReturnType<typeof converter<'oklch'>> =
    converter('oklch')
/**
 * Rounds a number to the specified number of decimal places.
 *
 * @param value The number to round.
 * @param decimals The number of decimal places.
 * @returns The rounded number.
 */
export const roundToDecimals = (value: number, decimals: number): number => {
    if (decimals <= 0) return value
    const factor = 10 ** decimals
    return Math.round(value * factor) / factor
}

export const roundOklchColor = (
    color: ValidOklchColor,
    round: boolean | number = false,
): ValidOklchColor => {
    const _decimal: number = round === false ? 0 : round === true ? 2 : round
    if (_decimal > 0) {
        const _rounded_result: OklchColor = {
            ...color,
            alpha: roundToDecimals(
                color.alpha === undefined ? 0 : color.alpha,
                _decimal,
            ),
            c: roundToDecimals(color.c, _decimal),
            h: roundToDecimals(color.h === undefined ? 0 : color.h, _decimal),
            l: roundToDecimals(color.l, _decimal),
        }
        return _rounded_result as ValidOklchColor
    }
    return color
}

export const clampIfNeeded = (
    color: ValidOklchColor,
    _mode: ColorMode = 'oklch',
) => {
    const hi = converter(_mode)

    if (!displayable(color)) {
        // console.log('NOT DISPLAYABLE BEFORE:', rgbConverter(color))
        console.log('NOT DISPLAYABLE BEFORE:', color)
        const clamped: Color | undefined = clampGamut(_mode)(color)
        if (!clamped) throw new Error('Invalid Clamped OKLCH color')
        console.log('CLAMPED:', clamped)
        console.log('DISPLAYABLE AFTER:', displayable(clamped))
        return clamped
    }
    return color
}
