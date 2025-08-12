import { validateOklchColorJS } from './core.js'
import { generateRange } from './palattes.js'
import type { ValidOklchColor } from './types.js'

// ----------------------------------------
// ColorAide-inspired Harmony Functions
// ----------------------------------------

/** Generate monochromatic harmony - tints and shades of a single hue */
export function monochromaticHarmony(
    source: ValidOklchColor,
    options: {
        count?: number
        includeBlackWhite?: boolean
        chromaScale?: number
    } = {},
): Array<ValidOklchColor> {
    const { chromaScale = 1, count = 5, includeBlackWhite = false } = options

    // Special case: when count is 1, return the source color
    if (count === 1) {
        return [source]
    }

    const baseC = source.c * chromaScale
    const baseH = source.h ?? 0

    // Generate lightness values distributed from 0.1 to 0.9
    // Create count-1 additional lightness values, then include source at the beginning
    const lightnessRange = generateRange({
        end: includeBlackWhite ? 1 : 0.9,
        mode: 'distributed',
        start: includeBlackWhite ? 0 : 0.1,
        steps: count - 1,
    })

    // Start with source color, then add variations
    const variations = lightnessRange.map((l) =>
        validateOklchColorJS({
            c: baseC,
            h: baseH,
            l,
            mode: 'oklch',
        }),
    )

    return [source, ...variations]
}

/** Generate complementary harmony - base color + complement (180° hue shift) */
export function complementaryHarmony(
    source: ValidOklchColor,
    options: {
        chromaScale?: number
        lightness?: number
    } = {},
): Array<ValidOklchColor> {
    const { chromaScale = 1, lightness = source.l } = options
    const baseHue = source.h ?? 0
    const c = source.c * chromaScale

    return [
        source,
        validateOklchColorJS({
            c,
            h: (baseHue + 180) % 360,
            l: lightness,
            mode: 'oklch',
        }),
    ]
}

/** Generate split-complementary harmony - base + two colors adjacent to complement */
export function splitComplementaryHarmony(
    source: ValidOklchColor,
    options: {
        angle?: number
        chromaScale?: number
        lightness?: number
    } = {},
): Array<ValidOklchColor> {
    const { angle = 30, chromaScale = 1, lightness = source.l } = options
    const baseHue = source.h ?? 0
    const c = source.c * chromaScale
    const complementHue = (baseHue + 180) % 360

    return [
        source,
        validateOklchColorJS({
            c,
            h: (complementHue - angle + 360) % 360,
            l: lightness,
            mode: 'oklch',
        }),
        validateOklchColorJS({
            c,
            h: (complementHue + angle) % 360,
            l: lightness,
            mode: 'oklch',
        }),
    ]
}

/** Generate analogous harmony - base + adjacent colors */
export function analogousHarmony(
    source: ValidOklchColor,
    options: {
        angle?: number
        chromaScale?: number
        lightness?: number
    } = {},
): Array<ValidOklchColor> {
    const { angle = 30, chromaScale = 1, lightness = source.l } = options
    const baseHue = source.h ?? 0
    const c = source.c * chromaScale

    return [
        validateOklchColorJS({
            c,
            h: (baseHue - angle + 360) % 360,
            l: lightness,
            mode: 'oklch',
        }),
        source,
        validateOklchColorJS({
            c,
            h: (baseHue + angle) % 360,
            l: lightness,
            mode: 'oklch',
        }),
    ]
}

/** Generate triadic harmony - three colors evenly spaced (120° apart) */
export function triadicHarmony(
    source: ValidOklchColor,
    options: {
        chromaScale?: number
        lightness?: number
    } = {},
): Array<ValidOklchColor> {
    const { chromaScale = 1, lightness = source.l } = options
    const baseHue = source.h ?? 0
    const c = source.c * chromaScale

    return [
        source,
        validateOklchColorJS({
            c,
            h: (baseHue + 120) % 360,
            l: lightness,
            mode: 'oklch',
        }),
        validateOklchColorJS({
            c,
            h: (baseHue + 240) % 360,
            l: lightness,
            mode: 'oklch',
        }),
    ]
}

