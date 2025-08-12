import Color from 'colorjs.io'

import {
    toClampedColor,
    toColorHex,
    toCssString,
    validateOklchColorJS,
} from './core.js'

type ColorSpaceKey = keyof typeof Color.spaces

const redT = validateOklchColorJS('red')

/*const tealTest = validateOklchColorJS(
    'oklch(58.299744444% .233333 180.43412323355434)',
)
const tealTest2 = new ColorJS('oklch(59.207% 0.10845 178.64 )')

const redtest = validateOklchColorJS('yellow')
*/
console.log(
    'THE PRETEAL IS GBT ',
    redT.toString({ format: { noAlpha: false } }),
    'hex',
    toColorHex(redT),
    toCssString(redT),
)

//console.log("THE RED ",toClampedOklchColor(tealTest ).toString() , toHex( redtest))

console.log('=== Testing printSwatchWithChalk ===')

// Test with basic colors
const blue = toClampedColor(validateOklchColorJS('blue'))
const red = validateOklchColorJS('red')
const green = validateOklchColorJS('green')

console.log('\n1. Basic color swatches:', blue.toString(), toColorHex(blue))
//printSwatchWithChalk('Blue', blue,validateOklchColorJS('white'))
//printSwatchWithChalk('Red', red)
//printSwatchWithChalk('Green', green)
