import colorjs from 'colorjs.io'
import { wcagContrast } from 'culori'
import { omit } from 'ramda'
import { adjustChroma, adjustHue } from './adjustments.js'
import {
    CONTRAST_DEFAULTS,
    CONTRAST_PRESET_ADJUSTMENTS,
    getDefaultThreshold,
} from './constants.js'
import type {
    ColorComparatorFunc,
    ColorLumMode,
    ColorPairFinderOptions,
    ColorSearchLumDirection,
    ContrastInfo,
    ContrastPairMeta,
    ContrastPairPreset,
    ContrastPeakInfo,
    ContrastSearchOptions,
    OklchColorPair,
    ValidOklchColor,
} from './types.js'
import { toColorJS, validateOklchColor } from './validators.js'

export const getContrastRatioAPCA: ColorComparatorFunc = (bg_color, fg_color) =>
    colorjs.contrastAPCA(toColorJS(bg_color), toColorJS(fg_color))

export const getContrastRatioWCAG: ColorComparatorFunc = (bg_color, fg_color) =>
    wcagContrast(bg_color, fg_color)

export const getColorDistance: ColorComparatorFunc = (
    bg_color,
    fg_color,
): number => {
    return toColorJS(bg_color).distance(toColorJS(fg_color))
}
const getOptimalLuminanceDirection = (
    info: ContrastPeakInfo,
    invert: boolean,
    mode: 'apac' | 'wcag' | 'distance',
): ColorSearchLumDirection => {
    if (mode === 'distance') {
        // For distance mode, use distance values from peak info
        const distanceToWhite =
            info.distance?.contrastToWhite || 1 - info.luminance
        const distanceToBlack = info.distance?.contrastToBlack || info.luminance

        // Prefer direction with higher distance (less similar)
        const direction: ColorSearchLumDirection =
            distanceToWhite > distanceToBlack ? 'light' : 'dark'
        return invert ? (direction === 'light' ? 'dark' : 'light') : direction
    }

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
        // If contrast to white is higher, we should go toward black (dark direction)
        // If contrast to black is higher, we should go toward white (light direction)
        direction = contrastToWhite > contrastToBlack ? 'dark' : 'light'
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
        distance: {
            contrastToBlack: getColorDistance(input, black),
            contrastToWhite: getColorDistance(input, white),
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
    mode: bg_color.l > fg_color.l ? 'light' : 'dark',
    source: { bg_color, fg_color },
    wcag: getContrastRatioWCAG(bg_color, fg_color),
})

export const searchForContrastPair = (
    base: ValidOklchColor,
    direction: ColorLumMode,
    _options: ContrastSearchOptions,
): ValidOklchColor | undefined => {
    const { mode, step, threshold, verbose }: Required<ContrastSearchOptions> =
        {
            mode: CONTRAST_DEFAULTS.MODE,
            step: CONTRAST_DEFAULTS.STEP,
            threshold:
                _options.threshold ??
                getDefaultThreshold(_options.mode || CONTRAST_DEFAULTS.MODE),
            verbose: CONTRAST_DEFAULTS.VERBOSE,
            ..._options,
        }

    if (verbose) {
        console.log(
            `   🔍 Searching ${direction} from L=${base.l.toFixed(3)} for ${mode.toUpperCase()} ≥ ${threshold}`,
        )
    }

    // Generate steps manually to handle both directions properly
    const steps: Array<number> = []
    if (direction === 'light') {
        // Going from base.l towards 1
        for (let l = base.l; l <= 1; l += step) {
            steps.push(Math.min(l, 1))
        }
    } else {
        // Going from base.l towards 0
        for (let l = base.l; l >= 0; l -= step) {
            steps.push(Math.max(l, 0))
        }
    }

    const result = steps.reduce<ValidOklchColor | undefined>((found, l) => {
        if (found) return found

        const candidate = validateOklchColor({ ...base, l })
        const meetsThreshold = meetsContrastPeakThreshold(candidate, {
            mode,
            threshold,
        })

        return meetsThreshold ? candidate : undefined
    }, undefined)

    if (verbose) {
        if (result) {
            console.log(
                `   ✓ Found solution at L=${result.l.toFixed(3)} after ${steps.findIndex((l) => l === result.l) + 1} steps`,
            )
        } else {
            console.log(
                `   ✗ No solution found in ${direction} direction (${steps.length} steps checked)`,
            )
        }
    }

    return result
}

