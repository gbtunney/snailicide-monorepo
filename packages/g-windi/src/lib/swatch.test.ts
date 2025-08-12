import { describe, expect, it } from 'vitest'
import { getContrastPair } from './contrast.js'
import { validateOklchColorJS } from './core.js'
import {
    analogousHarmony,
    complementaryHarmony,
    monochromaticHarmony,
    splitComplementaryHarmony,
    triadicHarmony,
} from './harmonies.js'
import {
    createColorPalette,
    generateRange,
    getCompoundPalette,
    getDoubleComplementPalette,
    getHexadicPalette,
    getPentadicPalette,
    getShades,
    getTints,
    getTones,
} from './palattes.js'
import type { ValidOklchColor } from './types.js'
import { printSwatchWithChalk } from './utilities.js'

describe('Swatch Functionality Integration', () => {
    const testColors: Array<{ color: ValidOklchColor; name: string }> = [
        {
            color: validateOklchColorJS({
                c: 0.15,
                h: 240,
                l: 0.5,
                mode: 'oklch',
            }),
            name: 'Medium Blue',
        },
        {
            color: validateOklchColorJS({
                c: 0.2,
                h: 0,
                l: 0.6,
                mode: 'oklch',
            }),
            name: 'Bright Red',
        },
        {
            color: validateOklchColorJS({
                a: 4,
                b: 120,
                g: 0.4,
                mode: 'rgb',
                r: 0.12,
            }),
            name: 'Forest Green',
        },
    ]

    const presets: Array<'minPair' | 'maxPair' | 'subtle' | 'complement'> = [
        'minPair',
        'maxPair',
        'subtle',
        'complement',
    ]

    describe('printSwatchWithChalk', () => {
        it('should work with basic colors', () => {
            const blue = validateOklchColorJS('blue')
            const red = validateOklchColorJS('red')
            const green = validateOklchColorJS('green')

            expect(() => printSwatchWithChalk('Blue', blue)).not.toThrow()
            expect(() => printSwatchWithChalk('Red', red)).not.toThrow()
            expect(() => printSwatchWithChalk('Green', green)).not.toThrow()
        })

        it('should work with custom foreground colors', () => {
            const blue = validateOklchColorJS('blue')
            const white = validateOklchColorJS('white')

            expect(() =>
                printSwatchWithChalk('Blue + White', blue, white),
            ).not.toThrow()
        })

        it('should work with default enhanced display', () => {
            const blue = validateOklchColorJS('blue')

            expect(() => printSwatchWithChalk('Info', blue)).not.toThrow()
        })

        it('should work with verbose logging', () => {
            const red = validateOklchColorJS('red')

            expect(() =>
                printSwatchWithChalk(
                    'Verbose',
                    red,
                    undefined,
                    undefined,
                    true,
                    { verbose: true },
                ),
            ).not.toThrow()
        })
    })

    describe('Contrast Pair Presets', () => {
        testColors.forEach(({ color, name }) => {
            describe(`${name} presets`, () => {
                presets.forEach((preset) => {
                    it(`should generate ${preset} preset without error`, () => {
                        expect(() => {
                            const result = getContrastPair(color, {
                                preset,
                                verbose: false,
                            })
                            expect(result).toBeDefined()
                            expect(result.result.bg_color).toBeDefined()
                            expect(result.result.fg_color).toBeDefined()
                            expect(typeof result.wcag).toBe('number')
                            expect(typeof result.apac).toBe('number')
                            expect(typeof result.distance).toBe('number')
                        }).not.toThrow()
                    })
                })

                it('should generate tints, shades, and tones', () => {
                    expect(() => {
                        const tints = getTints(color, 3)
                        const shades = getShades(color, 3)
                        const tones = getTones(color, 3)

                        expect(tints).toHaveLength(3)
                        expect(shades).toHaveLength(3)
                        expect(tones).toHaveLength(3)

                        // Verify each result is a valid color
                        tints.forEach((tint) => {
                            expect(tint.spaceId).toBe('oklch')
                            expect(typeof tint.l).toBe('number')
                            expect(typeof tint.c).toBe('number')
                        })

                        shades.forEach((shade) => {
                            expect(shade.spaceId).toBe('oklch')
                            expect(typeof shade.l).toBe('number')
                            expect(typeof shade.c).toBe('number')
                        })

                        tones.forEach((tone) => {
                            expect(tone.spaceId).toBe('oklch')
                            expect(typeof tone.l).toBe('number')
                            expect(typeof tone.c).toBe('number')
                        })
                    }).not.toThrow()
                })
            })
        })
    })

    describe('Contrast Mode Comparison', () => {
        const sampleColor = validateOklchColorJS({
            c: 0.15,
            h: 180,
            l: 0.5,
            mode: 'oklch',
        })
        const modes: Array<'apac' | 'wcag' | 'distance'> = [
            'apac',
            'wcag',
            'distance',
        ]

        modes.forEach((mode) => {
            describe(`${mode} mode`, () => {
                presets.forEach((preset) => {
                    it(`should work with ${preset} preset`, () => {
                        expect(() => {
                            const result = getContrastPair(sampleColor, {
                                mode,
                                preset,
                                verbose: false,
                            })
                            expect(result).toBeDefined()
                            expect(result.result.bg_color).toBeDefined()
                            expect(result.result.fg_color).toBeDefined()
                        }).not.toThrow()
                    })
                })
            })
        })
    })

    describe('Palette Range System', () => {
        it('should generate flexible palettes', () => {
            const basePalette = validateOklchColorJS({
                c: 0.15,
                h: 220,
                l: 0.6,
                mode: 'oklch',
            })

            const lightnessVariants = createColorPalette(basePalette, {
                lightnessOptions: { count: 5, end: 0.9, mode: 'distributed' },
            })
            expect(lightnessVariants).toHaveLength(5)

            const hueVariants = createColorPalette(basePalette, {
                hueOptions: { count: 4, mode: 'clustered', spread: 30 },
            })
            expect(hueVariants).toHaveLength(4)

            const mixedRange = generateRange({
                end: 0.8,
                mode: 'distributed',
                start: 0.3,
                steps: 7,
            })
            expect(mixedRange).toHaveLength(7)
            expect(mixedRange[0]).toBeCloseTo(0.3)
            expect(mixedRange[6]).toBeCloseTo(0.8)
        })
    })

    describe('Color Harmony Palettes', () => {
        const harmonyTestColor = validateOklchColorJS({
            c: 0.18,
            h: 200,
            l: 0.65,
            mode: 'oklch',
        })

        it('should generate classic harmonies', () => {
            const monochromatic = monochromaticHarmony(harmonyTestColor, {
                count: 5,
            })
            expect(monochromatic).toHaveLength(5)

            const complementary = complementaryHarmony(harmonyTestColor)
            expect(complementary).toHaveLength(2)

            const splitComp = splitComplementaryHarmony(harmonyTestColor)
            expect(splitComp).toHaveLength(3)

            const triadic = triadicHarmony(harmonyTestColor)
            expect(triadic).toHaveLength(3)

            const analogous = analogousHarmony(harmonyTestColor, { angle: 45 })
            expect(analogous).toHaveLength(3)
        })

        it('should generate advanced harmonies', () => {
            const compound = getCompoundPalette(harmonyTestColor, {
                analogousCount: 3,
                analogousSpread: 30,
            })
            expect(compound.length).toBeGreaterThan(3)

            const doubleComp = getDoubleComplementPalette(harmonyTestColor, {
                offset: 25,
            })
            expect(doubleComp).toHaveLength(4)

            const pentadic = getPentadicPalette(harmonyTestColor)
            expect(pentadic).toHaveLength(5)

            const hexadic = getHexadicPalette(harmonyTestColor)
            expect(hexadic).toHaveLength(6)
        })
    })

    describe('Full Swatch Demo (Non-Verbose)', () => {
        it('should run complete swatch functionality without errors', () => {
            // This test verifies that all the swatch functionality works
            // without actually producing verbose output during normal test runs
            expect(() => {
                // Test basic colors
                const blue = validateOklchColorJS('blue')
                const red = validateOklchColorJS('red')
                const green = validateOklchColorJS('green')

                // Basic swatches
                printSwatchWithChalk('Blue', blue)
                printSwatchWithChalk('Red', red)
                printSwatchWithChalk('Green', green)

                // Test all color variations for a sample color
                testColors.forEach(({ color, name }) => {
                    // Base color
                    printSwatchWithChalk(`${name} (base)`, color)

                    // All presets
                    presets.forEach((preset) => {
                        const result = getContrastPair(color, {
                            preset,
                            verbose: false,
                        })
                        const bgColor = result.result.bg_color
                        const fgColor = result.result.fg_color
                        printSwatchWithChalk(preset, bgColor, fgColor)
                    })

                    // Tints, shades, tones
                    const tints = getTints(color, 3)
                    const shades = getShades(color, 3)
                    const tones = getTones(color, 3)

                    tints.forEach((tint, i) => {
                        printSwatchWithChalk(`Tint ${i + 1}`, tint)
                    })
                    shades.forEach((shade, i) => {
                        printSwatchWithChalk(`Shade ${i + 1}`, shade)
                    })
                    tones.forEach((tone, i) => {
                        printSwatchWithChalk(`Tone ${i + 1}`, tone)
                    })
                })

                // Test harmony functions
                const harmonyTestColor = validateOklchColorJS({
                    c: 0.18,
                    h: 200,
                    l: 0.65,
                    mode: 'oklch',
                })

                const harmonies = [
                    monochromaticHarmony(harmonyTestColor, { count: 5 }),
                    complementaryHarmony(harmonyTestColor),
                    splitComplementaryHarmony(harmonyTestColor),
                    triadicHarmony(harmonyTestColor),
                    analogousHarmony(harmonyTestColor, { angle: 45 }),
                    getCompoundPalette(harmonyTestColor, {
                        analogousCount: 3,
                        analogousSpread: 30,
                    }),
                    getDoubleComplementPalette(harmonyTestColor, {
                        offset: 25,
                    }),
                    getPentadicPalette(harmonyTestColor),
                    getHexadicPalette(harmonyTestColor),
                ]

                // Verify all harmonies work
                harmonies.forEach((harmony, index) => {
                    expect(harmony.length).toBeGreaterThan(0)
                    harmony.forEach((color, i) => {
                        printSwatchWithChalk(
                            `H${index}-${i}`,
                            color,
                            validateOklchColorJS('red'),
                        )
                    })
                })
            }).not.toThrow()
        })
    })
})
