import { type Color, interpolate } from 'culori'
import { PALETTE_DEFAULTS } from './constants.js'
import type {
    AnalogousOptions,
    ComplementOptions,
    MonochromeOptions,
    RangeMode,
    RangeOptions,
    SingleStepOptions,
    SplitComplementOptions,
    TetradicSquareOptions,
    TriadicOptions,
    ValidOklchColor,
} from './types.js'
import { validateOklchColor } from './validators.js'

/** Generate range of values ensuring exact number of steps */
export function generateRange(options: RangeOptions): Array<number> {
    const { mode, start, steps } = options

    if (steps <= 0) return []
    if (steps === 1) return [start]

    if (mode === 'clustered') {
        const { spread } = options
        const stepSize = spread / (steps - 1)
        const rangeStart = start - spread / 2

        // Generate exactly 'steps' values
        return Array.from(
            { length: steps },
            (_, i) => rangeStart + i * stepSize,
        )
    }

    if (mode === 'distributed') {
        const { end } = options
        const stepSize = (end - start) / (steps - 1)

        // Generate exactly 'steps' values
        return Array.from({ length: steps }, (_, i) => start + i * stepSize)
    }

    throw new Error(`Invalid mode: ${mode}`)
}

/** Get a single step value from a range */
export function getSingleStep(options: SingleStepOptions): number {
    const { index } = options
    const range = generateRange(options)

    if (index < 0 || index >= range.length) {
        throw new Error(`Index ${index} out of range [0, ${range.length})`)
    }

    // Since we've validated the index bounds, this should be safe
    const value = range[index]
    if (value === undefined) {
        throw new Error(`Unexpected undefined value at index ${index}`)
    }
    return value
}

/** @file Color Mix Utility Functions Mix colors and create gradients with OKLCH color space */

/** Mix two colors with specified steps */
export function mixColors(
    from: string | Color,
    to: string | Color,
    steps = 5,
): Array<ValidOklchColor> {
    const start = validateOklchColor(from)
    const end = validateOklchColor(to)
    const mixer = interpolate([start, end], 'oklch')

    // Use generateRange for consistent step generation
    const range = generateRange({
        end: 1,
        mode: 'distributed',
        start: 0,
        steps,
    })

    return range.map((t) => validateOklchColor(mixer(t)))
}

/** Gradient Helpers */

/** Get tints of a color (mix with white) */
export function getTints(
    source: ValidOklchColor,
    steps = 5,
): Array<ValidOklchColor> {
    return mixColors(source, 'white', steps)
}

/** Get shades of a color (mix with black) */
export function getShades(
    source: ValidOklchColor,
    steps = 5,
): Array<ValidOklchColor> {
    return mixColors(source, 'black', steps)
}

/** Get tones of a color (mix with desaturated version) */
export function getTones(
    source: ValidOklchColor,
    steps = 5,
): Array<ValidOklchColor> {
    const parsed = validateOklchColor(source)
    const gray = { ...parsed, c: 0 }
    return mixColors(parsed, gray, steps)
}

/** Generate hue variants using the flexible range system */
export function getHueVariants(
    h: number,
    options: {
        count: number
        spread?: number
        mode?: RangeMode
    },
): Array<number> {
    const { count, mode = 'clustered', spread } = options

    if (count <= 1) return [h % 360]

    if (mode === 'distributed') {
        // For distributed hue variants, we want evenly spaced points around the circle
        // Generate count evenly spaced hues starting from h
        const stepSize = 360 / count
        return Array.from({ length: count }, (_, i) => (h + i * stepSize) % 360)
    }

    if (spread === undefined) {
        throw new Error('spread is required for clustered mode')
    }

    const range = generateRange({
        mode: 'clustered',
        spread,
        start: h,
        steps: count,
    })
    return range.map((val) => (val + 360) % 360)
}

