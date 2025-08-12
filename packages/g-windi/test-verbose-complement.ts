import { getContrastPair } from './src/lib/contrast.js'
import { validateOklchColorJS } from './src/lib/core.js'

console.log('=== Testing Complement with Verbose Logging ===')

const testColor = validateOklchColorJS({
    c: 0.15,
    h: 120,
    l: 0.5,
    mode: 'oklch',
})
console.log('\nBase color:')
console.log(`L=${testColor.l} C=${testColor.c} H=${testColor.h}°`)

console.log('\n--- Getting complement with verbose logging ---')
const result = getContrastPair(testColor, {
    preset: 'complement',
    verbose: true,
})

console.log('\nFinal complement result:')
const fg = result.result.fg_color
console.log(
    `FG: L=${fg.l.toFixed(2)} C=${fg.c.toFixed(2)} H=${fg.h?.toFixed(0) || 'none'}°`,
)

const originalHue = testColor.h || 0
const fgHue = fg.h || 0
const hueDiff = Math.abs((fgHue - originalHue + 360) % 360)
console.log(
    `Hue difference: ${hueDiff.toFixed(0)}° (should be ~180° for complement)`,
)
console.log(`Chroma change: ${testColor.c.toFixed(2)} → ${fg.c.toFixed(2)}`)
