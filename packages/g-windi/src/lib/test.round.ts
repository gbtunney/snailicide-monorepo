import Color from 'colorjs.io'

import { validateOklchColorJS } from './core.js'

import { ColorJS } from './types.js'

type ColorSpaceKey = keyof typeof Color.spaces

const redT = validateOklchColorJS('oklch(70.74444% .233333 30.124 )')

const tealTest = validateOklchColorJS(
    'oklch(58.299744444% .233333 180.43412323355434)',
)
const tealTest2 = new ColorJS('oklch(59.207% 0.10845 178.64 )')

const redtest = validateOklchColorJS('yellow')

//console.log("THE PRETEAL IS GBT ",JSON.stringify(tealTest) , (tealTest).toString({format: {noAlpha: false}}))

//console.log("THE RED ",toClampedOklchColor(tealTest ).toString() , toHex( redtest))