/** Generate lightness variants using the flexible range system */
export function getLightnessVariants(
    l: number,
    options: {
        count: number
        spread?: number
        mode?: RangeMode
        end?: number
    },
): Array<number> {
    const { count, end, mode = 'clustered', spread } = options

    if (count <= 1) return [Math.max(0, Math.min(1, l))]

    if (mode === 'distributed') {
        if (end === undefined) {
            throw new Error('end is required for distributed lightness mode')
        }
        const range = generateRange({
            end,
            mode: 'distributed',
            start: l,
            steps: count,
        })
        return range.map((val) => Math.max(0, Math.min(1, val)))
    }

    if (spread === undefined) {
        throw new Error('spread is required for clustered lightness mode')
    }

    const range = generateRange({
        mode: 'clustered',
        spread,
        start: l,
        steps: count,
    })
    return range.map((val) => Math.max(0, Math.min(1, val)))
}

/** Generate chroma variants using the flexible range system */
export function getChromaVariants(
    c: number,
    options: {
        count: number
        spread?: number
        mode?: RangeMode
        end?: number
        max?: number
    },
): Array<number> {
    const { count, end, max = 0.4, mode = 'clustered', spread } = options

    if (count <= 1) return [Math.max(0, Math.min(max, c))]

    if (mode === 'distributed') {
        if (end === undefined) {
            throw new Error('end is required for distributed chroma mode')
        }
        const range = generateRange({
            end,
            mode: 'distributed',
            start: c,
            steps: count,
        })
        return range.map((val) => Math.max(0, Math.min(max, val)))
    }

    if (spread === undefined) {
        throw new Error('spread is required for clustered chroma mode')
    }

    const range = generateRange({
        mode: 'clustered',
        spread,
        start: c,
        steps: count,
    })
    return range.map((val) => Math.max(0, Math.min(max, val)))
}

/** Create a complete color palette using the base color and range variants */
export function createColorPalette(
    source: ValidOklchColor,
    options: {
        hueOptions?: { count: number; spread?: number; mode?: RangeMode }
        lightnessOptions?: {
            count: number
            spread?: number
            mode?: RangeMode
            end?: number
        }
        chromaOptions?: {
            count: number
            spread?: number
            mode?: RangeMode
            end?: number
            max?: number
        }
    },
): Array<ValidOklchColor> {
    const { chromaOptions, hueOptions, lightnessOptions } = options
    const baseHue = source.h ?? 0
    const baseLightness = source.l
    const baseChroma = source.c

    const colors: Array<ValidOklchColor> = []

    // Generate variants based on provided options
    if (hueOptions) {
        const hues = getHueVariants(baseHue, hueOptions)
        colors.push(
            ...hues.map((h) =>
                validateOklchColor({
                    ...source,
                    h,
                    mode: 'oklch',
                }),
            ),
        )
    }

    if (lightnessOptions) {
        const lightnesses = getLightnessVariants(
            baseLightness,
            lightnessOptions,
        )
        colors.push(
            ...lightnesses.map((l) =>
                validateOklchColor({
                    ...source,
                    l,
                    mode: 'oklch',
                }),
            ),
        )
    }

    if (chromaOptions) {
        const chromas = getChromaVariants(baseChroma, chromaOptions)
        colors.push(
            ...chromas.map((c) =>
                validateOklchColor({
                    ...source,
                    c,
                    mode: 'oklch',
                }),
            ),
        )
    }

    // If no specific options provided, return the source color
    return colors.length > 0 ? colors : [source]
}

/** Palette Strategy Functions */

/** Generate analogous color palette */
function getAnalogousPalette(
    source: ValidOklchColor,
    options: AnalogousOptions,
): Array<ValidOklchColor> {
    const {
        chromaScale = PALETTE_DEFAULTS.CHROMA_SCALE,
        count = PALETTE_DEFAULTS.CLUSTERED_COUNT,
        lightness = source.l,
        spread,
    } = options
    const _hue_value: number = !source.h ? 0 : source.h

    const hues = getHueVariants(_hue_value, {
        count,
        mode: 'clustered',
        spread,
    })
    const c = source.c * chromaScale
    return hues.map((h) =>
        validateOklchColor({ c, h, l: lightness, mode: 'oklch' }),
    )
}

