import { describe, expect, test, vi } from 'vitest'
import {
    clampIfNeeded,
    printSwatchWithChalk,
    roundOklchColor,
    roundToDecimals,
} from './utilities.js'
import { validateOklchColor } from './validators.js'

describe('clampIfNeeded', () => {
    test('returns original color when already displayable or processes if needed', () => {
        // Normal displayable colors
        const white = validateOklchColor('white')
        const black = validateOklchColor('black')
        const red = validateOklchColor('red')

        // Test that these basic colors either return unchanged or are processed without error
        expect(() => clampIfNeeded(white)).not.toThrow()
        expect(() => clampIfNeeded(black)).not.toThrow()
        expect(() => clampIfNeeded(red)).not.toThrow()

        // The results should be valid colors
        const resultWhite = clampIfNeeded(white)
        const resultBlack = clampIfNeeded(black)
        const resultRed = clampIfNeeded(red)

        expect(resultWhite).toHaveProperty('mode')
        expect(resultBlack).toHaveProperty('mode')
        expect(resultRed).toHaveProperty('mode')
    })

    test('attempts to clamp out-of-gamut colors', () => {
        // Create colors that are out of sRGB gamut
        const oversaturatedRed = validateOklchColor({
            c: 0.5,
            // Very high chroma - likely out of gamut
            h: 0,
            l: 0.7,
            mode: 'oklch', // Red hue
        })

        const oversaturatedGreen = validateOklchColor({
            c: 0.4,
            // High chroma
            h: 120,
            l: 0.8,
            mode: 'oklch', // Green hue
        })

        const oversaturatedBlue = validateOklchColor({
            c: 0.45,
            // High chroma
            h: 240,
            l: 0.6,
            mode: 'oklch', // Blue hue
        })

        // Test that the function processes out-of-gamut colors
        expect(() => clampIfNeeded(oversaturatedRed)).not.toThrow()
        expect(() => clampIfNeeded(oversaturatedGreen)).not.toThrow()
        expect(() => clampIfNeeded(oversaturatedBlue)).not.toThrow()

        // Results should be valid colors with proper structure
        const clampedRed = clampIfNeeded(oversaturatedRed)
        const clampedGreen = clampIfNeeded(oversaturatedGreen)
        const clampedBlue = clampIfNeeded(oversaturatedBlue)

        expect(clampedRed).toHaveProperty('mode')
        expect(clampedGreen).toHaveProperty('mode')
        expect(clampedBlue).toHaveProperty('mode')
    })

    test('processes colors with extreme values', () => {
        // Very bright color
        const veryBright = validateOklchColor({
            // Above 1.0
            c: 0.3,
            h: 90,
            l: 1.2,
            mode: 'oklch',
        })

        // Very dark color
        const veryDark = validateOklchColor({
            // Below 0.0
            c: 0.2,
            h: 270,
            l: -0.1,
            mode: 'oklch',
        })

        expect(() => clampIfNeeded(veryBright)).not.toThrow()
        expect(() => clampIfNeeded(veryDark)).not.toThrow()
    })

    test('works with color space clamping', () => {
        const outOfGamut = validateOklchColor({
            c: 0.5,
            h: 180,
            l: 0.7,
            mode: 'oklch', // Cyan
        })

        // Test clamping with different target color spaces
        expect(() => clampIfNeeded(outOfGamut, 'rgb')).not.toThrow()
        expect(() => clampIfNeeded(outOfGamut, 'p3')).not.toThrow()
    })

    test('maintains color structure after processing', () => {
        const outOfGamut = validateOklchColor({
            // Yellow hue
            alpha: 0.8,
            c: 0.6,
            // Extremely high chroma
            h: 60,
            l: 0.75,
            mode: 'oklch',
        })

        const processed = clampIfNeeded(outOfGamut)

        // Should maintain proper structure
        expect(processed).toHaveProperty('mode')
        expect(processed.alpha).toBe(0.8)
    })

    test('handles colors that are already in gamut', () => {
        // Colors that should be displayable
        const normalColors = [
            validateOklchColor({ c: 0.1, h: 0, l: 0.5, mode: 'oklch' }),
            validateOklchColor({ c: 0.05, h: 120, l: 0.3, mode: 'oklch' }),
            validateOklchColor({ c: 0.05, h: 240, l: 0.8, mode: 'oklch' }),
        ]

        normalColors.forEach((color) => {
            const result = clampIfNeeded(color)
            expect(result).toEqual(color) // Should return unchanged
        })
    })

    test('supports verbose logging when enabled', () => {
        const outOfGamut = validateOklchColor({
            c: 0.5,
            h: 0,
            l: 0.7,
            mode: 'oklch', // Red
        })

        // Test with verbose logging enabled
        const spy = vi.spyOn(console, 'log').mockImplementation(() => {})

        clampIfNeeded(outOfGamut, 'rgb', { verbose: true })

        expect(spy).toHaveBeenCalledWith(
            expect.stringContaining('🎨 Color out of gamut detected'),
        )

        spy.mockRestore()
    })

    test('has no logging when verbose is disabled (default)', () => {
        const outOfGamut = validateOklchColor({
            c: 0.5,
            h: 0,
            l: 0.7,
            mode: 'oklch', // Red
        })

        const spy = vi.spyOn(console, 'log').mockImplementation(() => {})

        clampIfNeeded(outOfGamut, 'rgb') // verbose defaults to false

        expect(spy).not.toHaveBeenCalled()

        spy.mockRestore()
    })
})

