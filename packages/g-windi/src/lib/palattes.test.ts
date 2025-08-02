import { describe, expect, it } from 'vitest'
import {
    createColorPalette,
    generateRange,
    getChromaVariants,
    getCompoundPalette,
    getDoubleComplementPalette,
    getHexadicPalette,
    getHueVariants,
    getLightnessVariants,
    getPentadicPalette,
    getShades,
    getSingleStep,
    getTints,
    getTones,
    mixColors,
} from './palattes.js'
import type { RangeOptions, ValidOklchColor } from './types.js'
import { validateOklchColor } from './validators.js'

describe('Palette Functions', () => {
    const testColor: ValidOklchColor = validateOklchColor({
        c: 0.15,
        h: 240,
        l: 0.6,
        mode: 'oklch',
    })

    describe('generateRange', () => {
        it('should generate clustered range correctly', () => {
            const options: RangeOptions = {
                mode: 'clustered',
                spread: 0.2,
                start: 0.5,
                steps: 5,
            }

            const result = generateRange(options)
            expect(result).toHaveLength(5)
            expect(result[0]).toBeCloseTo(0.4) // start - spread/2
            expect(result[4]).toBeCloseTo(0.6) // start + spread/2
        })

        it('should generate distributed range correctly', () => {
            const options: RangeOptions = {
                end: 0.8,
                mode: 'distributed',
                start: 0.2,
                steps: 3,
            }

            const result = generateRange(options)
            expect(result).toHaveLength(3)
            expect(result[0]).toBeCloseTo(0.2)
            expect(result[1]).toBeCloseTo(0.5)
            expect(result[2]).toBeCloseTo(0.8)
        })

        it('should handle edge cases', () => {
            expect(
                generateRange({
                    mode: 'clustered',
                    spread: 0.2,
                    start: 0.5,
                    steps: 0,
                }),
            ).toEqual([])
            expect(
                generateRange({
                    mode: 'clustered',
                    spread: 0.2,
                    start: 0.5,
                    steps: 1,
                }),
            ).toEqual([0.5])
        })

        it('should throw error for invalid mode', () => {
            expect(() => {
                // Test runtime validation by using type assertion
                generateRange({
                    end: 1,
                    mode: 'invalid' as 'distributed',
                    start: 0.5,
                    steps: 3,
                })
            }).toThrow('Invalid mode')
        })
    })

    describe('getSingleStep', () => {
        it('should return correct step value', () => {
            const options = {
                end: 1,
                index: 2,
                mode: 'distributed' as const,
                start: 0,
                steps: 5,
            }

            const result = getSingleStep(options)
            expect(result).toBeCloseTo(0.5)
        })

        it('should throw error for out of bounds index', () => {
            const options = {
                end: 1,
                index: 5,
                mode: 'distributed' as const,
                start: 0,
                steps: 3,
            }

            expect(() => getSingleStep(options)).toThrow('Index 5 out of range')
        })
    })

    describe('mixColors', () => {
        it('should interpolate between two colors', () => {
            const result = mixColors(testColor, 'white', 3)

            expect(result).toHaveLength(3)
            expect(result[0]).toEqual(testColor)
            const result2 = result[2]
            const result1 = result[1]
            expect(result2).toBeDefined()
            expect(result1).toBeDefined()
            if (result2 && result1) {
                expect(result2.l).toBeCloseTo(1) // white has l=1
                expect(result1.l).toBeGreaterThan(testColor.l) // middle should be lighter
            }
        })

        it('should handle string color inputs', () => {
            const result = mixColors('red', 'blue', 3)
            expect(result).toHaveLength(3)
            const result0 = result[0]
            const result2 = result[2]
            expect(result0).toBeDefined()
            expect(result2).toBeDefined()
            if (result0 && result2) {
                expect(result0.mode).toBe('oklch')
                expect(result2.mode).toBe('oklch')
            }
        })
    })

    describe('gradient helpers', () => {
        describe('getTints', () => {
            it('should create tints (mix with white)', () => {
                const result = getTints(testColor, 3)

                expect(result).toHaveLength(3)
                expect(result[0]).toEqual(testColor)
                const result2 = result[2]
                const result1 = result[1]
                expect(result2).toBeDefined()
                expect(result1).toBeDefined()
                if (result2 && result1) {
                    expect(result2.l).toBeCloseTo(1) // should approach white
                    expect(result1.l).toBeGreaterThan(testColor.l)
                }
            })
        })

        describe('getShades', () => {
            it('should create shades (mix with black)', () => {
                const result = getShades(testColor, 3)

                expect(result).toHaveLength(3)
                expect(result[0]).toEqual(testColor)
                const result2 = result[2]
                const result1 = result[1]
                expect(result2).toBeDefined()
                expect(result1).toBeDefined()
                if (result2 && result1) {
                    expect(result2.l).toBeCloseTo(0) // should approach black
                    expect(result1.l).toBeLessThan(testColor.l)
                }
            })
        })

        describe('getTones', () => {
            it('should create tones (mix with desaturated)', () => {
                const result = getTones(testColor, 3)

                expect(result).toHaveLength(3)
                expect(result[0]).toEqual(testColor)
                const result2 = result[2]
                const result1 = result[1]
                expect(result2).toBeDefined()
                expect(result1).toBeDefined()
                if (result2 && result1) {
                    expect(result2.c).toBeCloseTo(0) // should be desaturated
                    expect(result1.c).toBeLessThan(testColor.c)
                }
            })
        })
    })

    describe('variant generators', () => {
        describe('getHueVariants', () => {
            it('should generate clustered hue variants', () => {
                const result = getHueVariants(240, {
                    count: 3,
                    mode: 'clustered',
                    spread: 60,
                })

                expect(result).toHaveLength(3)
                const hueRange = Math.max(...result) - Math.min(...result)
                expect(hueRange).toBeLessThanOrEqual(60)
            })

            it('should generate distributed hue variants', () => {
                const result = getHueVariants(0, {
                    count: 4,
                    mode: 'distributed',
                })

                expect(result).toHaveLength(4)
                expect(result[0]).toBeCloseTo(0)
                expect(result[1]).toBeCloseTo(90)
                expect(result[2]).toBeCloseTo(180)
                expect(result[3]).toBeCloseTo(270)
            })

            it('should handle wraparound correctly', () => {
                const result = getHueVariants(350, {
                    count: 3,
                    mode: 'clustered',
                    spread: 40,
                })

                result.forEach((hue) => {
                    expect(hue).toBeGreaterThanOrEqual(0)
                    expect(hue).toBeLessThan(360)
                })
            })
        })

        describe('getLightnessVariants', () => {
            it('should generate clustered lightness variants', () => {
                const result = getLightnessVariants(0.5, {
                    count: 3,
                    mode: 'clustered',
                    spread: 0.4,
                })

                expect(result).toHaveLength(3)
                result.forEach((l) => {
                    expect(l).toBeGreaterThanOrEqual(0)
                    expect(l).toBeLessThanOrEqual(1)
                })
            })

            it('should generate distributed lightness variants', () => {
                const result = getLightnessVariants(0.2, {
                    count: 3,
                    end: 0.8,
                    mode: 'distributed',
                })

                expect(result).toHaveLength(3)
                expect(result[0]).toBeCloseTo(0.2)
                expect(result[2]).toBeCloseTo(0.8)
            })

            it('should clamp values to valid range', () => {
                const result = getLightnessVariants(0.1, {
                    count: 3,
                    mode: 'clustered',
                    spread: 0.8, // Would go negative without clamping
                })

                result.forEach((l) => {
                    expect(l).toBeGreaterThanOrEqual(0)
                    expect(l).toBeLessThanOrEqual(1)
                })
            })
        })

        describe('getChromaVariants', () => {
            it('should generate chroma variants within max bounds', () => {
                const result = getChromaVariants(0.2, {
                    count: 3,
                    max: 0.4,
                    mode: 'clustered',
                    spread: 0.3,
                })

                expect(result).toHaveLength(3)
                result.forEach((c) => {
                    expect(c).toBeGreaterThanOrEqual(0)
                    expect(c).toBeLessThanOrEqual(0.4)
                })
            })
        })
    })

    describe('createColorPalette', () => {
        it('should create palette with hue variants', () => {
            const result = createColorPalette(testColor, {
                hueOptions: { count: 3, mode: 'clustered', spread: 30 },
            })

            expect(result).toHaveLength(3)
            result.forEach((color) => {
                expect(color.l).toBe(testColor.l)
                expect(color.c).toBe(testColor.c)
                expect(color.mode).toBe('oklch')
            })
        })

        it('should create palette with lightness variants', () => {
            const result = createColorPalette(testColor, {
                lightnessOptions: { count: 3, end: 0.9, mode: 'distributed' },
            })

            expect(result).toHaveLength(3)
            result.forEach((color) => {
                expect(color.h).toBe(testColor.h)
                expect(color.c).toBe(testColor.c)
            })
        })

        it('should create palette with chroma variants', () => {
            const result = createColorPalette(testColor, {
                chromaOptions: { count: 3, mode: 'clustered', spread: 0.1 },
            })

            expect(result).toHaveLength(3)
            result.forEach((color) => {
                expect(color.h).toBe(testColor.h)
                expect(color.l).toBe(testColor.l)
            })
        })

        it('should return source color when no options provided', () => {
            const result = createColorPalette(testColor, {})
            expect(result).toEqual([testColor])
        })
    })

    describe('advanced harmony palettes', () => {
        describe('getCompoundPalette', () => {
            it('should create analogous colors plus complement', () => {
                const result = getCompoundPalette(testColor, {
                    analogousCount: 3,
                    analogousSpread: 30,
                })

                expect(result).toHaveLength(4) // 3 analogous + 1 complement

                // Last color should be complement (180° away)
                const complement = result[result.length - 1]
                expect(complement).toBeDefined()
                if (complement && testColor.h !== undefined) {
                    const expectedComplementHue = (testColor.h + 180) % 360
                    expect(complement.h).toBeCloseTo(expectedComplementHue)
                }
            })
        })

        describe('getDoubleComplementPalette', () => {
            it('should create double complement with offset', () => {
                const offset = 30
                const result = getDoubleComplementPalette(testColor, { offset })

                expect(result).toHaveLength(4)
                expect(result[0]).toEqual(testColor)

                if (testColor.h !== undefined) {
                    const baseHue = testColor.h
                    const result1 = result[1]
                    const result2 = result[2]
                    const result3 = result[3]
                    expect(result1).toBeDefined()
                    expect(result2).toBeDefined()
                    expect(result3).toBeDefined()
                    if (result1 && result2 && result3) {
                        expect(result1.h).toBeCloseTo((baseHue + offset) % 360)
                        expect(result2.h).toBeCloseTo((baseHue + 180) % 360)
                        expect(result3.h).toBeCloseTo(
                            (baseHue + 180 + offset) % 360,
                        )
                    }
                }
            })
        })

        describe('getPentadicPalette', () => {
            it('should create 5 evenly spaced colors', () => {
                const result = getPentadicPalette(testColor)

                expect(result).toHaveLength(5)

                // Check that colors are evenly spaced (72° apart)
                if (testColor.h !== undefined) {
                    for (let i = 1; i < result.length; i++) {
                        const expectedHue = (testColor.h + i * 72) % 360
                        const color = result[i]
                        expect(color).toBeDefined()
                        if (color) {
                            expect(color.h).toBeCloseTo(expectedHue)
                        }
                    }
                }
            })
        })

        describe('getHexadicPalette', () => {
            it('should create 6 evenly spaced colors', () => {
                const result = getHexadicPalette(testColor)

                expect(result).toHaveLength(6)

                // Check that colors are evenly spaced (60° apart)
                if (testColor.h !== undefined) {
                    for (let i = 1; i < result.length; i++) {
                        const expectedHue = (testColor.h + i * 60) % 360
                        const color = result[i]
                        expect(color).toBeDefined()
                        if (color) {
                            expect(color.h).toBeCloseTo(expectedHue)
                        }
                    }
                }
            })
        })
    })

    describe('parameter validation and defaults', () => {
        it('should use default parameters when not provided', () => {
            const compound = getCompoundPalette(testColor)
            expect(compound.length).toBeGreaterThan(1)

            const doubleComp = getDoubleComplementPalette(testColor)
            expect(doubleComp).toHaveLength(4)

            const pentadic = getPentadicPalette(testColor)
            expect(pentadic).toHaveLength(5)

            const hexadic = getHexadicPalette(testColor)
            expect(hexadic).toHaveLength(6)
        })

        it('should apply chromaScale parameter', () => {
            const chromaScale = 1.5
            const result = getCompoundPalette(testColor, { chromaScale })

            result.forEach((color) => {
                expect(color.c).toBeCloseTo(testColor.c * chromaScale)
            })
        })

        it('should apply custom lightness', () => {
            const customLightness = 0.8
            const result = getDoubleComplementPalette(testColor, {
                lightness: customLightness,
            })

            result.forEach((color) => {
                expect(color.l).toBe(customLightness)
            })
        })
    })

    describe('error handling', () => {
        it('should throw error for invalid spread requirement', () => {
            expect(() => {
                getHueVariants(240, {
                    count: 3,
                    mode: 'clustered',
                    // missing spread
                })
            }).toThrow('spread is required for clustered mode')
        })

        it('should throw error for missing end in distributed mode', () => {
            expect(() => {
                getLightnessVariants(0.5, {
                    count: 3,
                    mode: 'distributed',
                    // missing end
                })
            }).toThrow('end is required for distributed lightness mode')
        })
    })
})