/** Generate monochrome color palette */
function getMonochromePalette(
    source: ValidOklchColor,
    options: MonochromeOptions,
): Array<ValidOklchColor> {
    const {
        center = source.l,
        chromaScale = PALETTE_DEFAULTS.CHROMA_SCALE,
        count = PALETTE_DEFAULTS.MONOCHROME_COUNT,
        lightnessSpread = PALETTE_DEFAULTS.LIGHTNESS_SPREAD,
    } = options

    const lightnesses = getLightnessVariants(center, {
        count,
        mode: 'clustered',
        spread: lightnessSpread,
    })

    const c = source.c * chromaScale
    const h = source.h ?? 0

    return lightnesses.map((l) =>
        validateOklchColor({ c, h, l, mode: 'oklch' }),
    )
}

/** Generate complementary color palette */
function getComplementPalette(
    source: ValidOklchColor,
    options: ComplementOptions,
): Array<ValidOklchColor> {
    const {
        chromaScale = PALETTE_DEFAULTS.CHROMA_SCALE,
        lightness = source.l,
    } = options
    const baseHue = source.h ?? 0
    const c = source.c * chromaScale

    return [
        source,
        validateOklchColor({
            c,
            h: (baseHue + 180) % 360,
            l: lightness,
            mode: 'oklch',
        }),
    ]
}

/** Generate split complementary color palette */
function getSplitComplementPalette(
    source: ValidOklchColor,
    options: SplitComplementOptions,
): Array<ValidOklchColor> {
    const {
        chromaScale = PALETTE_DEFAULTS.CHROMA_SCALE,
        lightness = source.l,
    } = options
    const baseHue = source.h ?? 0
    const c = source.c * chromaScale

    return [
        source,
        validateOklchColor({
            c,
            h: (baseHue + 150) % 360,
            l: lightness,
            mode: 'oklch',
        }),
        validateOklchColor({
            c,
            h: (baseHue + 210) % 360,
            l: lightness,
            mode: 'oklch',
        }),
    ]
}

/** Generate triadic color palette */
function getTriadicPalette(
    source: ValidOklchColor,
    options: TriadicOptions,
): Array<ValidOklchColor> {
    const {
        chromaScale = PALETTE_DEFAULTS.CHROMA_SCALE,
        lightness = source.l,
    } = options
    const baseHue = source.h ?? 0
    const c = source.c * chromaScale

    return [
        source,
        validateOklchColor({
            c,
            h: (baseHue + 120) % 360,
            l: lightness,
            mode: 'oklch',
        }),
        validateOklchColor({
            c,
            h: (baseHue + 240) % 360,
            l: lightness,
            mode: 'oklch',
        }),
    ]
}

/** Generate tetradic square color palette */
function getTetradicSquarePalette(
    source: ValidOklchColor,
    options: TetradicSquareOptions,
): Array<ValidOklchColor> {
    const {
        chromaScale = PALETTE_DEFAULTS.CHROMA_SCALE,
        lightness = source.l,
    } = options
    const baseHue = source.h ?? 0
    const c = source.c * chromaScale

    if (options.strategy === 'square') {
        /** Square: 90° intervals */
        return [
            source,
            validateOklchColor({
                c,
                h: (baseHue + 90) % 360,
                l: lightness,
                mode: 'oklch',
            }),
            validateOklchColor({
                c,
                h: (baseHue + 180) % 360,
                l: lightness,
                mode: 'oklch',
            }),
            validateOklchColor({
                c,
                h: (baseHue + 270) % 360,
                l: lightness,
                mode: 'oklch',
            }),
        ]
    } else {
        /** Tetradic: 60°, 180°, 240° (creates rectangle) */
        return [
            source,
            validateOklchColor({
                c,
                h: (baseHue + 60) % 360,
                l: lightness,
                mode: 'oklch',
            }),
            validateOklchColor({
                c,
                h: (baseHue + 180) % 360,
                l: lightness,
                mode: 'oklch',
            }),
            validateOklchColor({
                c,
                h: (baseHue + 240) % 360,
                l: lightness,
                mode: 'oklch',
            }),
        ]
    }
}

