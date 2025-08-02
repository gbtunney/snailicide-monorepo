import { adjustHue } from './src/lib/adjustments.js'
import { validateOklchColor } from './src/lib/validators.js'

console.log('=== Testing adjustHue with relative parameter ===')

const baseColor = validateOklchColor({ c: 0.15, h: 120, l: 0.5, mode: 'oklch' })

console.log('Base color:', baseColor)
console.log(`Base hue: ${baseColor.h}°`)

// Test relative adjustment (default)
const relative180 = adjustHue(baseColor, 180, true)
console.log(
    `\nRelative +180°: H=${relative180.h}° (expected: ${(120 + 180) % 360}°)`,
)

const relativeMinus90 = adjustHue(baseColor, -90, true)
console.log(
    `Relative -90°: H=${relativeMinus90.h}° (expected: ${(120 - 90 + 360) % 360}°)`,
)

// Test absolute adjustment
const absolute45 = adjustHue(baseColor, 45, false)
console.log(`\nAbsolute 45°: H=${absolute45.h}° (expected: 45°)`)

const absolute300 = adjustHue(baseColor, 300, false)
console.log(`Absolute 300°: H=${absolute300.h}° (expected: 300°)`)

console.log('\n=== Complement test ===')
const complement = adjustHue(baseColor, 180, true)
console.log(`Original: H=${baseColor.h}°`)
console.log(`Complement: H=${complement.h}° (opposite on color wheel)`)
