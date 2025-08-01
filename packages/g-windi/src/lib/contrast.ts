import colorjs from 'colorjs.io'

import {
    wcagContrast,
} from 'culori'
import type {
    ColorComparatorFunc,
    ContrastInfo,
    ContrastPeakInfo,
    ValidOklchColor,
} from './types.js'
import { toColorJS, validateOklchColor } from './validators.js'

export const getContrastRatioAPCA: ColorComparatorFunc<number> = (
    bg_color,
    fg_color,
) => colorjs.contrastAPCA(toColorJS(bg_color), toColorJS(fg_color))

export const getContrastRatioWCAG: ColorComparatorFunc<number> = (
    bg_color,
    fg_color,
) => wcagContrast(bg_color, fg_color)

export const getColorDistance: ColorComparatorFunc<number> = (
    bg_color,
    fg_color,
): number => {
    return toColorJS(bg_color).distance(toColorJS(fg_color))
}

export const getColorContrastPeakInfo = (
    color: ValidOklchColor,
): ContrastPeakInfo => {
    const input = validateOklchColor(color)
    const white = validateOklchColor({ ...input, l: 1 })
    const black = validateOklchColor({ ...input, l: 0 })
    const luminance = input.l
    const result = {
        apac: {
            contrastToBlack: getContrastRatioAPCA(input, black),
            contrastToWhite: getContrastRatioAPCA(input, white),
        },
        luminance,
        source: input,
        wcag: {
            contrastToBlack: getContrastRatioWCAG(input, black),
            contrastToWhite: getContrastRatioWCAG(input, white),
        },
    }
    return result
}
export const getColorContrast: ColorComparatorFunc<ContrastInfo> = (
    bg_color,
    fg_color,
): ContrastInfo => ({
    apac: getContrastRatioAPCA(bg_color, fg_color),
    apac_inverted: getContrastRatioAPCA(fg_color, bg_color),
    distance: getColorDistance(bg_color, fg_color),
    mode: bg_color.l > fg_color.l ? 'dark' : 'light',
    source: { bg_color, fg_color },
    wcag: getContrastRatioWCAG(bg_color, fg_color),
})