/** Generate tetradic square harmony - four colors evenly spaced (90° apart) */
export function tetradicSquareHarmony(
    source: ValidOklchColor,
    options: {
        chromaScale?: number
        lightness?: number
    } = {},
): Array<ValidOklchColor> {
    const { chromaScale = 1, lightness = source.l } = options
    const baseHue = source.h ?? 0
    const c = source.c * chromaScale

    return [
        source,
        validateOklchColorJS({
            c,
            h: (baseHue + 90) % 360,
            l: lightness,
            mode: 'oklch',
        }),
        validateOklchColorJS({
            c,
            h: (baseHue + 180) % 360,
            l: lightness,
            mode: 'oklch',
        }),
        validateOklchColorJS({
            c,
            h: (baseHue + 270) % 360,
            l: lightness,
            mode: 'oklch',
        }),
    ]
}

/** Generate tetradic rectangular harmony - four colors in rectangular pattern */
export function tetradicRectangularHarmony(
    source: ValidOklchColor,
    options: {
        offset?: number
        chromaScale?: number
        lightness?: number
    } = {},
): Array<ValidOklchColor> {
    const { chromaScale = 1, lightness = source.l, offset = 30 } = options
    const baseHue = source.h ?? 0
    const c = source.c * chromaScale

    return [
        source,
        validateOklchColorJS({
            c,
            h: (baseHue + offset) % 360,
            l: lightness,
            mode: 'oklch',
        }),
        validateOklchColorJS({
            c,
            h: (baseHue + 180) % 360,
            l: lightness,
            mode: 'oklch',
        }),
        validateOklchColorJS({
            c,
            h: (baseHue + 180 + offset) % 360,
            l: lightness,
            mode: 'oklch',
        }),
    ]
}

/** Generate compound harmony - complementary + analogous */
export function compoundHarmony(
    source: ValidOklchColor,
    options: {
        analogousSpread?: number
        analogousCount?: number
        chromaScale?: number
        lightness?: number
    } = {},
): Array<ValidOklchColor> {
    const {
        analogousCount = 2,
        analogousSpread = 30,
        chromaScale = 1,
        lightness = source.l,
    } = options
    const baseHue = source.h ?? 0
    const c = source.c * chromaScale

    const colors = [source]

    // Add analogous colors
    for (let i = 1; i <= analogousCount; i++) {
        colors.push(
            validateOklchColorJS({
                c,
                h: (baseHue + i * analogousSpread) % 360,
                l: lightness,
                mode: 'oklch',
            }),
        )
    }

    // Add complement
    colors.push(
        validateOklchColorJS({
            c,
            h: (baseHue + 180) % 360,
            l: lightness,
            mode: 'oklch',
        }),
    )

    return colors
}

/** Generate pentadic harmony - five colors evenly spaced (72° apart) */
export function pentadicHarmony(
    source: ValidOklchColor,
    options: {
        chromaScale?: number
        lightness?: number
    } = {},
): Array<ValidOklchColor> {
    const { chromaScale = 1, lightness = source.l } = options
    const baseHue = source.h ?? 0
    const c = source.c * chromaScale

    return [
        source,
        validateOklchColorJS({
            c,
            h: (baseHue + 72) % 360,
            l: lightness,
            mode: 'oklch',
        }),
        validateOklchColorJS({
            c,
            h: (baseHue + 144) % 360,
            l: lightness,
            mode: 'oklch',
        }),
        validateOklchColorJS({
            c,
            h: (baseHue + 216) % 360,
            l: lightness,
            mode: 'oklch',
        }),
        validateOklchColorJS({
            c,
            h: (baseHue + 288) % 360,
            l: lightness,
            mode: 'oklch',
        }),
    ]
}

/** Generate hexadic harmony - six colors evenly spaced (60° apart) */
export function hexadicHarmony(
    source: ValidOklchColor,
    options: {
        chromaScale?: number
        lightness?: number
    } = {},
): Array<ValidOklchColor> {
    const { chromaScale = 1, lightness = source.l } = options
    const baseHue = source.h ?? 0
    const c = source.c * chromaScale

    return generateRange({
        end: baseHue + 360,
        mode: 'distributed',
        start: baseHue,
        steps: 6,
    }).map((h) =>
        validateOklchColorJS({
            c,
            h: h % 360,
            l: lightness,
            mode: 'oklch',
        }),
    )
}
