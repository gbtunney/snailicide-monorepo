import Color from 'colorjs.io'
import {
    adjustLightness,
    shiftChroma,
    shiftHue,
    shiftHue2,
} from './adjustments.js'

import {
    toClampedColor,
    toColorHex,
    toCssString,
    validateOklchColorJS,
    ValidOklchColor,
} from './core.js'

import { ExpandedColorJSObject } from './types.js'
import { mapRange } from './utilities.js'

type ColorSpaceKey = keyof typeof Color.spaces

const redT = validateOklchColorJS('red')

const tealTest = validateOklchColorJS('red')

//const cssvartest = validateOklchColorJS("oklch(from red .1 .233333 180.43412323355434)")

//onsole.log("RANGE @@ .2", mapRange(20,{min: 0 ,max: 100},{min: 0,max: 1} ) )
//console.log("tteal valiid", "!!!MY TEAL parse" ,parse('oklch(gggg .233333 180.43412323355434)'))
const adjTeal = adjustLightness(tealTest, 'dark')

//const adjTeal2 = adjustLightness(tealTest,.5)

///this should be .16
//const adjTeal3 = adjustLightness(tealTest,-.2)

///this should be .60
const adjTeal5 = adjustLightness(tealTest, 0.3)

const adjTeal6 = tealTest.clone().lighten(0.1)

//error i guess?
//const adjTeal4 = adjustLightness(tealTest,-.2,false)

/*
const tealTest2 = new ColorJS('oklch(.59.207 0.10845 178.64 )')

const redtest = validateOklchColorJS('yellow')
*/
const hueTest = shiftHue(tealTest, 90, 'deg')
console.log(
    'HIUE RANGE IS ',
    mapRange(-0.5, { max: 1, min: 0 }, { max: 360, min: 0 }),
)
console.log(
    '@@@@THE RED IS GBT ',
    'TEAL----',
    toCssString(hueTest),
    '----',
    //' toCssString(setHue(hueTest, 0, 'deg')),
    'LATEST--',
    toCssString(adjTeal),
    toCssString(validateOklchColorJS(tealTest.lighten(0.2))),
    toCssString(validateOklchColorJS(tealTest.lighten(0.2))),

    '@@@@ADJ TEAL',
    toColorHex(adjTeal),
    toCssString(adjTeal),
    '\nCSS VAR TEST',
    // toCssString(cssvartest)
)
console.log(
    '@@@@LIGHTEN TEAL 23 ----- RED IS GBT ',
    'TEAL ADJ 2',
    //toColorHex(adjTeal2),
    toCssString(adjTeal5),

    '@@@@ADJ TEAL TEST ME VAL',
    toColorHex(adjTeal5),
    toCssString(adjTeal5),
    '\nCSS VAR TEST',
    // toCssString(cssvartest)
)

//console.log("THE RED ",toClampedOklchColor(tealTest ).toString() , toHex( redtest))

console.log('=== Testing printSwatchWithChalk ===')
const testColor: ValidOklchColor = validateOklchColorJS({
    c: 0,
    h: 120,
    l: 0.5,
    mode: 'oklch',
}) as ValidOklchColor

const colorjsOObj: ExpandedColorJSObject = {
    coords: [50, '10%', 90],
    space: 'oklch',
}

const newval = shiftHue2(validateOklchColorJS(colorjsOObj), '-50%')

//const ttt = validateOklchColorJS(newval)

const result = shiftChroma(testColor, 0.25, 'linear')
console.log('NORMALIXING ,---', toCssString(newval), 'color obj')

const teeeeeee = toClampedColor(
    validateOklchColorJS('oklch(none none 180.43412323355434)'),
)
//console.log("reDSULT IIS ",toCssString(result),toCssString(toClampedColor(teeeeeee)))
// Test with basic colors
const blue = toClampedColor(validateOklchColorJS('blue'))
const red = validateOklchColorJS('red')
const green = validateOklchColorJS('green')

console.log('\n1. Basic color swatches:', blue.toString(), toColorHex(blue))
//printSwatchWithChalk('Blue', blue,validateOklchColorJS('white'))
//printSwatchWithChalk('Red', red)
//printSwatchWithChalk('Green', green)
