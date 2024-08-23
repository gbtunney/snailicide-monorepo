import type { Chromable, Color, ColorFormat } from 'chroma.ts'
import * as chroma from 'chroma.ts'
import { repeat } from 'ramda'

import { isCSSColorSpecial } from './../browser/css.js'
import { tg } from './../typeguard/index.js'

/**
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV
 * [hueDegrees, saturation1, value1]
 */
type HueDegrees = number
type Saturation = number
type Luminance = number
type HSL = [HueDegrees, Saturation, Luminance]
const validate = (value: Chromable): boolean => {
    try {
        chroma.color(value)
        return true
    } catch (exception) {
        return false
    }
}

/** @category Validator */
export const isValidColor = <Type extends Chromable>(
    value: Type,
): value is Type => {
    return validate(value)
}

export const getChromaColor = (value: Chromable): Color | undefined =>
    isValidColor(value) ? chroma.color(value) : undefined

export const getColor = (
    value: Chromable,
    format: ColorFormat = 'hsl',
): Color | undefined => {
    if (isValidColor(value)) {
        return chroma.color(value, format)
    }
    return undefined
}

const rotateHueFunction = (hue: number, incrementValue: number): number => {
    //todo: chheck to see if inc is an integer.
    return (hue + incrementValue) % 360
}
//RA.rangeStep(5, 0, 20); // => [0, 5, 10, 15]
export const complement = (
    color: Chromable,
    format: ColorFormat = 'hsl',
): Color => {
    const [hue, sat, luminance]: HSL = chroma.color(color).hsl()
    return chroma.color([rotateHueFunction(hue, 180), sat, luminance], format)
}
export const triad = (
    color: Chromable,
    format: ColorFormat = 'hsl',
): Array<Color> => {
    const [hue, sat, luminance]: HSL = chroma.color(color).hsl()
    return [hue, rotateHueFunction(hue, 120), rotateHueFunction(hue, 240)].map(
        (hue_step) => chroma.color([hue_step, sat, luminance], format),
    )
}
export const tetrad = (
    color: Chromable,
    format: ColorFormat = 'hsl',
): Array<Color> => {
    const [hue, sat, luminance]: HSL = chroma.color(color).hsl()
    return [
        hue,
        rotateHueFunction(hue, 90),
        rotateHueFunction(hue, 180),
        rotateHueFunction(hue, 270),
    ].map((hue_step) => chroma.color([hue_step, sat, luminance], format))
}
export const splitComplement = (
    color: Chromable,
    format: ColorFormat = 'hsl',
): Array<Color> => {
    const [hue, sat, luminance]: HSL = chroma.color(color).hsl()
    return [hue, rotateHueFunction(hue, 72), rotateHueFunction(hue, 216)].map(
        (hue_step) => chroma.color([hue_step, sat, luminance], format),
    )
}
export const analogous = (
    color: Chromable,
    results = 6,
    slices = 30,
): Array<Color> => {
    const [hue, sat, luminance]: HSL = chroma.color(color).hsl()
    return [hue, rotateHueFunction(hue, 72), rotateHueFunction(hue, 216)].map(
        (hue_step) => chroma.color([hue_step, sat, luminance], 'hsl'),
    )
}

/*export const getChromaColor = (
    color: Chromable,
    format?: chroma.ColorFormat,
): ChromaColorPalatte | undefined => {
    if (!validate(color)) return undefined

    const chroma_color = chroma.color(color) //(validate(color)) ? chroma.color(color) : undefined

    const [hue, saturation, lightness] = chroma_color.hsl()
    return {
        chroma: chroma_color,
        hue,
        saturation,
        lightness,
        textColor: chroma_color.textColor(),
        luminance: chroma_color.luminance(),
        temperature: chroma_color.temperature(),
        complement: complement(chroma_color),
        split_complement: split_complement(chroma_color),
        triad: triad(chroma_color),
        tetrad: tetrad(chroma_color),
        analogous: analogous(chroma_color),
    }
}*/

const chromaColorBrighten = (
    value: string | undefined,
    amount: number,
): Color | undefined => {
    if (tg.isUndefined(value) || isCSSColorSpecial(value)) return undefined
    if (tg.isNotUndefined<string>(value)) {
        if (isValidColor(value)) {
            //TODO:make typegaurd for chroma
            return chroma.color(value).darker(3)
        }
    }
    return undefined
}

/*Inputs: BaseColor, HueVariation

Color1 = BaseColor
Color2 = ColorFromHSL(Hue(BaseColor) + HueVariation, Saturation(BaseColor), Lightness(BaseColor))
Color3 = ColorFromHSL(Hue(BaseColor) - HueVariation, Saturation(BaseColor), Lightness(BaseColor))
  */
function _analogous(color: Chromable, results: number, slices: number): void {
    /*results = results || 6;
        slices = slices || 30;

        var hsl = tinycolor(color).toHsl();
        var part = 360 / slices;
        var ret = [tinycolor(color)];

        for (hsl.h = ((hsl.h - (part * results >> 1)) + 720) % 360; --results; ) {
            hsl.h = (hsl.h + part) % 360;
            ret.push(tinycolor(hsl));
        }
        return ret;*/
}

function monochromatic(
    color: Chromable,
    format?: chroma.ColorFormat,
    results = 6,
): void {
    // const [h,s,v] = chroma.color(color).hsv()
    const modification = 1 / results
    const explodeColorByResultsArr = repeat(chroma.color(color).hsv(), results)
    const [hue, sat, luminance]: HSL = chroma.color(color).hsl()

    const new_luminance = (luminance + modification) % 1

    /*const newexplodeColorByResultsArr = explodeColorByResultsArr.map( (value,index)=>{
            const [h,s,v] =value
            const newv = (v + modification) % 1;
            v = (v + modification) % 1;
        } )*/
    //reduce function idk???
}

function _monochromatic(color: Chromable, results: number): void {
    /* results = results || 6;
         var hsv = tinycolor(color).toHsv();
         var h = hsv.h, s = hsv.s, v = hsv.v;
         var ret = [];
         var modification = 1 / results;
         while (results--) {
             ret.push(tinycolor({ h: h, s: s, v: v}));
             v = (v + modification) % 1;
         }*/
}

export type ChromaColorPalatte = {
    chroma: Color
    textColor: Color
    hue: number
    saturation: number
    lightness: number
    luminance: number
    temperature: number
    //palattes.
    complement: Color
    split_complement: Array<Color>
    triad: Array<Color>
    tetrad: Array<Color>
    analogous: Array<Color>
}