describe('roundToDecimals', () => {
    test('rounds to specified decimal places', () => {
        expect(roundToDecimals(3.14159, 2)).toBe(3.14)
        expect(roundToDecimals(3.14159, 3)).toBe(3.142)
        expect(roundToDecimals(3.14159, 0)).toBe(3.14159) // No rounding when decimals <= 0
        expect(roundToDecimals(3.14159, -1)).toBe(3.14159) // No rounding when decimals <= 0
    })

    test('handles edge cases', () => {
        expect(roundToDecimals(0, 2)).toBe(0)
        expect(roundToDecimals(1.999, 2)).toBe(2)
        expect(roundToDecimals(-3.14159, 2)).toBe(-3.14)
    })
})

describe('roundOklchColor', () => {
    test('rounds all color properties when round is true', () => {
        const color = validateOklchColor({
            alpha: 0.876543,
            c: 0.987654,
            h: 123.456789,
            l: 0.123456,
            mode: 'oklch',
        })

        /** Default to 2 decimals */
        const rounded = roundOklchColor(color, true)

        expect(rounded.l).toBe(0.12)
        expect(rounded.c).toBe(0.99)
        expect(rounded.h).toBe(123.46)
        expect(rounded.alpha).toBe(0.88)
    })

    test('rounds to custom decimal places', () => {
        const color = validateOklchColor({
            c: 0.987654,
            h: 123.456789,
            l: 0.123456,
            mode: 'oklch',
        })

        const rounded = roundOklchColor(color, 3)

        expect(rounded.l).toBe(0.123)
        expect(rounded.c).toBe(0.988)
        expect(rounded.h).toBe(123.457)
    })

    test('returns original color when round is false', () => {
        const color = validateOklchColor({
            c: 0.987654,
            h: 123.456789,
            l: 0.123456,
            mode: 'oklch',
        })

        const notRounded = roundOklchColor(color, false)
        expect(notRounded).toEqual(color)
    })

    test('handles missing alpha and hue properties', () => {
        const color = validateOklchColor({
            c: 0.987654,
            l: 0.123456,
            mode: 'oklch',
            // h and alpha undefined
        })

        const rounded = roundOklchColor(color, 2)

        expect(rounded.l).toBe(0.12)
        expect(rounded.c).toBe(0.99)
        expect(rounded.h).toBe(0) // Defaults to 0
        expect(rounded.alpha).toBe(0) // Defaults to 0
    })
})

describe('printSwatchWithChalk', () => {
    test('returns formatted string with colors', () => {
        const bgColor = validateOklchColor('blue')
        const fgColor = validateOklchColor('white')

        const result = printSwatchWithChalk(
            'Test',
            bgColor,
            fgColor,
            undefined,
            false,
        )

        expect(typeof result).toBe('string')
        expect(result).toContain('Test')
    })

    test('finds contrasting foreground when not provided', () => {
        const bgColor = validateOklchColor('black')

        const result = printSwatchWithChalk(
            'Test',
            bgColor,
            undefined,
            undefined,
            false,
        )

        expect(typeof result).toBe('string')
        expect(result).toContain('Test')
    })

    test('includes dim text when provided', () => {
        const bgColor = validateOklchColor('red')
        const fgColor = validateOklchColor('white')

        const result = printSwatchWithChalk(
            'Test',
            bgColor,
            fgColor,
            'dim info',
            false,
        )

        expect(result).toContain('Test')
        expect(result).toContain('dim info')
    })

    test('handles error in contrast pair finding gracefully', () => {
        // Create a problematic color that might cause contrast finding to fail
        const problematicColor = validateOklchColor({
            c: 0,
            h: 0,
            l: 0.5,
            mode: 'oklch',
        })

        // Should not throw an error and should fallback to white
        expect(() => {
            printSwatchWithChalk(
                'Test',
                problematicColor,
                undefined,
                undefined,
                false,
            )
        }).not.toThrow()
    })
})
