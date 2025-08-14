import { inRange } from 'ramda-adjunct'
import { RANGE_DEGREE, RANGE_FLOAT } from './constants.js'
import { validateOklchColorJS } from './core.js'
import {
    ChromaPreset,
    ColorJSInstance,
    LightnessPreset,
    Range,
    RangeType,
    ValidOklchColor,
} from './types.js'
import { getRange, mapRange } from './utilities.js'

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

/** Adjust Functions */
export const adjustChroma = (
    color: ValidOklchColor,
    adjustment: number | ChromaPreset = 0,
    relative: boolean = true,
): ValidOklchColor => {
    const _relative = typeof adjustment !== 'number' ? false : relative
    const factor: number =
        typeof adjustment === 'number' ? adjustment : chromaPresets[adjustment]
    const chroma = _relative ? color.c * (1 + factor) : factor
    const _result = validateOklchColorJS({ ...color, c: chroma })
    return _result
}

/**
 *tthis is a wrapper on ccolor js
 */
export const lighten = (
    color: ColorJSInstance,
    value: Parameters<ColorJSInstance['lighten']>[0],
): ValidOklchColor => {
    return validateOklchColorJS(color.clone().lighten(value))
}
export const darken = (
    color: ColorJSInstance,
    value: Parameters<ColorJSInstance['darken']>[0],
): ValidOklchColor => {
    return validateOklchColorJS(color.clone().darken(value))
}

export const setLightness = (
    color: ValidOklchColor,
    value: number = 0,
    range: RangeType<'deg'> | Range = 'float',
): ValidOklchColor => {
    const _range = typeof range === 'string' ? getRange(range) : range
    return validateOklchColorJS(
        color.clone().set('l', mapRange(value, _range, RANGE_FLOAT)),
    )
}

/**
 *@TODO make thiis do scale.
 */
export const shiftLightness = (
    color: ValidOklchColor,
    value: number = 0,
    range: RangeType<'deg'> | Range = 'float',
    mode: 'scale' | 'linear', //idk what to call this?
): ValidOklchColor => {
    const _range = typeof range === 'string' ? getRange(range) : range
    /**
     *this is in float range
     */
    const currentLightness: number = color.l ?? 0 
    const mappedAdjustment = mapRange(value, _range, RANGE_FLOAT)
    return validateOklchColorJS(
        color.clone().set('l', currentLightness + mappedAdjustment),
    )
}
/**
 * const trtt = lighten("2")
 */
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
    //this will be number in range of [0,1]
    let newLightnessValue: number = color.l
    //try to see what range it is iin ? i f itt is a decimal or in reasonable range , 4 is an arbiirarynumber
    if (
        _adjustment !== 0 &&
        inRange(-1, 4, _adjustment) /*&& isFloat(_adjustment)*/
    ) {
        const _mappedAdjValue = mapRange(
            _adjustment,
            { max: 1, min: 0 },
            { max: 2, min: 1 },
        )
        if (_relative) {
            newLightnessValue *= _mappedAdjValue
        } else {
            newLightnessValue = _adjustment
        }

        //assume it is a perccent here i guess??
    } else if (inRange(0, 200, _adjustment)) {
        const _lightnessFloattToPercent = mapRange(
            color.l,
            { max: 1, min: 0 },
            { max: 100, min: 0 },
        )
        if (_relative) {
            //todo: i dont knoow what to do with this really?
            if (_lightnessFloattToPercent + _adjustment <= 100) {
                //map bacck tto float
                newLightnessValue = mapRange(
                    _lightnessFloattToPercent + _adjustment,
                    { max: 100, min: 0 },
                    { max: 1, min: 0 },
                )
                console.log(
                    '--relative percent lightness',
                    color.l,
                    ' float to percent',
                    _lightnessFloattToPercent,
                    'with adjustment',
                    newLightnessValue,
                )
            } else {
                //figur out what to do with this. ??
                //  console.error("!!!error with relative percentage value" ,color.l, " After","adjustment", _adjustment)
            }
        } else {
            //treplace the value and map to float
            newLightnessValue = mapRange(
                _adjustment,
                { max: 100, min: 0 },
                { max: 1, min: 0 },
            )
        }
    }
    //thhiis iis going tto need to be clamped maybe?
    if (!inRange(0, 1, newLightnessValue)) {
        throw new TypeError(
            `NWW Lightness Value is not in range 0,1 !! ${newLightnessValue}`,
        )
    }

    return validateOklchColorJS(color.clone().set('l', newLightnessValue))
}

export const setHue = (
    color: ValidOklchColor,
    value: number = 0,
    range: RangeType<'scale'> | Range = 'float',
): ValidOklchColor => {
    const _range = typeof range === 'string' ? getRange(range) : range
    const mappedHue = mapRange(value, _range, RANGE_DEGREE)
    console.log('MAPPED HUE IS ', mappedHue, 'RANGE IS ', _range)
    return validateOklchColorJS(color.clone().set('h', mappedHue))
}

export const shiftHue = (
    color: ValidOklchColor,
    value: number = 0,
    range: RangeType<'scale'> | Range = 'float',
): ValidOklchColor => {
    const _range = typeof range === 'string' ? getRange(range) : range
    const currentHue: number = color.h ?? 0
    const mappedHue = mapRange(currentHue, RANGE_DEGREE, _range)
    return validateOklchColorJS(
        color
            .clone()
            .set('h', mapRange(mappedHue + value, _range, RANGE_DEGREE)),
    )
}

/**
 *This is the older function
 */
export const adjustHue = (
    color: ValidOklchColor,
    adjustment: number = 0,
    relative: boolean = true,
): ValidOklchColor => {
    const currentHue: number = color.h ?? 0

    /** Set absolute hue */
    const h = relative
        ? (currentHue + adjustment + 360) % 360 // Add to current hue
        : (adjustment + 360) % 360

    const _result = validateOklchColorJS({ ...color, h })
    return _result
}
