import { describe, expect, test } from 'vitest'
import { numeric } from './index.js'

describe('Parse number tests, ', () => {
    test('getIntegerDigitCount:', () => {
        expect(numeric.getIntegerDigitCount(31)).toEqual(2.0)
        expect(numeric.getIntegerDigitCount(0)).toEqual(0)
    })
    test('randomIntInRange tests:', () => {
        const testResult = numeric.randomIntInRange(31, 120)
        expect(testResult).toBeGreaterThanOrEqual(31)
        expect(testResult).toBeLessThanOrEqual(120)
        const testResult2 = numeric.randomIntInRange(50, 100)
        expect(testResult2).toBeLessThanOrEqual(100)
        expect(testResult2).toBeGreaterThanOrEqual(31)
    })
})
