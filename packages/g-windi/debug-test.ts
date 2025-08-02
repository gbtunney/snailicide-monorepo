import { getContrastPair } from './src/lib/contrast.js'
import { validateOklchColor } from './src/lib/validators.js'

/** Medium green */
const baseColor = validateOklchColor({ c: 0.1, h: 120, l: 0.5, mode: 'oklch' })

console.log('Base color:', baseColor)

const result = getContrastPair(baseColor, { preset: 'maxPair', verbose: true })

console.log('Result fg_color:', result.result.fg_color)
console.log('Result bg_color:', result.result.bg_color)
console.log('FG Luminance:', result.result.fg_color.l)
console.log(
    'Is pure white or black?',
    result.result.fg_color.l === 0 || result.result.fg_color.l === 1,
)