export const meetsContrastPeakThreshold = (
    base: ValidOklchColor,
    _options: ContrastSearchOptions,
): boolean => {
    const {
        mode,
        threshold,
        verbose,
    }: Omit<Required<ContrastSearchOptions>, 'step'> = {
        mode: CONTRAST_DEFAULTS.MODE,
        threshold:
            _options.threshold ??
            getDefaultThreshold(_options.mode || CONTRAST_DEFAULTS.MODE),
        verbose: CONTRAST_DEFAULTS.VERBOSE,
        ..._options,
    }

    const info = getColorContrastPeakInfo(base)

    if (mode === 'distance') {
        const distanceToWhite = info.distance?.contrastToWhite || 0
        const distanceToBlack = info.distance?.contrastToBlack || 0
        return distanceToWhite >= threshold || distanceToBlack >= threshold
    }

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
        verbose,
    }: Required<ColorPairFinderOptions> = {
        clamp: CONTRAST_DEFAULTS.CLAMP,
        mode: CONTRAST_DEFAULTS.MODE,
        normalize: CONTRAST_DEFAULTS.NORMALIZE,
        round: CONTRAST_DEFAULTS.ROUND,
        step: CONTRAST_DEFAULTS.STEP,
        threshold:
            _options.threshold ??
            getDefaultThreshold(_options.mode || CONTRAST_DEFAULTS.MODE),
        verbose: CONTRAST_DEFAULTS.VERBOSE,
        ..._options,
    }

    const searchOptions: ContrastSearchOptions = {
        mode,
        step,
        threshold,
        verbose,
    }
    const doNormalize =
        normalize && !meetsContrastPeakThreshold(base, searchOptions)

    if (verbose) {
        console.log(
            `🎯 Finding optimal contrast pair for color L=${base.l.toFixed(3)} C=${base.c.toFixed(3)} H=${base.h?.toFixed(1) || 'none'}`,
        )
        if (doNormalize) {
            console.log(
                `   🔧 Color needs normalization (doesn't meet ${threshold} ${mode.toUpperCase()} threshold)`,
            )
        }
    }

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

    if (verbose) {
        console.log(
            `   📍 Optimal direction: ${optimalDirection} (contrast to white: ${info.wcag.contrastToWhite.toFixed(2)}, to black: ${info.wcag.contrastToBlack.toFixed(2)})`,
        )
    }

    fg_color = searchForContrastPair(bg_color, optimalDirection, searchOptions)

    if (!fg_color) {
        if (verbose)
            console.log(
                `   🔄 Primary direction failed, trying ${secondaryDirection}`,
            )
        fg_color = searchForContrastPair(
            bg_color,
            secondaryDirection,
            searchOptions,
        )
        direction = secondaryDirection
    }

    if (!fg_color) {
        if (verbose)
            console.log(
                `   ⚠️  Fallback to ${optimalDirection === 'light' ? 'white' : 'black'}`,
            )
        fg_color =
            optimalDirection === 'light'
                ? validateOklchColor('white')
                : validateOklchColor('black')
        fallback = true
    }

    const finalContrastInfo: ContrastInfo = getColorContrast(bg_color, fg_color)

    if (verbose) {
        console.log(
            `   ✅ Final pair: BG L=${bg_color.l.toFixed(3)} → FG L=${fg_color.l.toFixed(3)} (${mode.toUpperCase()}: ${finalContrastInfo.wcag.toFixed(2)})`,
        )
    }

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
): ValidOklchColor => {
    const {
        mode,
        step,
        threshold,
        verbose,
    }: Omit<Required<ColorPairFinderOptions>, 'normalize'> = {
        clamp: CONTRAST_DEFAULTS.CLAMP,
        mode: CONTRAST_DEFAULTS.MODE,
        round: CONTRAST_DEFAULTS.ROUND,
        step: CONTRAST_DEFAULTS.STEP,
        threshold:
            _options.threshold ??
            getDefaultThreshold(_options.mode || CONTRAST_DEFAULTS.MODE),
        verbose: CONTRAST_DEFAULTS.VERBOSE,
        ..._options,
    }
    const __options: ContrastSearchOptions = { mode, step, threshold, verbose }

    const input = validateOklchColor(base)

    // If color already meets threshold, return it
    if (meetsContrastPeakThreshold(input, __options)) return input

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

    if (mode === 'distance') {
        const distanceToWhite = info.distance?.contrastToWhite || 0
        const distanceToBlack = info.distance?.contrastToBlack || 0
        // If no solution found, return the color with the highest distance
        return distanceToWhite >= distanceToBlack
            ? validateOklchColor('white')
            : validateOklchColor('black')
    }

    const contrastToWhite =
        mode === 'apac'
            ? Math.abs(info.apac.contrastToWhite)
            : info.wcag.contrastToWhite
    const contrastToBlack =
        mode === 'apac'
            ? Math.abs(info.apac.contrastToBlack)
            : info.wcag.contrastToBlack

    // If no solution found, return the color with the highest contrast
    return contrastToWhite >= contrastToBlack
        ? validateOklchColor('white')
        : validateOklchColor('black')
}

