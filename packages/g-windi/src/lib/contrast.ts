import colorjs from 'colorjs.io'
import { wcagContrast } from 'culori'
import { rangeStep } from 'ramda-adjunct'

import type {
    ColorComparatorFunc,
    ColorLumMode,
    ColorPairFinderOptions,
    ColorSearchLumDirection,
    ContrastInfo,
    ContrastPairMeta,
    ContrastPeakInfo,
    ContrastSearchOptions,
    OklchColorPair,
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
const getOptimalLuminanceDirection = (
    info: ContrastPeakInfo,
    invert: boolean,
    mode: 'apac' | 'wcag',
): ColorSearchLumDirection => {
    const contrastToWhite =
        mode === 'apac'
            ? Math.abs(info.apac.contrastToWhite)
            : info.wcag.contrastToWhite
    const contrastToBlack =
        mode === 'apac'
            ? Math.abs(info.apac.contrastToBlack)
            : info.wcag.contrastToBlack

    // Prefer direction with higher existing contrast
    let direction: ColorSearchLumDirection
    if (contrastToWhite !== contrastToBlack) {
        direction = contrastToWhite > contrastToBlack ? 'light' : 'dark'
    } else {
        // Fallback to distance only when contrast values are equal
        const distanceToWhite = 1 - info.luminance
        const distanceToBlack = info.luminance
        direction = distanceToWhite < distanceToBlack ? 'light' : 'dark'
    }

    return invert ? (direction === 'light' ? 'dark' : 'light') : direction
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

/** Compare 2 colors */
export const getColorContrast: ColorComparatorFunc<
    ContrastInfo & { source: OklchColorPair }
> = (bg_color, fg_color): ContrastInfo & { source: OklchColorPair } => ({
    apac: getContrastRatioAPCA(bg_color, fg_color),
    apac_inverted: getContrastRatioAPCA(fg_color, bg_color),
    distance: getColorDistance(bg_color, fg_color),
    /* This is the mode, like the theme.  not the search direction */
    mode: bg_color.l > fg_color.l ? 'dark' : 'light',
    source: { bg_color, fg_color },
    wcag: getContrastRatioWCAG(bg_color, fg_color),
})

export const searchForContrastPair = (
    base: ValidOklchColor,
    direction: ColorLumMode,
    _options: ContrastSearchOptions,
): ValidOklchColor | undefined => {
    const { mode, step, threshold }: Required<ContrastSearchOptions> = {
        mode: 'apac',
        step: 0.01,
        threshold: 50,
        ..._options,
    }

    const [start, end] = direction === 'light' ? [base.l, 1] : [base.l, 0]

    const steps = rangeStep(step, start, end)

    return steps.reduce<ValidOklchColor | undefined>((found, l) => {
        if (found) return found

        const candidate = validateOklchColor({ ...base, l })

        return meetsContrastPeakThreshold(candidate, { mode, threshold })
            ? candidate
            : undefined
    }, undefined)
}

export const meetsContrastPeakThreshold = (
    base: ValidOklchColor,
    _options: ContrastSearchOptions,
): boolean => {
    const {
        mode,
        threshold,
    }: Omit<Required<ContrastSearchOptions>, 'step'> = {
        mode: 'apac',
        threshold: 4.5,
        ..._options,
    }

    const info = getColorContrastPeakInfo(base)
    const contrastToWhite =
        mode === 'apac'
            ? Math.abs(info.apac.contrastToWhite)
            : info.wcag.contrastToWhite
    const contrastToBlack =
        mode === 'apac'
            ? Math.abs(info.apac.contrastToBlack)
            : info.wcag.contrastToBlack

    return contrastToWhite >= threshold || contrastToBlack >= threshold
}
export const findOptimalPairMeta = (
    base: ValidOklchColor,
    _options: ColorPairFinderOptions = {},
): ContrastPairMeta => {
    const {
        mode,
        normalize,
        step,
        threshold,
    }: Required<ColorPairFinderOptions> = {
        clamp: true,
        mode: 'apac',
        normalize: true,
        round: false,
        step: 0.01,
        threshold: 50,
        ..._options,
    }

    const searchOptions: ContrastSearchOptions = { mode, step, threshold }
    const doNormalize =
        normalize && !meetsContrastPeakThreshold(base, searchOptions)
    const bg_color = doNormalize
        ? normalizeColorForContrast(base, searchOptions)
        : base

    const info = getColorContrastPeakInfo(bg_color)
    const optimalDirection = getOptimalLuminanceDirection(info, false, mode)
    const secondaryDirection: ColorLumMode =
        optimalDirection === 'light' ? 'dark' : 'light'

    let fg_color: ValidOklchColor | undefined
    let fallback = false
    let direction = optimalDirection

    fg_color = searchForContrastPair(bg_color, optimalDirection, searchOptions)

    if (!fg_color) {
        fg_color = searchForContrastPair(
            bg_color,
            secondaryDirection,
            searchOptions,
        )
        direction = secondaryDirection
    }

    if (!fg_color) {
        fg_color =
            optimalDirection === 'light'
                ? validateOklchColor('white')
                : validateOklchColor('black')
        fallback = true
    }

    const finalContrastInfo: ContrastInfo = getColorContrast(bg_color, fg_color)

    const _result: ContrastPairMeta = {
        ...finalContrastInfo,
        fallback,
        normalized: doNormalize,

        result: { bg_color, fg_color },
        source: base,
    }

    return _result
}
export const normalizeColorForContrast = (
    base: ValidOklchColor,
    _options: Omit<ColorPairFinderOptions, 'normalize'> = {},
) => {
    const {
        mode,
        step,
        threshold,
    }: Omit<Required<ColorPairFinderOptions>, 'normalize'> = {
        clamp: true,
        mode: 'apac',
        round: false,
        step: 0.01,
        threshold: 50,
        ..._options,
    }

    const input = validateOklchColor(base)

    if (meetsContrastPeakThreshold(input, { mode, threshold })) return input

    const info = getColorContrastPeakInfo(input)
    const optimalDirection = getOptimalLuminanceDirection(info, false, mode)
    const searchOptions = { mode, step, threshold }

    const primaryResult = searchForContrastPair(
        input,
        optimalDirection,
        searchOptions,
    )
    if (primaryResult) return primaryResult

    const fallbackDirection: ColorLumMode =
        optimalDirection === 'light' ? 'dark' : 'light'
    const fallbackResult = searchForContrastPair(
        input,
        fallbackDirection,
        searchOptions,
    )
    if (fallbackResult) return fallbackResult

    const contrastToWhite =
        mode === 'apac'
            ? Math.abs(info.apac.contrastToWhite)
            : info.wcag.contrastToWhite
    const contrastToBlack =
        mode === 'apac'
            ? Math.abs(info.apac.contrastToBlack)
            : info.wcag.contrastToBlack

    return contrastToWhite >= contrastToBlack
        ? validateOklchColor('white')
        : validateOklchColor('black')
}
