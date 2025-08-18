import { inRange } from 'ramda-adjunct'
import {
    RANGE_DEGREE,
    RANGE_FLOAT,
    RANGE_PERCENT,
    RANGE_SCALE,
} from './constants.js'
import {
    normalizeCoordinate,
    validateOklchColorJS,
} from './core.js'
import {
    ChromaPreset,
    ColorJSInstance,
    ExpandedCoordinate,
    LightnessPreset,
    Range,
    RangeType,
    ValidOklchColor,
} from './types.js'
import { clampInRange, getRange, mapRange, wrapInRange } from './utilities.js'

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

/** Adjusts the chroma value of a color, either relatively or absolutely. */
export const adjustChroma = (
    color: ValidOklchColor,
    adjustment: number | ChromaPreset = 0,
    relative: boolean = true,
): ValidOklchColor => {
    const _relative = typeof adjustment !== 'number' ? false : relative
    const factor: number =
        typeof adjustment === 'number' ? adjustment : chromaPresets[adjustment]
    const currentChroma: number = color.c ?? 0

    // Calculate the new chroma value
    const newChroma = _relative ? currentChroma * (1 + factor) : factor
    // Use colorjs.io's set function to update the chroma
    const updatedColor = color.clone().set('c', newChroma)

    // Clamp the color to ensure it's valid
    return validateOklchColorJS(updatedColor)
}

/** Lightens a color by increasing its lightness value. */
export const lighten = (
    color: ColorJSInstance,
    value: Parameters<ColorJSInstance['lighten']>[0],
): ValidOklchColor => {
    return validateOklchColorJS(color.clone().lighten(value))
}

/** Darkens a color by decreasing its lightness value. */
export const darken = (
    color: ColorJSInstance,
    value: Parameters<ColorJSInstance['darken']>[0],
): ValidOklchColor => {
    return validateOklchColorJS(color.clone().darken(value))
}

/** Shifts the lightness value of a color by a specified amount. */
export const shiftLightness = (
    color: ValidOklchColor,
    value: number = 0,
    range: RangeType<'deg'> | Range = 'float',
    mode: 'scale' | 'linear' = 'linear', //idk what to call this?
): ValidOklchColor => {
    const _range = typeof range === 'string' ? getRange(range) : range
    /** This is in float range */
    const currentLightness: number = color.l ?? 0
    const mappedAdjustment = mapRange(value, _range, RANGE_FLOAT)
    return validateOklchColorJS(
        color.clone().set('l', currentLightness + mappedAdjustment),
    )
}

/** Adjusts the lightness value of a color, either relatively or absolutely. */
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
                    RANGE_PERCENT,
                    RANGE_FLOAT,
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
                RANGE_PERCENT,
                RANGE_FLOAT,
            )
        }
    }
    //thhiis iis going tto need to be clamped maybe?
    if (!inRange(0, 1, newLightnessValue)) {
        newLightnessValue = clampInRange(newLightnessValue, RANGE_FLOAT)
        // throw new TypeError(
        //     `New Lightness Value is not in range 0,1 !! ${newLightnessValue}`,
        // )
    }

    return validateOklchColorJS(color.clone().set('l', newLightnessValue))
}

export const setValue = (
    color: ValidOklchColor,
    value: ExpandedCoordinate,
    _type: 'l' | 'c' | 'h' = 'l',
): ValidOklchColor => {
    const _index = _type === 'l' ? 0 : _type === 'c' ? 1 : 2
    const _value: number = normalizeCoordinate(value, _index)
    return validateOklchColorJS(color.clone().set(_type, _value))
}

/** Set the chroma value of a color. */
export const setChroma = (
    color: ValidOklchColor,
    value: ExpandedCoordinate,
): ValidOklchColor => setValue(color, value, 'c')

export const setLightness = (
    color: ValidOklchColor,
    value: ExpandedCoordinate,
): ValidOklchColor => setValue(color, value, 'l')

export const setHue = (
    color: ValidOklchColor,
    value: ExpandedCoordinate,
): ValidOklchColor => setValue(color, value, 'h')

/** Shift the chroma value of a color. */
export const shiftChroma = (
    color: ValidOklchColor,
    value: number,
    operation: 'scale' | 'linear' = 'scale',
    /* toggle to adjust the chroma value to a reasonable number like 1 in [0,1] === .3[0,.3]*/
    adjustValue: boolean = true,
    /* @todo: future improvement figure out how to do this with diifferent ranges, only works with float currently */
    range: RangeType<'deg'> | Range = 'float',
): ValidOklchColor => {
    const _range = typeof range === 'string' ? getRange(range) : range
    //convert all to float
    let _chromaAdjValue: number = mapRange(value, _range, RANGE_FLOAT)
    const currentChroma: number = color.get('c') ?? 0
    let resultChroma: number = currentChroma
    //this scales a number in order to make it easier to change . like 1 in [0,1] === .3[0,.3]
    _chromaAdjValue =
        adjustValue === true
            ? mapRange(_chromaAdjValue, RANGE_FLOAT, { max: 0.33, min: 0 })
            : _chromaAdjValue
    //convert to scaled range
    if (operation === 'scale') {
        //this shifts the value of .5[0,1] == 1.5[1,2] so zeros dont break? and can use .2 (-.2 would be .04
        _chromaAdjValue = mapRange(_chromaAdjValue, RANGE_FLOAT, RANGE_SCALE)
        resultChroma = wrapInRange(
            (currentChroma == 0 ? 1 : currentChroma) * _chromaAdjValue,
            RANGE_FLOAT,
        )
    } else {
        //if not in multiply mode, we add.
        resultChroma = currentChroma + _chromaAdjValue
    }
    //convert  back to oriigonal range (todo: )
    resultChroma = mapRange(resultChroma, RANGE_FLOAT, _range)
    const newObj = validateOklchColorJS(color.clone().set('c', resultChroma))
    console.log(
        'adjustment is converted orig',
        currentChroma,
        'adjustment initial',
        value,
        'scaled',
        _chromaAdjValue,
        'iafter',
        resultChroma,
    )
    console.log('GET NEW CHROMA ', newObj.get('c'))
    return newObj
}

export const shiftHue2 = (
    color: ValidOklchColor,
    value: ExpandedCoordinate,
    _type: 'l' | 'c' | 'h' = 'l',
) => {
    const _normalizedAdjValue = normalizeCoordinate(value, 2)
    const currentHue = color.get('h')
    const newVal = currentHue + _normalizedAdjValue

    return validateOklchColorJS(
        color.clone().set('h', wrapInRange(newVal, RANGE_DEGREE)),
    )
}

/** Shifts the hue value of a color by a specified amount. */
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

/** Adjusts the hue value of a color, either relatively or absolutely. */
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
    return validateOklchColorJS(color.clone().set('h', h))
}
