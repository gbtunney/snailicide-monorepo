import colorjs from 'colorjs.io'
import { wcagContrast } from 'culori'
import { rangeStep } from 'ramda-adjunct'

import type {
    ColorComparatorFunc,
    ColorLumMode,
    ColorPairFinderOptions,
    ContrastInfo,
    ContrastPeakInfo,
    ContrastSearchOptions,
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

export const searchForContrastPair = (
    base: ValidOklchColor,
    direction: ColorLumMode,
    _options: ContrastSearchOptions,
) => {
    const { mode, step, threshold }: Required<ContrastSearchOptions> = {
        mode: 'apac',
        step: 0.01,
        threshold: 50,
        ..._options,
    }

    const [start, end] = direction === 'light' ? [base.l, 1] : [base.l, 0]

    const referenceColor = validateOklchColor(
        direction === 'light' ? 'black' : 'white',
    )

    const steps = rangeStep(step, start, end)

    return steps.reduce<ValidOklchColor | null>((found, l) => {
        if (found) return found

        const candidate = validateOklchColor({ ...base, l })
        const contrast =
            mode === 'apac'
                ? Math.abs(getContrastRatioAPCA(candidate, referenceColor))
                : getContrastRatioWCAG(candidate, referenceColor)

        return contrast >= threshold ? candidate : null
    }, null)
}

export const newFindOptimalPair = (
    base: ValidOklchColor,
    _options: ColorPairFinderOptions = {},
) => {
    const { clamp, round }: Required<ColorPairFinderOptions> = {
        clamp: true,
        mode: 'apac',
        normalize: true,
        round: false,
        step: 0.01,
        threshold: 50,
        ..._options,
    }
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

export const newNormalizeColorForContrast = (
    base: ValidOklchColor,
    _options: ColorPairFinderOptions = {},
) => {
    const { mode, step, threshold }: Required<ColorPairFinderOptions> = {
        clamp: true,
        mode: 'apac',
        normalize: true,
        round: false,
        step: 0.01,
        threshold: 50,
        ..._options,
    }

    const input = validateOklchColor(base)

    if (meetsContrastPeakThreshold(input, { mode, threshold })) return input

    const searchOptions = { mode, step, threshold }

    const lightResult = searchForContrastPair(input, 'light', searchOptions)
    if (lightResult) return lightResult

    const darkResult = searchForContrastPair(input, 'dark', searchOptions)
    if (darkResult) return darkResult

    const info = getColorContrastPeakInfo(input)
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

export const findOptimalContrastPair = (
    base: ValidOklchColor,
    _options: ColorPairFinderOptions = {},
): ValidOklchColor => {
    const {
        mode,
        normalize,
        step,
        threshold,
    }: Required<ColorPairFinderOptions> = {
        clamp: true,
        mode: 'wcag',
        normalize: true,
        round: false,
        step: 0.01,
        threshold: 4.5,
        ..._options,
    }

    const normalizedBase =
        !meetsContrastPeakThreshold(base, { mode, threshold }) && normalize
            ? newNormalizeColorForContrast(base, {
                  mode,
                  normalize: false,
                  step,
                  threshold,
              })
            : base

    const searchOptions = { mode, step, threshold }

    const lightResult = searchForContrastPair(
        normalizedBase,
        'light',
        searchOptions,
    )
    if (lightResult) return lightResult

    const darkResult = searchForContrastPair(
        normalizedBase,
        'dark',
        searchOptions,
    )
    if (darkResult) return darkResult

    throw new Error('No suitable contrast pair found')
}
