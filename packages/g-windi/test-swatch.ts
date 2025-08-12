import { getContrastPair } from './src/lib/contrast.js'
import { validateOklchColorJS } from './src/lib/core.js'
import {
    analogousHarmony,
    complementaryHarmony,
    monochromaticHarmony,
    splitComplementaryHarmony,
    triadicHarmony,
} from './src/lib/harmonies.js'
import {
    createColorPalette,
    generateRange,
    getCompoundPalette,
    getDoubleComplementPalette,
    getHexadicPalette,
    getPentadicPalette,
} from './src/lib/palattes.js'
import type { ValidOklchColor } from './src/lib/types.js'
import { printSwatchWithChalk } from './src/lib/utilities.js'

console.log('=== Testing printSwatchWithChalk ===')

// Test with basic colors
const blue = validateOklchColorJS('blue')
const red = validateOklchColorJS('red')
const green = validateOklchColorJS('green')

console.log('\n1. Basic color swatches:')
printSwatchWithChalk('Blue', blue)
printSwatchWithChalk('Red', red)
printSwatchWithChalk('Green', green)

console.log('\n2. With custom foreground:')
printSwatchWithChalk('Blue + White', blue, validateOklchColorJS('white'))
printSwatchWithChalk('Red + Black', red, validateOklchColorJS('black'))

console.log('\n3. With dim text:')
printSwatchWithChalk('Info', blue, undefined, 'This is dim info text')

console.log('\n4. With verbose logging:')
printSwatchWithChalk('Verbose', red, undefined, 'verbose mode', true, {
    verbose: true,
})

console.log('\n5. Custom OKLCH colors:')
const customColor = validateOklchColorJS({
    c: 0.3,
    h: 120,
    l: 0.7,
    mode: 'oklch',
})
printSwatchWithChalk('Custom', customColor, undefined, 'L=0.7 C=0.3 H=120')

console.log('\n6. Testing distance mode:')
printSwatchWithChalk(
    'Distance Mode',
    customColor,
    undefined,
    'Using distance mode for contrast',
    true,
    { verbose: true },
)

console.log('\n\n=== CONTRAST PAIR PRESETS SHOWCASE ===')

// Test all presets with a variety of base colors
const testColors = [
    {
        color: validateOklchColorJS({ c: 0.15, h: 240, l: 0.5, mode: 'oklch' }),
        name: 'Medium Blue',
    },
    {
        color: validateOklchColorJS({ c: 0.2, h: 0, l: 0.6, mode: 'oklch' }),
        name: 'Bright Red',
    },
    {
        color: validateOklchColorJS({ c: 0.12, h: 120, l: 0.4, mode: 'oklch' }),
        name: 'Forest Green',
    },
    {
        color: validateOklchColorJS({ c: 0.18, h: 280, l: 0.5, mode: 'oklch' }),
        name: 'Purple',
    },
    {
        color: validateOklchColorJS({ c: 0.16, h: 40, l: 0.65, mode: 'oklch' }),
        name: 'Orange',
    },
]

const presets: Array<'minPair' | 'maxPair' | 'subtle' | 'complement'> = [
    'minPair',
    'maxPair',
    'subtle',
    'complement',
]

testColors.forEach(({ color, name }) => {
    console.log(`\n--- ${name.toUpperCase()} PRESETS ---`)

    // Show the base color first
    printSwatchWithChalk(
        `${name} (base)`,
        color,
        undefined,
        `L=${color.l.toFixed(2)} C=${color.c.toFixed(2)} H=${color.h?.toFixed(0) || 'none'}°`,
    )

    // Show all presets for this color
    presets.forEach((preset) => {
        try {
            const result = getContrastPair(color, { preset, verbose: false })
            const bgColor = result.result.bg_color
            const fgColor = result.result.fg_color

            const contrastInfo = `WCAG:${result.wcag.toFixed(1)} APCA:${Math.abs(result.apac).toFixed(0)} Dist:${result.distance.toFixed(2)}`
            const bgInfo = `BG L=${bgColor.l.toFixed(2)} C=${bgColor.c.toFixed(2)} H=${bgColor.h?.toFixed(0) || 'none'}°`
            const fgInfo = `FG L=${fgColor.l.toFixed(2)} C=${fgColor.c.toFixed(2)} H=${fgColor.h?.toFixed(0) || 'none'}°`

            printSwatchWithChalk(
                preset,
                bgColor,
                fgColor,
                `${contrastInfo} | ${bgInfo} → ${fgInfo}`,
            )
        } catch (error) {
            console.log(`❌ Error with ${preset}:`, error)
        }
    })
})

