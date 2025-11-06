import { describe, expect, test } from 'vitest'
import { toNumeric } from './transform.js'
import { isPossibleNumeric, isStringNumeric } from './validators.js'

describe('toNumeric equality (string vs literal)', () => {
    test.each([
        // plain decimals
        ['0', 0],
        ['5', 5],
        ['144', 144],
        ['3.1415', 3.1415],
        ['100000.0', 100000.0],
        ['  222  ', 222],
        // signed decimals
        ['+10', 10],
        ['-10', -10],
        // scientific
        ['1e3', 1000],
        ['1e+3', 1000],
        ['1e-3', 0.001],
        ['7.123e01', 71.23],
        ['0e0', 0],
        ['6.02e23', 6.02e23],
        ['1.0e+0', 1],
        ['8e5', 800000],
        // hex/binary
        ['0xff', 255],
        ['0xFF', 255],
        ['-0xAbc', -0xabc],
        ['+0x00F', 15],
        ['0b1010', 10],
    ])('string->number equals literal: %s => %o', (s, expected) => {
        expect(isStringNumeric(s)).toBe(true)
        expect(isPossibleNumeric(s)).toBe(true)
        const parsed = toNumeric(s)
        expect(typeof parsed).toBe('number')
        expect(parsed).toBeCloseTo(expected, 12)
    })

    test.each<[string, bigint]>([
        ['0n', 0n],
        ['10n', 10n],
        ['-1n', -1n],
        ['0x01n', 1n],
    ])('string->bigint equals literal: %s => %s', (s, expected) => {
        expect(isStringNumeric(s)).toBe(true)
        expect(isPossibleNumeric(s)).toBe(true)
        const parsed = toNumeric(s)
        expect(typeof parsed).toBe('bigint')
        expect(parsed).toBe(expected)
    })

    test.each([
        // clearly invalid shapes should not parse
        'e10',
        '1e',
        '1e+',
        '1e-',
        '1ee10',
        '1e--10',
        '1e10px',
        '+e10',
        '-e10',
        '2_',
        '2._2',
        '00.',
    ])('invalid string does not parse: %s', (s) => {
        expect(isStringNumeric(s)).toBe(false)
        expect(isPossibleNumeric(s)).toBe(false)
        expect(toNumeric(s)).toBeUndefined()
    })
})
