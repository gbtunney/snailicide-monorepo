import { type Oklch, type Rgb } from 'culori'

export type OklchColor = Oklch
export type RgbColor = Rgb

type Branded<T, B> = T & { __brand: B }
export type ValidOklchColor = Branded<OklchColor, 'OklchColor'>

/** Returns a branded CSS string from a ValidOklchColor */
export type ValidCSS = Branded<string, 'OklchCSS'>

// ----------------------
// Chroma + Lightness Presets
// ----------------------

export type ChromaPreset =
    | 'greyscale'
    | 'neutral'
    | 'subtle'
    | 'muted'
    | 'normal'
    | 'vibrant'
    | number

export type LightnessPreset = 'dark' | 'mid' | 'light' | number

// ----------------------
// Range Generation Types
// ----------------------

export type RangeMode = 'clustered' | 'distributed'

export type BaseRangeOptions = {
    mode: RangeMode
    start: number
    steps: number
}

export type ClusteredRangeOptions = BaseRangeOptions & {
    mode: 'clustered'
    spread: number
}

export type DistributedRangeOptions = BaseRangeOptions & {
    mode: 'distributed'
    end: number
}

export type RangeOptions = ClusteredRangeOptions | DistributedRangeOptions

export type SingleStepOptions = RangeOptions & {
    index: number
}

// ----------------------
// Palette Types
// ----------------------

type BasePaletteOptions = {
    chromaScale?: number
    lightness?: number
}

export type AnalogousOptions = BasePaletteOptions & {
    strategy: 'analogous'
    count?: number
    spread: number
}

export type ComplementOptions = BasePaletteOptions & {
    strategy: 'complement'
}

export type SplitComplementOptions = BasePaletteOptions & {
    strategy: 'split'
}

export type TriadicOptions = BasePaletteOptions & {
    strategy: 'triadic'
}

export type TetradicSquareOptions = BasePaletteOptions & {
    strategy: 'square'
}

export type TetradicRectOptions = BasePaletteOptions & {
    strategy: 'rectangle'
}

export type MonochromeOptions = BasePaletteOptions & {
    strategy: 'monochrome'
    count?: number
    lightnessSpread?: number
    center?: number
}

export type ColorWheelOptions = BasePaletteOptions & {
    strategy: 'wheel'
    count?: number
}

export type PaletteOptions =
    | AnalogousOptions
    | ComplementOptions
    | SplitComplementOptions
    | TriadicOptions
    | TetradicSquareOptions
    | TetradicRectOptions
    | MonochromeOptions
    | ColorWheelOptions

export type PaletteFn<T extends PaletteOptions> = (
    source: ValidOklchColor,
    options: T,
) => Array<ValidOklchColor>

// ----------------------------------------
// ColorAide-inspired Harmony Types
// ----------------------------------------

export type HarmonyType =
    | 'monochromatic'
    | 'complementary'
    | 'split-complementary'
    | 'analogous'
    | 'triadic'
    | 'tetradic-square'
    | 'tetradic-rectangular'
    | 'compound'
    | 'double-complement'
    | 'pentadic'
    | 'hexadic'
    | 'wheel'

export type BaseHarmonyOptions = {
    chromaScale?: number
    lightness?: number
}

export type MonochromaticHarmonyOptions = BaseHarmonyOptions & {
    count?: number
    includeBlackWhite?: boolean
    deltaE?: string
}

export type ComplementaryHarmonyOptions = BaseHarmonyOptions

export type SplitComplementaryHarmonyOptions = BaseHarmonyOptions & {
    /** Default 150 degrees (210 degrees offset) */
    angle?: number
}

export type AnalogousHarmonyOptions = BaseHarmonyOptions & {
    /** Default 30 degrees */
    angle?: number
}

export type TriadicHarmonyOptions = BaseHarmonyOptions

export type TetradicSquareHarmonyOptions = BaseHarmonyOptions

export type TetradicRectangularHarmonyOptions = BaseHarmonyOptions & {
    /** Default 30 degrees */
    offset?: number
}

export type CompoundHarmonyOptions = BaseHarmonyOptions & {
    analogousSpread?: number
    analogousCount?: number
}

export type DoubleComplementHarmonyOptions = BaseHarmonyOptions & {
    /** Default 30 degrees */
    offset?: number
}

export type PentadicHarmonyOptions = BaseHarmonyOptions

export type HexadicHarmonyOptions = BaseHarmonyOptions

export type WheelHarmonyOptions = BaseHarmonyOptions & {
    count?: number
}

export type HarmonyOptions =
    | MonochromaticHarmonyOptions
    | ComplementaryHarmonyOptions
    | SplitComplementaryHarmonyOptions
    | AnalogousHarmonyOptions
    | TetradicRectangularHarmonyOptions
    | CompoundHarmonyOptions
    | DoubleComplementHarmonyOptions
    | WheelHarmonyOptions

export type HarmonyFn<T extends HarmonyOptions> = (
    source: ValidOklchColor,
    options: T,
) => Array<ValidOklchColor>

// ----------------------
// Contrast Types
// ----------------------

export type ColorLumMode = 'dark' | 'light'
export type ColorSearchLumDirection = ColorLumMode
export type ContrastPeak = {
    contrastToWhite: number
    contrastToBlack: number
}
export type ContrastPeakInfo = {
    apac: ContrastPeak
    wcag: ContrastPeak
    distance?: ContrastPeak
    luminance: number
    source: ValidOklchColor
}
export type ContrastMode = 'apac' | 'wcag' | 'distance'

export type OklchColorPair = {
    fg_color: ValidOklchColor
    bg_color: ValidOklchColor
}
export type ContrastInfo = {
    apac: number
    wcag: number
    apac_inverted: number
    distance: number
    /** Normalized?: boolean, */
    fallback?: boolean
    mode: ColorLumMode
    // source: ValidOklchColor
    // source: OklchColorPair
}

export type ColorComparatorFunc<
    ReturnType extends ContrastInfo | number = number,
> = (bg_color: ValidOklchColor, fg_color: ValidOklchColor) => ReturnType

export type ContrastPairMeta = ContrastInfo & {
    source: ValidOklchColor
    result: OklchColorPair
    normalized: boolean
}

export type ContrastPairPreset = 'minPair' | 'maxPair' | 'subtle' | 'complement'

export type OklchColorOptions = {
    round?: boolean | number
    clamp?: boolean
}

export type ContrastSearchOptions = {
    threshold?: number
    step?: number
    mode?: 'apac' | 'wcag' | 'distance'
    verbose?: boolean
}
export type ColorPairFinderOptions = {
    normalize?: boolean
} & OklchColorOptions &
    ContrastSearchOptions
