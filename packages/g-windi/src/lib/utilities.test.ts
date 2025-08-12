import { describe, expect, test, vi } from 'vitest'
import {
    toClampedColor,
    toColorHex,
    toCssString,
    validateOklchColorJS,
} from './core.js'
import { ValidColorJSInput } from './types.js'
import { roundOklchColorJS, roundToDecimals } from './utilities.js'

describe('clampIfNeeded', () => {
    test('returns original color when already displayable or processes if needed', () => {
        const white = validateOklchColorJS('white')
        const black = validateOklchColorJS('black')
        const red = validateOklchColorJS('red')

        expect(() => toClampedColor(white)).not.toThrow()
        expect(() => toClampedColor(black)).not.toThrow()
        expect(() => toClampedColor(red)).not.toThrow()

        const redT = validateOklchColorJS('oklch(70.74444% .233333 30)')
        console.log(
            'THE ROUND IS GBT',
            redT.toString(),
            'after',
            roundOklchColorJS(redT).toString(),
        )

        expect(roundToDecimals(23.2311, 1)).toBe(23.2)
        expect(roundToDecimals(123.4811554, 3)).toBe(123.481)
        expect(roundToDecimals(203.4811554, 0)).toBe(203)
        expect(roundToDecimals(203, 2)).toEqual(203.0)

        expect(toCssString(white)).toEqual('oklch(100% 0 none)')
        expect(toColorHex(white)).toEqual('#FFFFFF')

        expect(() => validateOklchColorJS('redkkkk')).toThrow()
    })

    test('attempts to clamp out-of-gamut colors', () => {
        const oversaturatedRed = validateOklchColorJS({
            c: 0.9,
            h: 0,
            l: 0.7,
            mode: 'oklch',
        })

        const oversaturatedGreen = validateOklchColorJS({
            c: 0.4,
            h: 120,
            l: 0.8,
            mode: 'oklch',
        })

        const oversaturatedBlue = validateOklchColorJS({
            c: 0.45,
            h: 240,
            l: 0.6,
            mode: 'oklch',
        })

        expect(() => toClampedColor(oversaturatedRed)).not.toThrow()
        expect(() => toClampedColor(oversaturatedGreen)).not.toThrow()
        expect(() => toClampedColor(oversaturatedBlue)).not.toThrow()

        const clampedRed = toClampedColor(oversaturatedRed)
        const clampedGreen = toClampedColor(oversaturatedGreen)
        const clampedBlue = toClampedColor(oversaturatedBlue)

        expect(clampedRed).toHaveProperty('mode')
        expect(clampedGreen).toHaveProperty('mode')
        expect(clampedBlue).toHaveProperty('mode')
    })

    test('processes colors with extreme values', () => {
        const veryBright = validateOklchColorJS({
            c: 0.3,
            h: 90,
            l: 1.2,
            mode: 'oklch',
        })

        const veryDark = validateOklchColorJS({
            c: 0.2,
            h: 270,
            l: -0.1,
            mode: 'oklch',
        })

        expect(() => toClampedColor(veryBright)).not.toThrow()
        expect(() => toClampedColor(veryDark)).not.toThrow()
    })

    test('works with color space clamping', () => {
        const outOfGamut = validateOklchColorJS({
            c: 0.5,
            h: 180,
            l: 0.7,
            mode: 'oklch',
        })

        expect(() => toClampedColor(outOfGamut, 'rgb')).not.toThrow()
        expect(() => toClampedColor(outOfGamut, 'p3')).not.toThrow()
    })

    test('maintains color structure after processing', () => {
        const outOfGamut = validateOklchColorJS({
            alpha: 0.8,
            c: 0.6,
            h: 60,
            l: 0.75,
            mode: 'oklch',
        })

        const processed = toClampedColor(outOfGamut)

        expect(processed).toHaveProperty('mode')
        expect(processed.alpha).toBe(0.8)
    })

    test('handles RGB colors converted', () => {
        const normalColors: Array<ValidColorJSInput> = [
            'rgb(255 0 0)',
            { b: 0, g: 0, mode: 'rgb', r: 1 },
            { c: 0, l: 0, mode: 'oklch' },
            { c: 0.05, h: 120, l: 0.3, mode: 'oklch' },
            { c: 0.05, h: 240, l: 0.8, mode: 'oklch' },
        ]

        normalColors.forEach((input: ValidColorJSInput) => {
            const color = validateOklchColorJS(input)
            const result = toClampedColor(color)
            expect(result).toEqual(color)
        })
    })

    test('handles colors that are already in gamut', () => {
        const normalColors: Array<ValidColorJSInput> = [
            { c: 0.1, h: 0, l: 0.5, mode: 'oklch' },
            { c: 0.05, h: 120, l: 0.3, mode: 'oklch' },
            { c: 0.05, h: 240, l: 0.8, mode: 'oklch' },
        ]

        normalColors.forEach((input: ValidColorJSInput) => {
            const color = validateOklchColorJS(input)
            const result = toClampedColor(color)
            expect(result).toEqual(color)
        })
    })

    test('supports verbose logging when enabled', () => {
        const outOfGamut = validateOklchColorJS({
            c: 0.5,
            h: 0,
            l: 0.7,
            mode: 'oklch',
        })
        expect(toClampedColor(outOfGamut)).not.toThrow()

        const spy = vi.spyOn(console, 'log').mockImplementation(() => {})

        /* todo: reimplement this toClampedColor(outOfGamut, 'rgb';
        expect(spy).toHaveBeenCalledWith(
            expect.stringContaining('🎨 Color out of gamut detected'),
        );
        spy.mockRestore();*/
    })

    test('has no logging when verbose is disabled (default)', () => {
        const outOfGamut = validateOklchColorJS({
            c: 0.5,
            h: 0,
            l: 0.7,
            mode: 'oklch',
        })

        const spy = vi.spyOn(console, 'log').mockImplementation(() => {})

        toClampedColor(outOfGamut, 'rgb')

        expect(spy).not.toHaveBeenCalled()

        spy.mockRestore()
    })
})