console.log('\n\n=== CONTRAST MODE COMPARISON ===')
const sampleColor = validateOklchColorJS({
    c: 0.15,
    h: 180,
    l: 0.5,
    mode: 'oklch',
})
const modes: Array<'apac' | 'wcag' | 'distance'> = ['apac', 'wcag', 'distance']

printSwatchWithChalk(
    'Sample Color',
    sampleColor,
    undefined,
    'Testing different contrast modes',
)

modes.forEach((mode) => {
    console.log(`\n--- ${mode.toUpperCase()} MODE ---`)
    presets.forEach((preset) => {
        try {
            const result = getContrastPair(sampleColor, {
                mode,
                preset,
                verbose: false,
            })
            const bgColor = result.result.bg_color
            const fgColor = result.result.fg_color

            const modeValue =
                mode === 'apac'
                    ? Math.abs(result.apac).toFixed(0)
                    : mode === 'wcag'
                      ? result.wcag.toFixed(1)
                      : result.distance.toFixed(2)

            const bgInfo = `${bgColor.l.toFixed(2)}/${bgColor.c.toFixed(2)}/${bgColor.h?.toFixed(0) || 'none'}°`
            const fgInfo = `${fgColor.l.toFixed(2)}/${fgColor.c.toFixed(2)}/${fgColor.h?.toFixed(0) || 'none'}°`

            printSwatchWithChalk(
                `${mode}-${preset}`,
                bgColor,
                fgColor,
                `${mode.toUpperCase()}: ${modeValue} | BG ${bgInfo} → FG ${fgInfo}`,
            )
        } catch (error) {
            console.log(`❌ Error with ${mode}-${preset}:`, error)
        }
    })
})

console.log('\n=== END PRESET SHOWCASE ===')

/* --------------------------------- PALETTE RANGE SYSTEM SHOWCASE -------------------------------- */

console.log('\n🎨 FLEXIBLE PALETTE GENERATION:')
const basePalette = validateOklchColorJS({
    c: 0.15,
    h: 220,
    l: 0.6,
    mode: 'oklch',
})

// Distributed lightness range
const lightnessVariants = createColorPalette(basePalette, {
    lightnessOptions: { count: 5, end: 0.9, mode: 'distributed' },
})
console.log('🌅 Distributed Lightness Variants:')
lightnessVariants.forEach((color: ValidOklchColor, i: number) => {
    console.log(
        `   ${i + 1}. L=${color.l.toFixed(2)} C=${color.c.toFixed(2)} H=${color.h?.toFixed(0) || 'none'}`,
    )
})

// Clustered hue variations
const hueVariants = createColorPalette(basePalette, {
    hueOptions: { count: 4, mode: 'clustered', spread: 30 },
})
console.log('\n🌈 Clustered Hue Variants:')
hueVariants.forEach((color: ValidOklchColor, i: number) => {
    console.log(
        `   ${i + 1}. L=${color.l.toFixed(2)} C=${color.c.toFixed(2)} H=${color.h?.toFixed(0) || 'none'}`,
    )
})

// Mixed range generation
const mixedRange = generateRange({
    end: 0.8,
    mode: 'distributed',
    start: 0.3,
    steps: 7,
})
console.log('\n🔢 Mixed Range Generation (0.3 to 0.8):')
console.log(
    `   Values: ${mixedRange.map((v: number) => v.toFixed(2)).join(', ')}`,
)

console.log('\n✅ All palette functions now use the flexible range system!')

console.log('\n\n=== COLOR HARMONY PALETTES SHOWCASE ===')

// Test color for harmonies
const harmonyTestColor = validateOklchColorJS({
    c: 0.18,
    h: 200,
    l: 0.65,
    mode: 'oklch',
})
console.log('\n🎨 Base Color for Harmonies:')
printSwatchWithChalk(
    'Base Color',
    harmonyTestColor,
    undefined,
    'L=0.65 C=0.18 H=200°',
)

