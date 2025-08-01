import colorjs from 'colorjs.io'
import type { ColorTypes as ColorJsType } from 'colorjs.io'
import {
    type Color,
    formatCss,
    parse,
} from 'culori'
import type {
    ValidCSS,
    ValidOklchColor,
} from './types.js'
import { okchlConverter, roundOklchColor } from './utilities.js'

const ColorJS = colorjs

/**
 * Validates and brands a value as ValidOklchColor. Accepts a color string or culori color object. Throws if invalid or
 * not convertible to OKLCH.
 */
export function validateOklchColor<T extends Color | string = Color | string>(
    value: T,
    round: boolean | number = true,
    clamp: boolean = false,
): ValidOklchColor {
    const result = okchlConverter(
        typeof value === 'string' ? (parse(value) ?? value) : value,
    )
    if (!result) throw new Error('Invalid OKLCH color')
    if (result !== undefined) {
        const _rounded_result = roundOklchColor(
            result as ValidOklchColor,
            round,
        )

        ///todo: this currently only clamps chroma
        return _rounded_result //((clamp===true) ? clampColor(_rounded_result) : _rounded_result) as ValidOklchColor
    }
    return result as ValidOklchColor
}

/** Returns a branded CSS string from a ValidOklchColor */
export function toOklchCssString(color: ValidOklchColor): ValidCSS {
    return formatCss(color) as ValidCSS
}

export const toColorJS = (color: ValidOklchColor): ColorJsType => {
    return new ColorJS(toOklchCssString(color))
}
