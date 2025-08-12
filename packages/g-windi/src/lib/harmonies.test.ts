import { describe, expect, it } from 'vitest'
import { validateOklchColorJS } from './core.js'
import {
    analogousHarmony,
    complementaryHarmony,
    monochromaticHarmony,
    splitComplementaryHarmony,
    tetradicRectangularHarmony,
    tetradicSquareHarmony,
    triadicHarmony,
} from './harmonies.js'
import type { ValidOklchColor } from './types.js'

describe('Color Harmonies', () => {
    const testColor: ValidOklchColor = validateOklchColorJS({
        c: 0.15,
        h: 240,
        l: 0.6,
        mode: 'oklch',
    })

    describe('monochromaticHarmony', () => {
        it('should generate monochromatic colors with varying lightness', () => {
            const result = monochromaticHarmony(testColor, { count: 5 })

            expect(result).toHaveLength(5)
            expect(result[0]).toEqual(testColor)

            // All should have same hue and chroma
            result.forEach((color: ValidOklchColor) => {
                expect(color.h).toBe(testColor.h)
                expect(color.c).toBeCloseTo(testColor.c * 1.0) // default chromaScale
                expect(color.spaceId).toBe('oklch')
            })

            // Should have different lightness values
            const lightnesses = result.map((c: ValidOklchColor) => c.l)
            const uniqueLightnesses = new Set(lightnesses)
            expect(uniqueLightnesses.size).toBeGreaterThan(1)
        })

        it('should handle edge cases', () => {
            const single = monochromaticHarmony(testColor, { count: 1 })
            expect(single).toHaveLength(1)
            expect(single[0]).toEqual(testColor)
        })
    })

    describe('complementaryHarmony', () => {
        it('should generate base color and its complement', () => {
            const result = complementaryHarmony(testColor)

            expect(result).toHaveLength(2)
            expect(result[0]).toEqual(testColor)

            const complement = result[1]
            expect(complement).toBeDefined()
            if (complement && testColor.h !== undefined) {
                expect(complement.h).toBeCloseTo((testColor.h + 180) % 360)
                expect(complement.l).toBe(testColor.l)
                expect(complement.c).toBeCloseTo(testColor.c)
            }
        })

        it('should handle custom lightness', () => {
            const customLightness = 0.8
            const result = complementaryHarmony(testColor, {
                lightness: customLightness,
            })

            const complement = result[1]
            expect(complement).toBeDefined()
            if (complement) {
                expect(complement.l).toBe(customLightness)
            }
        })
    })

    describe('splitComplementaryHarmony', () => {
        it('should generate base color and two split complements', () => {
            const result = splitComplementaryHarmony(testColor)

            expect(result).toHaveLength(3)
            expect(result[0]).toEqual(testColor)

            if (testColor.h !== undefined) {
                const baseHue = testColor.h
                const color1 = result[1]
                const color2 = result[2]
                expect(color1).toBeDefined()
                expect(color2).toBeDefined()
                if (color1 && color2) {
                    expect(color1.h).toBeCloseTo((baseHue + 150) % 360)
                    expect(color2.h).toBeCloseTo((baseHue + 210) % 360)
                }
            }
        })
    })

    describe('triadicHarmony', () => {
        it('should generate three colors 120° apart', () => {
            const result = triadicHarmony(testColor)

            expect(result).toHaveLength(3)
            expect(result[0]).toEqual(testColor)

            if (testColor.h !== undefined) {
                const baseHue = testColor.h
                const color1 = result[1]
                const color2 = result[2]
                expect(color1).toBeDefined()
                expect(color2).toBeDefined()
                if (color1 && color2) {
                    expect(color1.h).toBeCloseTo((baseHue + 120) % 360)
                    expect(color2.h).toBeCloseTo((baseHue + 240) % 360)
                }
            }
        })
    })

    describe('tetradicHarmony', () => {
        it('should generate square tetradic (90° intervals)', () => {
            const result = tetradicSquareHarmony(testColor)

            expect(result).toHaveLength(4)
            expect(result[0]).toEqual(testColor)

            if (testColor.h !== undefined) {
                const baseHue = testColor.h
                const color1 = result[1]
                const color2 = result[2]
                const color3 = result[3]
                expect(color1).toBeDefined()
                expect(color2).toBeDefined()
                expect(color3).toBeDefined()
                if (color1 && color2 && color3) {
                    expect(color1.h).toBeCloseTo((baseHue + 90) % 360)
                    expect(color2.h).toBeCloseTo((baseHue + 180) % 360)
                    expect(color3.h).toBeCloseTo((baseHue + 270) % 360)
                }
            }
        })

        it('should generate rectangle tetradic (60°, 180°, 240°)', () => {
            const result = tetradicRectangularHarmony(testColor, { offset: 60 })

            expect(result).toHaveLength(4)
            expect(result[0]).toEqual(testColor)

            if (testColor.h !== undefined) {
                const baseHue = testColor.h
                const color1 = result[1]
                const color2 = result[2]
                const color3 = result[3]
                expect(color1).toBeDefined()
                expect(color2).toBeDefined()
                expect(color3).toBeDefined()
                if (color1 && color2 && color3) {
                    expect(color1.h).toBeCloseTo((baseHue + 60) % 360)
                    expect(color2.h).toBeCloseTo((baseHue + 180) % 360)
                    expect(color3.h).toBeCloseTo((baseHue + 240) % 360)
                }
            }
        })
    })

    describe('analogousHarmony', () => {
        it('should generate analogous colors within spread range', () => {
            const result = analogousHarmony(testColor, {
                angle: 30,
            })

            expect(result).toHaveLength(3)

            // All should have same lightness and chroma
            result.forEach((color: ValidOklchColor) => {
                expect(color.l).toBe(testColor.l)
                expect(color.c).toBeCloseTo(testColor.c)
                expect(color.spaceId).toBe('oklch')
            })

            // Should have different hues within spread
            const hues = result
                .map((c: ValidOklchColor) => c.h)
                .filter((h): h is number => h !== undefined)
            const hueRange = Math.max(...hues) - Math.min(...hues)
            expect(hueRange).toBeLessThanOrEqual(60)
        })

        it('should handle custom spread', () => {
            const narrowSpread = analogousHarmony(testColor, {
                angle: 10,
            })

            const hues = narrowSpread
                .map((c: ValidOklchColor) => c.h)
                .filter((h): h is number => h !== undefined)
            const hueRange = Math.max(...hues) - Math.min(...hues)
            expect(hueRange).toBeLessThanOrEqual(20)
        })
    })

    describe('chromaScale parameter', () => {
        it('should apply chromaScale to all harmony types', () => {
            const chromaScale = 1.5

            const mono = monochromaticHarmony(testColor, { chromaScale })
            const comp = complementaryHarmony(testColor, { chromaScale })
            const triadic = triadicHarmony(testColor, { chromaScale })

            // Check that chroma is scaled (except for the base color in some cases)
            const comp1 = comp[1]
            const triadic1 = triadic[1]
            const triadic2 = triadic[2]
            expect(comp1).toBeDefined()
            expect(triadic1).toBeDefined()
            expect(triadic2).toBeDefined()
            if (comp1 && triadic1 && triadic2) {
                expect(comp1.c).toBeCloseTo(testColor.c * chromaScale)
                expect(triadic1.c).toBeCloseTo(testColor.c * chromaScale)
                expect(triadic2.c).toBeCloseTo(testColor.c * chromaScale)
            }
        })
    })

    describe('hue edge cases', () => {
        it('should handle colors without hue (achromatic)', () => {
            const grayColor = validateOklchColorJS({
                c: 0,
                l: 0.5,
                mode: 'oklch',
            })

            const comp = complementaryHarmony(grayColor)
            expect(comp).toHaveLength(2)
            const comp1 = comp[1]
            expect(comp1).toBeDefined()
            if (comp1) {
                expect(comp1.h).toBe(180) // 0 + 180
            }
        })

        it('should handle hue wraparound correctly', () => {
            const highHueColor = validateOklchColorJS({
                c: 0.1,
                h: 350,
                l: 0.5,
                mode: 'oklch',
            })

            const comp = complementaryHarmony(highHueColor)
            const comp1 = comp[1]
            expect(comp1).toBeDefined()
            if (comp1) {
                expect(comp1.h).toBeCloseTo((350 + 180) % 360) // Should be 170
            }
        })
    })
})
