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
export type ContrastMode = 'apac' | 'wcag'

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

export type OklchColorOptions = {
    round?: boolean | number
    clamp?: boolean
}

export type ContrastSearchOptions = {
    threshold?: number
    step?: number
    mode?: 'apac' | 'wcag'
    verbose?: boolean
}
export type ColorPairFinderOptions = {
    normalize?: boolean
} & OklchColorOptions &
    ContrastSearchOptions