console.log('\n--- CLASSIC HARMONIES ---')

// Monochromatic
const monochromatic = monochromaticHarmony(harmonyTestColor, { count: 5 })
console.log('\n🔵 Monochromatic (5 variations):')
monochromatic.forEach((color: ValidOklchColor, i: number) => {
    printSwatchWithChalk(
        `Mono ${i + 1}`,
        color,
        undefined,
        `L=${color.l.toFixed(2)} C=${color.c.toFixed(2)} H=${color.h?.toFixed(0)}°`,
    )
})

// Complementary
const complementary = complementaryHarmony(harmonyTestColor)
console.log('\n🟡 Complementary:')
complementary.forEach((color: ValidOklchColor, i: number) => {
    printSwatchWithChalk(
        `Comp ${i + 1}`,
        color,
        undefined,
        `L=${color.l.toFixed(2)} C=${color.c.toFixed(2)} H=${color.h?.toFixed(0)}°`,
    )
})

// Split Complementary
const splitComp = splitComplementaryHarmony(harmonyTestColor)
console.log('\n🟠 Split Complementary:')
splitComp.forEach((color: ValidOklchColor, i: number) => {
    printSwatchWithChalk(
        `Split ${i + 1}`,
        color,
        undefined,
        `L=${color.l.toFixed(2)} C=${color.c.toFixed(2)} H=${color.h?.toFixed(0)}°`,
    )
})

// Triadic
const triadic = triadicHarmony(harmonyTestColor)
console.log('\n🔺 Triadic:')
triadic.forEach((color: ValidOklchColor, i: number) => {
    printSwatchWithChalk(
        `Tri ${i + 1}`,
        color,
        undefined,
        `L=${color.l.toFixed(2)} C=${color.c.toFixed(2)} H=${color.h?.toFixed(0)}°`,
    )
})

// Analogous
const analogous = analogousHarmony(harmonyTestColor, { angle: 45 })
console.log('\n🌈 Analogous (45° angle):')
analogous.forEach((color: ValidOklchColor, i: number) => {
    printSwatchWithChalk(
        `Ana ${i + 1}`,
        color,
        undefined,
        `L=${color.l.toFixed(2)} C=${color.c.toFixed(2)} H=${color.h?.toFixed(0)}°`,
    )
})

console.log('\n--- ADVANCED HARMONIES ---')

// Compound (analogous + complement)
const compound = getCompoundPalette(harmonyTestColor, {
    analogousCount: 3,
    analogousSpread: 30,
})
console.log('\n⭐ Compound (analogous + complement):')
compound.forEach((color, i) => {
    printSwatchWithChalk(
        `Comp ${i + 1}`,
        color,
        undefined,
        `L=${color.l.toFixed(2)} C=${color.c.toFixed(2)} H=${color.h?.toFixed(0)}°`,
    )
})

// Double Complement
const doubleComp = getDoubleComplementPalette(harmonyTestColor, { offset: 25 })
console.log('\n💫 Double Complement (25° offset):')
doubleComp.forEach((color, i) => {
    printSwatchWithChalk(
        `DblComp ${i + 1}`,
        color,
        undefined,
        `L=${color.l.toFixed(2)} C=${color.c.toFixed(2)} H=${color.h?.toFixed(0)}°`,
    )
})

// Pentadic
const pentadic = getPentadicPalette(harmonyTestColor)
console.log('\n⭐ Pentadic (5 evenly spaced):')
pentadic.forEach((color, i) => {
    printSwatchWithChalk(
        `Pent ${i + 1}`,
        color,
        undefined,
        `L=${color.l.toFixed(2)} C=${color.c.toFixed(2)} H=${color.h?.toFixed(0)}°`,
    )
})

// Hexadic
const hexadic = getHexadicPalette(harmonyTestColor)
console.log('\n🌟 Hexadic (6 evenly spaced):')
hexadic.forEach((color, i) => {
    printSwatchWithChalk(
        `Hex ${i + 1}`,
        color,
        undefined,
        `L=${color.l.toFixed(2)} C=${color.c.toFixed(2)} H=${color.h?.toFixed(0)}°`,
    )
})

console.log('\n=== END HARMONY SHOWCASE ===')
