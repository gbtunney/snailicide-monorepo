
import type {
    ChromaPreset,
    LightnessPreset,
    ValidOklchColor,
} from './types.js'
import { validateOklchColor } from './validators.js'

// ----------------------
// Chroma + Lightness Presets
// ----------------------
const chromaPresets: Record<Exclude<ChromaPreset, number>, number> = {
    greyscale: 0,
    muted: 0.4,
    neutral: 0,
    normal: 1,
    subtle: 0.2,
    vibrant: 1.25,
}

const lightnessPresets: Record<Exclude<LightnessPreset, number>, number> = {
    dark: 0.3,
    light: 0.85,
    mid: 0.6,
}

/**
 * Adjust Functions
 */
export const adjustChroma = (
    color: ValidOklchColor,
    adjustment: number | ChromaPreset = 0,
    relative: boolean = true,
): ValidOklchColor => {
    const _relative = typeof adjustment !== 'number' ? false : relative
    const factor: number =
        typeof adjustment === 'number' ? adjustment : chromaPresets[adjustment]
    const chroma = _relative ? color.c * (1 + factor) : factor
    const _result: ValidOklchColor = validateOklchColor({ ...color, c: chroma })
    return _result
}

export const adjustLightness = (
    color: ValidOklchColor,
    adjustment: number | LightnessPreset = 0,
    relative: boolean = true,
): ValidOklchColor => {
    const _relative = typeof adjustment !== 'number' ? false : relative
    const _adjustment =
        typeof adjustment === 'number'
            ? adjustment
            : lightnessPresets[adjustment]

    const l: number =
        _relative === true ? color.l * (1 + _adjustment) : _adjustment
    const _result: ValidOklchColor = validateOklchColor({
        ...color,
        l: Math.min(1, Math.max(0, l)),
    })
    return _result
}

export const adjustHue = (
    color: ValidOklchColor,
    degrees: number = 0,
    relative: boolean = true,
): ValidOklchColor => {
    const _hue_value: number = !color.h ? 0 : color.h
    const h = (_hue_value + degrees + 360) % 360
    const _result: ValidOklchColor = validateOklchColor({ ...color, h })
    return _result
}
