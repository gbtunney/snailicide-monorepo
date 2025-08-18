import { describe, expect, test } from 'vitest'
import {
    adjustLightness,
    setChroma,
    setLightness,
    shiftChroma,
    shiftHue,
} from '../adjustments.js'
import { validateOklchColorJS } from '../core.js'
import { ValidOklchColor } from '../types.js'

describe('Adjustments Functions', () => {
    const baseColor: ValidOklchColor = validateOklchColorJS({
        c: 0.5,
        h: 200,
        l: 0.5,
        mode: 'oklch',
    })

    test('setChroma sets chroma correctly', () => {
        const result = setChroma(baseColor, 0.8)
        expect(result.c).toBeCloseTo(0.8)
    })

    test('shiftChroma shifts chroma correctly', () => {
        const result = shiftChroma(baseColor, 0.2)
        expect(result.c).toBeCloseTo(0.7)
    })

    test('adjustLightness adjusts lightness relatively', () => {
        const result = adjustLightness(baseColor, 0.2, true)
        expect(result.l).toBeCloseTo(0.6)
    })

    test('adjustLightness adjusts lightness absolutely', () => {
        const result = adjustLightness(baseColor, 0.8, false)
        expect(result.l).toBeCloseTo(0.8)
    })

    test('setLightness sets lightness correctly', () => {
        const result = setLightness(baseColor, 0.9)
        expect(result.l).toBeCloseTo(0.9)
    })

    test('shiftHue shifts hue correctly', () => {
        const result = shiftHue(baseColor, 30, 'deg')
        expect(result.h).toBeCloseTo(230)
    })
})