export const getContrastPair = (
    base: ValidOklchColor,
    _options: ColorPairFinderOptions & { preset?: ContrastPairPreset } = {},
): ContrastPairMeta => {
    const __options: Required<
        ColorPairFinderOptions & { preset?: ContrastPairPreset }
    > = {
        clamp: CONTRAST_DEFAULTS.CLAMP,
        mode: CONTRAST_DEFAULTS.MODE,
        normalize: CONTRAST_DEFAULTS.NORMALIZE,
        preset: CONTRAST_DEFAULTS.PRESET,
        round: CONTRAST_DEFAULTS.ROUND,
        step: CONTRAST_DEFAULTS.STEP,
        threshold:
            _options.threshold ??
            getDefaultThreshold(_options.mode || CONTRAST_DEFAULTS.MODE),
        verbose: CONTRAST_DEFAULTS.VERBOSE,
        ..._options,
    }

    const { mode, preset, verbose } = __options

    if (verbose) {
        console.log(`🎨 Getting contrast pair with preset: ${preset}`)
    }

    const basePair = findOptimalPairMeta(base, omit(['preset'], __options))
    const minPair = basePair.result.fg_color
    const subtlePairColor = adjustChroma(
        basePair.result.fg_color,
        CONTRAST_PRESET_ADJUSTMENTS.SUBTLE_CHROMA_ADJUSTMENT,
        false,
    )
    const complementPairColor = adjustHue(
        basePair.result.fg_color,
        CONTRAST_PRESET_ADJUSTMENTS.COMPLEMENT_HUE_ADJUSTMENT,
    )

    // Use the luminance direction function to determine optimal directions
    const maxColor: ValidOklchColor = validateOklchColor(
        getOptimalLuminanceDirection(
            getColorContrastPeakInfo(basePair.result.bg_color),
            true,
            mode,
        ) === 'light'
            ? 'white'
            : 'black',
    )

    const __color: OklchColorPair = {
        bg_color: basePair.result.bg_color,
        fg_color:
            preset === 'maxPair'
                ? maxColor
                : preset === 'subtle'
                  ? subtlePairColor
                  : preset === 'complement'
                    ? complementPairColor
                    : minPair,
    }

    const resultContrastInfo = getColorContrast(
        __color.bg_color,
        __color.fg_color,
    )

    const _result: ContrastPairMeta = {
        ...basePair,
        ...resultContrastInfo,
        result: __color,
        source: base,
    }

    if (verbose) {
        console.log(
            `✅ Selected ${preset} pair: FG L=${__color.fg_color.l.toFixed(3)}, BG L=${__color.bg_color.l.toFixed(3)}`,
        )
    }

    return _result
}
