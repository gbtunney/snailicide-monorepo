import * as chroma from 'chroma.ts'
import type { Chromable, Color, ColorFormat, Scale, ColorMode } from 'chroma.ts'
import { repeat } from 'ramda'
import { tg } from './../typeguard/index.js'
import { tg_isCSSColorSpecial } from './css.js'

type HSL = [number, number, number]
/**
 * @see https://en.wikipedia.org/wiki/HSL_and_HSV
 * [hueDegrees, saturation1, value1]
 */

const validate = (color: Chromable): boolean => {
    // todo: fix return chromajs.valid(color)
    console.log('color is ', chroma.color('palegreen'))
    chroma.color('palegreen')
    return true
}

/*
 const getChromaColor = (color: Chromable, format?: chroma.ColorFormat) => {
        if (!validate(color)) return
        const chroma_color = chroma.color(color)
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
    }
*/

const rotateHueFunction = (hue: number, incrementValue: number): number => {
    //todo: chheck to see if inc is an integer.
    return (hue + incrementValue) % 360
}
//RA.rangeStep(5, 0, 20); // => [0, 5, 10, 15]
const complement = (color: Chromable) => {
    const [hue, sat, luminance]: HSL = chroma.color(color).hsl()
    return chroma.color([rotateHueFunction(hue, 180), sat, luminance], 'hsl')
}
const triad = (color: Chromable, format?: chroma.ColorFormat) => {
    const [hue, sat, luminance]: HSL = chroma.color(color).hsl()
    return [hue, rotateHueFunction(hue, 120), rotateHueFunction(hue, 240)].map(
        (hue_step) => chroma.color([hue_step, sat, luminance], 'hsl'),
    )
}
const tetrad = (color: Chromable) => {
    const [hue, sat, luminance]: HSL = chroma.color(color).hsl()
    return [
        hue,
        rotateHueFunction(hue, 90),
        rotateHueFunction(hue, 180),
        rotateHueFunction(hue, 270),
    ].map((hue_step) => chroma.color([hue_step, sat, luminance], 'hsl'))
}
const split_complement = (color: Chromable, format?: chroma.ColorFormat) => {
    const [hue, sat, luminance]: HSL = chroma.color(color).hsl()
    return [hue, rotateHueFunction(hue, 72), rotateHueFunction(hue, 216)].map(
        (hue_step) => chroma.color([hue_step, sat, luminance], 'hsl'),
    )
}
const analogous = (color: Chromable, results = 6, slices = 30) => {
    const [hue, sat, luminance]: HSL = chroma.color(color).hsl()
    return [hue, rotateHueFunction(hue, 72), rotateHueFunction(hue, 216)].map(
        (hue_step) => chroma.color([hue_step, sat, luminance], 'hsl'),
    )
}

export const getChromaColor = (
    color: Chromable,
    format?: chroma.ColorFormat,
) => {
    if (!validate(color)) return
    const chroma_color = chroma.color(color)
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
}

const chromaColorBrighten = (
    value: string | undefined,
    amount: number,
): Color | undefined => {
    if (tg.isUndefined(value) || tg_isCSSColorSpecial(value)) return undefined
    if (tg.isNotUndefined<string>(value)) {
        if (chroma.color(value)) {
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
function _analogous(color: Chromable, results: number, slices: number) {
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
) {
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

function _monochromatic(color: Chromable, results: number) {
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
    split_complement: Color[]
    triad: Color[]
    tetrad: Color[]
    analogous: Color[]
}