/** Additional Harmony Palettes (from ColorAide) */

/** Generate a compound palette (analogous + complement) */
export function getCompoundPalette(
    source: ValidOklchColor,
    options: {
        chromaScale?: number
        lightness?: number
        analogousSpread?: number
        analogousCount?: number
    } = {},
): Array<ValidOklchColor> {
    const {
        analogousCount = 3,
        analogousSpread = 60,
        chromaScale = PALETTE_DEFAULTS.CHROMA_SCALE,
        lightness = source.l,
    } = options

    const baseHue = source.h ?? 0
    const c = source.c * chromaScale

    // Get analogous colors
    const analogous = getAnalogousPalette(source, {
        chromaScale,
        count: analogousCount,
        lightness,
        spread: analogousSpread,
        strategy: 'analogous',
    })

    // Add complement
    const complement = validateOklchColor({
        c,
        h: (baseHue + 180) % 360,
        l: lightness,
        mode: 'oklch',
    })

    return [...analogous, complement]
}

/** Generate a double complement palette */
export function getDoubleComplementPalette(
    source: ValidOklchColor,
    options: {
        chromaScale?: number
        lightness?: number
        offset?: number
    } = {},
): Array<ValidOklchColor> {
    const {
        chromaScale = PALETTE_DEFAULTS.CHROMA_SCALE,
        lightness = source.l,
        offset = 30,
    } = options

    const baseHue = source.h ?? 0
    const c = source.c * chromaScale

    return [
        validateOklchColor({
            c,
            h: baseHue,
            l: lightness,
            mode: 'oklch',
        }),
        validateOklchColor({
            c,
            h: (baseHue + offset) % 360,
            l: lightness,
            mode: 'oklch',
        }),
        validateOklchColor({
            c,
            h: (baseHue + 180) % 360,
            l: lightness,
            mode: 'oklch',
        }),
        validateOklchColor({
            c,
            h: (baseHue + 180 + offset) % 360,
            l: lightness,
            mode: 'oklch',
        }),
    ]
}

/** Generate a pentadic palette (5 colors evenly spaced) */
export function getPentadicPalette(
    source: ValidOklchColor,
    options: {
        chromaScale?: number
        lightness?: number
    } = {},
): Array<ValidOklchColor> {
    const {
        chromaScale = PALETTE_DEFAULTS.CHROMA_SCALE,
        lightness = source.l,
    } = options
    const baseHue = source.h ?? 0
    const c = source.c * chromaScale

    return Array.from({ length: 5 }, (_, i) => {
        const hue = (baseHue + i * 72) % 360
        return validateOklchColor({
            c,
            h: hue,
            l: lightness,
            mode: 'oklch',
        })
    })
}

/** Generate a hexadic palette (6 colors evenly spaced) */
export function getHexadicPalette(
    source: ValidOklchColor,
    options: {
        chromaScale?: number
        lightness?: number
    } = {},
): Array<ValidOklchColor> {
    const {
        chromaScale = PALETTE_DEFAULTS.CHROMA_SCALE,
        lightness = source.l,
    } = options
    const baseHue = source.h ?? 0
    const c = source.c * chromaScale

    return Array.from({ length: 6 }, (_, i) => {
        const hue = (baseHue + i * 60) % 360
        return validateOklchColor({
            c,
            h: hue,
            l: lightness,
            mode: 'oklch',
        })
    })
}
