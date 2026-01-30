import { describe, expect, test } from 'vitest'
import {
    bigintNumber,
    binaryNumber,
    hexNumber,
    scientificNumber,
} from './dictionary.js'

describe('regexp/dictionary', () => {
    describe('scientificNumber', () => {
        test.each([
            '1',
            '1.0',
            '.5',
            '1e3',
            '1e+3',
            '1e-3',
            '7.123e01',
            '0e0',
            '6.02e23',
            '1.0e+0',
            '3.4028236692093846346e+38',
            '8e5',
            // underscores allowed
            '1_000',
            '1_000.0_0',
            '.1_0',
            '1.2_3',
            '1e1_0',
            '7_123.456e-1_2',
            '+1_000.5e+1_0',
            '-.9_9e-0_2',
        ])('valid: %s', (s) => {
            expect(scientificNumber.test(s)).toBe(true)
        })

        test.each([
            'e10',
            '1e',
            '1e+',
            '1e-',
            '1ee10',
            '1e--10',
            '+e10',
            '-e10',
            // bad underscores
            '1__0',
            '1._0',
            '1_.0',
            '1e_2',
            '1e2_',
            '_1',
            '1_',
            '._1',
            '2._2',
            '00.', // trailing dot without fraction
        ])('invalid: %s', (s) => {
            expect(scientificNumber.test(s)).toBe(false)
        })
    })

    describe('hexNumber', () => {
        test.each([
            '0x0',
            '0xff',
            '0xFF',
            '+0xA',
            '-0xAbc',
            '0xdead_beef',
            '0xA_B_C',
        ])('valid: %s', (s) => {
            expect(hexNumber.test(s)).toBe(true)
        })

        test.each([
            '0x', // no digits
            '0xG', // non-hex
            '0x_FF', // leading underscore
            '0xFF_', // trailing underscore
            '0xA__B', // double underscore
        ])('invalid: %s', (s) => {
            expect(hexNumber.test(s)).toBe(false)
        })
    })

    describe('binaryNumber', () => {
        test.each(['0b0', '0b1', '0b1010', '+0b1_0_1', '-0b11_00'])(
            'valid: %s',
            (s) => {
                expect(binaryNumber.test(s)).toBe(true)
            },
        )

        test.each([
            '0b', // no digits
            '0b2', // non-binary
            '0b_10', // leading underscore
            '0b10_', // trailing underscore
            '0b1__0', // double underscore
        ])('invalid: %s', (s) => {
            expect(binaryNumber.test(s)).toBe(false)
        })
    })

    describe('bigintNumber', () => {
        test.each([
            '0n',
            '10101000000n',
            '10n',
            '+1_000n',
            '-0n',
            '0xFFn',
            '-0xA_Bn',
            '0b10_10n',
        ])('valid: %s', (s) => {
            expect(bigintNumber.test(s)).toBe(true)
        })

        test.each([
            '10', // missing n
            '10_n', // underscore before n
            '10n_', // trailing underscore
            '+0xn', // missing digits
            '0x_n', // underscore right after base
            '0bn', // missing digits
            '0b_n', // underscore right after base
            '1__0n', // double underscore
        ])('invalid: %s', (s) => {
            expect(bigintNumber.test(s)).toBe(false)
        })
    })
})
