import chalk from 'chalk'
import {
    clampGamut,
    type Color,
    converter,
    displayable,
    type Mode as ColorMode,
} from 'culori'
import { formatHex } from 'culori'

import { findOptimalPairMeta } from './contrast.js'
import type { OklchColor, ValidOklchColor } from './types.js'
import { validateOklchColor } from './validators.js'
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

export const printSwatchWithChalk = (
    text: string,
    bg_color: ValidOklchColor,
    fg_color: ValidOklchColor | undefined = undefined,
    dim: string | undefined = undefined,
    _log: boolean = true,
): string => {
    /* Force truecolor mode */
    chalk.level = 3
    let textColor: ValidOklchColor
    try {
        /* Pick contrasting foreground if not provided */
        textColor = fg_color ?? findOptimalPairMeta(bg_color).result.fg_color
    } catch (e) {
        console.log('unable to find a contrast pair for ', formatHex(bg_color))
        textColor = validateOklchColor('white')
    }

    const bgHex = formatHex(bg_color)
    const fgHex = formatHex(textColor)

    const block = chalk.bgHex(bgHex).hex(fgHex)(` ${text} `)
    const info = dim ? chalk.dim(dim) : ''

    const output = `${block} ${info}`

    if (_log) console.log(output)
    return output
}
