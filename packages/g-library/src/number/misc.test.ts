import { describe, expect, test } from 'vitest'

import { getIntegerDigitCount, randomIntInRange } from './misc.js'

describe('Numeric MISC Functions,', () => {
    test('TEST: getIntegerDigitCount:', () => {
        expect(getIntegerDigitCount(31)).toEqual(2.0)
        expect(getIntegerDigitCount(0)).toEqual(0)
    })
    test('TEST: randomIntInRange', () => {
        const testResult = randomIntInRange<31, 120>(31, 120)
        expect(testResult).toBeGreaterThanOrEqual(31)
        expect(testResult).toBeLessThanOrEqual(120)
        const testResult2 = randomIntInRange<50, 100>(50, 100)
        expect(testResult2).toBeLessThanOrEqual(100)
        expect(testResult2).toBeGreaterThanOrEqual(31)
    })
})
