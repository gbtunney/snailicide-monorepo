import { getContrastPair } from './src/lib/contrast.js'
import { validateOklchColorJS } from './src/lib/core.js'

console.log('=== Testing Complement Preset ===')

// Test with a color that has a clear hue
const testColor = validateOklchColorJS({
    c: 0.15,
    h: 120,
    l: 0.5,
    mode: 'oklch',
})
console.log('\nBase color (Green):')
console.log(`  L=${testColor.l} C=${testColor.c} H=${testColor.h}°`)

// Get all presets for comparison
const presets = ['minPair', 'maxPair', 'subtle', 'complement'] as const

presets.forEach((preset) => {
    console.log(`\n--- ${preset.toUpperCase()} ---`)
    const result = getContrastPair(testColor, { preset, verbose: false })

    const bg = result.result.bg_color
    const fg = result.result.fg_color

    console.log(
        `BG: L=${bg.l.toFixed(2)} C=${bg.c.toFixed(2)} H=${bg.h?.toFixed(0) || 'none'}°`,
    )
    console.log(
        `FG: L=${fg.l.toFixed(2)} C=${fg.c.toFixed(2)} H=${fg.h?.toFixed(0) || 'none'}°`,
    )

    if (preset === 'complement') {
        const originalHue = testColor.h || 0
        const fgHue = fg.h || 0
        const hueDiff = Math.abs((fgHue - originalHue + 360) % 360)
        const complementHueDiff = Math.min(hueDiff, 360 - hueDiff)
        console.log(
            `Hue difference from original: ${hueDiff.toFixed(0)}° (complement should be ~180°)`,
        )
        console.log(
            `Chroma boost: ${testColor.c.toFixed(2)} → ${fg.c.toFixed(2)} (${(((fg.c - testColor.c) / testColor.c) * 100).toFixed(0)}% increase)`,
        )
    }
})

console.log('\n=== Testing with different base colors ===')

const testColors = [
    {
        color: validateOklchColorJS({ c: 0.2, h: 0, l: 0.6, mode: 'oklch' }),
        name: 'Red',
    },
    {
        color: validateOklchColorJS({ c: 0.15, h: 240, l: 0.5, mode: 'oklch' }),
        name: 'Blue',
    },
    {
        color: validateOklchColorJS({ c: 0.12, h: 90, l: 0.8, mode: 'oklch' }),
        name: 'Yellow',
    },
]

testColors.forEach(({ color, name }) => {
    console.log(`\n${name} (H=${color.h}°):`)
    const complement = getContrastPair(color, { preset: 'complement' })
    const fg = complement.result.fg_color

    console.log(
        `  Original FG would be: L=${complement.result.bg_color.l.toFixed(2)} C=${complement.result.bg_color.c.toFixed(2)} H=${complement.result.bg_color.h?.toFixed(0) || 'none'}°`,
    )
    console.log(
        `  Complement FG is:    L=${fg.l.toFixed(2)} C=${fg.c.toFixed(2)} H=${fg.h?.toFixed(0) || 'none'}°`,
    )

    const expectedComplementHue = ((color.h || 0) + 180) % 360
    console.log(
        `  Expected complement hue: ${expectedComplementHue.toFixed(0)}°`,
    )
})
