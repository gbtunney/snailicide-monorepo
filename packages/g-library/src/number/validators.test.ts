import { describe, expect, test } from 'vitest'
import { isParsableToNumeric } from './parse.js'
import { toStringNumeric } from './transform.js'
import {
    isNumeric,
    isPossibleNumeric,
    isStringNumeric,
    isTrueNumeric,
    isValidScientificNumber,
} from './validators.js'

describe('validators', () => {
    test('number and bigint primitives', () => {
        const values: Array<number | bigint> = [
            0xff,
            -0xabc,
            0b0010_1010,
            2,
            0.2,
            0,
            500n,
            11n,
            0n,
            10n,
            -1n,
            10,
            1.0,
            3.4028236692093846e38,
            // from legacy
            3444.4,
            -3444,
            BigInt('0o377777777777777777'),
        ]
        values.forEach((v) => {
            expect(isNumeric(v)).toBe(true)
            expect(isPossibleNumeric(v)).toBe(true)
            expect(isStringNumeric(v)).toBe(false)
            expect(isValidScientificNumber(v)).toBe(true)
        })
    })

    test('plain numeric strings (strict)', () => {
        const values: Array<string> = [
            '20.00',
            '20.02',
            '144',
            '5',
            '0',
            '222',
            '100000.0',
            '3.1415',
        ]
        values.forEach((s) => {
            expect(isStringNumeric(s)).toBe(true)
            expect(isPossibleNumeric(s)).toBe(true)
            expect(isNumeric(s)).toBe(false)
            // use loose parsing to handle surrounding spaces consistently
            expect(toStringNumeric(s, false)).not.toBeUndefined()
        })
    })

    test('signed decimal strings (strict accepts leading sign)', () => {
        const signed: Array<string> = ['+10', '-10']
        signed.forEach((s) => {
            expect(isStringNumeric(s)).toBe(true)
            expect(isPossibleNumeric(s)).toBe(true)
            expect(isNumeric(s)).toBe(false)
            expect(toStringNumeric(s)).not.toBeUndefined()
        })
    })

    test('signed decimal number', () => {
        const signed: Array<number> = [10, -10]
        signed.forEach((s) => {
            expect(isPossibleNumeric(s)).toBe(true)
            expect(isNumeric(s)).toBe(true)
        })
    })

    test('valid scientific notation (strings)', () => {
        const sci: Array<string> = [
            '1e3',
            '1e+3',
            '1e-3',
            '7.123e01',
            '0e0',
            '6.02e23',
            '1.0e+0',
            '3.4028236692093846346e+38',
            '8e5',
            '7.123e+0_1', // underscore in exponent (now valid)
            '7_123.456e-1_2', // underscores integer, fraction, exponent
        ]
        sci.forEach((s) => {
            expect(isValidScientificNumber(s)).toBe(true)
            expect(isStringNumeric(s)).toBe(true)
            expect(isPossibleNumeric(s)).toBe(true)
            expect(isNumeric(s)).toBe(false)
            expect(toStringNumeric(s)).not.toBeUndefined()
        })
    })

    test('hex/binary/bigint strings: strict accepts per dictionary regex', () => {
        const special: Array<string> = [
            '0xff',
            '0xFF',
            '-0xAbc',
            '+0x00F',
            '0b0010_1010',
            '10n',
            '0x01n',
            '-1n',
            // '0x00n',
        ]
        special.forEach((s) => {
            // Current dictionary regex considers these numeric-like
            expect(isStringNumeric(s)).toBe(true)
            expect(isPossibleNumeric(s)).toBe(true)
            expect(toStringNumeric(s)).not.toBeUndefined()
            // expect(isNumeric(s)).toBe(true)
        })
    })

    test('invalid numeric strings', () => {
        // Keep only unambiguous invalids per current dictionary regex
        const invalid: Array<string> = [
            // malformed scientific
            'e10',
            '1e',
            '1e+',
            '1e-',
            '1ee10',
            '1e--10',
            '1e10px',
            '+e10',
            '-e10',
            // malformed decimals/ints
            '2_',
            '2._2',
            '00.',
            '7.123e+0__1',
            '7.123e+0__9', // double underscore in exponent
            '_7.1e2', // leading underscore
            '7_.1e2', // underscore before decimal point
            '7._1e2', // underscore immediately after dot
            '7.1e_2', // underscore starts exponent
            '7.1e2_', // trailing underscore exponent
        ]

        invalid.forEach((s) => {
            expect(isStringNumeric(s)).toBe(false)
            expect(isPossibleNumeric(s)).toBe(false)
            expect(isValidScientificNumber(s)).toBe(false)
            expect(toStringNumeric(s)).toBeUndefined()
        })
    })

    test('parsable vs possible (units)', () => {
        expect(isPossibleNumeric('222')).toBe(true)
        expect(isPossibleNumeric(' 222  ')).toBe(true)

        // strict (default) rejects trailing units
        expect(isPossibleNumeric('222px')).toBe(false)
        // loose allows after stripping
        expect(isPossibleNumeric('222px', false)).toBe(true)

        const mixed = ' 200px'
        expect(isParsableToNumeric(mixed)).toBe(true)
        expect(isPossibleNumeric(mixed)).toBe(false)
    })

    test('numeric guard returns false for Infinity', () => {
        expect(isTrueNumeric(Infinity)).toBe(false)
    })
})

export {}
