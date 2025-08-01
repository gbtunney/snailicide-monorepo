import colorjs from 'colorjs.io'
import { type Color, formatCss, parse } from 'culori'
import type { OklchColorOptions, ValidCSS, ValidOklchColor } from './types.js'
import { okchlConverter, roundOklchColor } from './utilities.js'

/**
 * Validates and brands a value as ValidOklchColor. Accepts a color string or culori color object. Throws if invalid or
 * not convertible to OKLCH.
 */
export function validateOklchColor<T extends Color | string = Color | string>(
    value: T,
    _options: OklchColorOptions = {},
): ValidOklchColor {
    const { clamp, round }: Required<OklchColorOptions> = {
        clamp: false,
        round: false,
        ..._options,
    }
    const result = okchlConverter(
        typeof value === 'string' ? (parse(value) ?? value) : value,
    )
    if (!result) throw new Error('Invalid OKLCH color')
    if (result !== undefined) {
        const _rounded_result = roundOklchColor(
            result as ValidOklchColor,
            round,
        )
        // todo: does not currently do chroma
        return _rounded_result //((clamp===true) ? clampColor(_rounded_result) : _rounded_result) as ValidOklchColor
    }
    return result as ValidOklchColor
}

/** Returns a branded CSS string from a ValidOklchColor */
export function toOklchCssString(
    color: ValidOklchColor,
    _options: OklchColorOptions = {},
): ValidCSS {
    const { clamp, round }: Required<OklchColorOptions> = {
        clamp: false,
        round: false,
        ..._options,
    }

    const _rounded_result = roundOklchColor(color, round)
    return formatCss(_rounded_result) as ValidCSS
}

export const ColorJS = colorjs

export const toColorJS = (
    color: ValidOklchColor,
): InstanceType<typeof ColorJS> => {
    return new ColorJS(toOklchCssString(color))
}
