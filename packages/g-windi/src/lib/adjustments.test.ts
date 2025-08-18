import { describe, expect, it } from 'vitest'
import {
    adjustChroma,
    adjustHue,
    adjustLightness,
    setChroma,
    setLightness,
    shiftChroma,
    shiftLightness,
} from './adjustments.js'
import { validateOklchColorJS } from './core.js'
import type { ValidOklchColor } from './types.js'

const testColor: ValidOklchColor = validateOklchColorJS({
    c: 0.2,
    h: 120,
    l: 0.5,
    mode: 'oklch',
}) as ValidOklchColor

describe('Adjustment Functions', () => {
    describe('adjustChroma', () => {
        it('should adjust chroma relatively with number', () => {
            const result = adjustChroma(testColor, 0.5, true)
            expect(result.c).toBeCloseTo(0.3) // 0.2 * (1 + 0.5)
            expect(result.h).toBe(testColor.h)
            expect(result.l).toBe(testColor.l)
        })

        it('should set chroma absolutely with number', () => {
            const result = adjustChroma(testColor, 0.5, false)
            expect(result.c).toBeCloseTo(0.1)
            expect(result.h).toBe(testColor.h)
            expect(result.l).toBe(testColor.l)
        })

        it('should use preset values', () => {
            const result = adjustChroma(testColor, 'vibrant')
            expect(result.c).toBeCloseTo(1.25) // preset sets absolute value
            expect(result.h).toBe(testColor.h)
            expect(result.l).toBe(testColor.l)
        })

        it('should use greyscale preset', () => {
            const result = adjustChroma(testColor, 'greyscale')
            expect(result.c).toBe(0)
            expect(result.h).toBe(testColor.h)
            expect(result.l).toBe(testColor.l)
        })

        it('should use muted preset', () => {
            const result = adjustChroma(testColor, 'muted')
            expect(result.c).toBeCloseTo(0.4)
        })

        it('should use subtle preset', () => {
            const result = adjustChroma(testColor, 'subtle')
            expect(result.c).toBeCloseTo(0.2)
        })

        it('should handle default parameters', () => {
            const result = adjustChroma(testColor)
            expect(result.c).toBeCloseTo(0.2) // no change with default 0
        })
    })

    describe('adjustLightness', () => {
        it('should adjust lightness relatively with number', () => {
            const result = adjustLightness(testColor, 0.2, true)
            expect(result.l).toBeCloseTo(0.6) // 0.5 * (1 + 0.2)
            expect(result.c).toBe(testColor.c)
            expect(result.h).toBe(testColor.h)
        })

        it('should set lightness absolutely with number', () => {
            const result = adjustLightness(testColor, 0.8, false)
            expect(result.l).toBeCloseTo(0.8)
            expect(result.c).toBe(testColor.c)
            expect(result.h).toBe(testColor.h)
        })

        it('should use dark preset', () => {
            const result = adjustLightness(testColor, 'dark')
            expect(result.l).toBeCloseTo(0.3) // preset sets absolute value
        })

        it('should use light preset', () => {
            const result = adjustLightness(testColor, 'light')
            expect(result.l).toBeCloseTo(0.85)
        })

        it('should use mid preset', () => {
            const result = adjustLightness(testColor, 'mid')
            expect(result.l).toBeCloseTo(0.6)
        })

        it('should clamp lightness to valid range', () => {
            /** Above 1 */
            const result1 = adjustLightness(testColor, 2.0, false)
            expect(result1.l).toBe(1.0)

            /** Below 0 */
            const result2 = adjustLightness(testColor, -0.5, false)
            expect(result2.l).toBe(0.0)
        })

        it('should handle relative adjustments that exceed bounds', () => {
            const brightColor: ValidOklchColor = setLightness(testColor, 0.9)
            /** 0.9 * 1.5 = 1.35 */
            const result = adjustLightness(brightColor, 0.5, true)
            expect(result.l).toBe(1.0) // Clamped to max
        })

        it('should handle default parameters', () => {
            const result = adjustLightness(testColor)
            expect(result.l).toBe(0.5) // no change with default 0
        })
    })

    describe('adjustHue', () => {
        it('should adjust hue relatively (add to current)', () => {
            const result = adjustHue(testColor, 30)
            expect(result.h).toBe(150) // 120 + 30
        })

        it('should set hue absolutely', () => {
            const result = adjustHue(testColor, 180, false)
            expect(result.h).toBe(180)
        })

        it('should handle hue wraparound when adding', () => {
            const result = adjustHue(testColor, 270)
            expect(result.h).toBe(30) // (120 + 270) % 360
        })

        it('should handle negative hue adjustments', () => {
            const result = adjustHue(testColor, -150)
            expect(result.h).toBe(330) // (120 - 150 + 360) % 360
        })

        it('should handle absolute negative hue', () => {
            const result = adjustHue(testColor, -30, false)
            expect(result.h).toBe(330) // (-30 + 360) % 360
        })

        it('should handle hue wraparound when setting absolutely', () => {
            const result = adjustHue(testColor, 450, false)
            expect(result.h).toBe(90) // 450 % 360
        })

        it('should handle undefined hue in source color', () => {
            const colorWithoutHue = validateOklchColorJS({
                ...testColor,
                h: undefined,
            })
            const result = adjustHue(colorWithoutHue, 45, false)
            expect(result.h).toBe(45)
        })
    })

    describe('Edge Cases', () => {
        it('should handle color with zero chroma', () => {
            const greyColor: ValidOklchColor = validateOklchColorJS({
                ...testColor,
                c: 0,
            })
            const result = adjustChroma(greyColor, 0.5, true)
            expect(result.c).toBe(0) // 0 * (1 + 0.5) = 0
        })

        it('should handle color with maximum lightness', () => {
            const whiteColor: ValidOklchColor = validateOklchColorJS({
                ...testColor,
                l: 1.0,
            })
            const result = adjustLightness(whiteColor, 0.1, true)
            expect(result.l).toBe(1.0) // Clamped to max
        })

        it('should handle color with minimum lightness', () => {
            const blackColor: ValidOklchColor = validateOklchColorJS({
                ...testColor,
                l: 0.0,
            })
            const result = adjustLightness(blackColor, -0.1, true)
            expect(result.l).toBe(0.0) // Clamped to min
        })

        it('should preserve other color properties', () => {
            const result1 = adjustChroma(testColor, 0.1, false)
            expect(result1.spaceId).toBe('oklch')

            const result2 = adjustLightness(testColor, 0.1, false)
            expect(result2.spaceId).toBe('oklch')

            const result3 = adjustHue(testColor, 30, true)
            expect(result3.spaceId).toBe('oklch')
        })
    })

    describe('setChroma', () => {
        it('should set chroma to a specific value', () => {
            const result = setChroma(testColor, 0.8)
            expect(result.c).toBeCloseTo(0.8)
            expect(result.h).toBe(testColor.h)
            expect(result.l).toBe(testColor.l)
        })
    })

    describe('shiftChroma', () => {
        it('should shift chroma by a specific value', () => {
            const result = shiftChroma(testColor, 0.1)
            expect(result.c).toBeCloseTo(0.3) // 0.2 + 0.1
            expect(result.h).toBe(testColor.h)
            expect(result.l).toBe(testColor.l)
        })
    })

    describe('setLightness', () => {
        it('should set lightness to a specific value', () => {
            const result = setLightness(testColor, 0.7)
            expect(result.l).toBeCloseTo(0.7)
            expect(result.c).toBe(testColor.c)
            expect(result.h).toBe(testColor.h)
        })
    })

    describe('shiftLightness', () => {
        it('should shift lightness by a specific value', () => {
            const result = shiftLightness(testColor, 0.1)
            expect(result.l).toBeCloseTo(0.6) // 0.5 + 0.1
            expect(result.c).toBe(testColor.c)
            expect(result.h).toBe(testColor.h)
        })
    })
})
