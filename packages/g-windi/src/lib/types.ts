import {
    type Oklch,
    type Rgb,
} from 'culori'

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
const chromaPresets: Record<Exclude<ChromaPreset, number>, number> = {
    greyscale: 0,
    muted: 0.4,
    neutral: 0,
    normal: 1,
    subtle: 0.2,
    vibrant: 1.25,
}

export type LightnessPreset = 'dark' | 'mid' | 'light' | number
const lightnessPresets: Record<Exclude<LightnessPreset, number>, number> = {
    dark: 0.3,
    light: 0.85,
    mid: 0.6,
}
