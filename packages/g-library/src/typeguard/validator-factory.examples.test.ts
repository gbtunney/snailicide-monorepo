import { describe, expect, test } from 'vitest'
import {
    isBigIntLiteral,
    isBinaryNumber,
    isHexNumber,
    isNotBigIntLiteral,
    isNotBinaryNumber,
    isNotHexNumber,
    isNotScientificNumber,
    isScientificNumber,
} from './validator-factory.examples.js'

describe('validator-factory with dictionary regex predicates', () => {
    test('scientificNumber predicates', () => {
        expect(isScientificNumber('1e3')).toBe(true)
        expect(isScientificNumber('6.02e23')).toBe(true)
        expect(isScientificNumber('abc')).toBe(false)
        expect(isNotScientificNumber('abc')).toBe(true)
    })

    test('hexNumber predicates', () => {
        expect(isHexNumber('0xff')).toBe(true)
        expect(isHexNumber('+0xA')).toBe(true)
        expect(isHexNumber('0x')).toBe(false)
        expect(isNotHexNumber('0x')).toBe(true)
    })

    test('binaryNumber predicates', () => {
        expect(isBinaryNumber('0b1010')).toBe(true)
        expect(isBinaryNumber('-0b11')).toBe(true)
        expect(isBinaryNumber('0b102')).toBe(false)
        expect(isNotBinaryNumber('0b102')).toBe(true)
    })

    test('bigIntLiteral predicates', () => {
        expect(isBigIntLiteral('10n')).toBe(true)
        expect(isBigIntLiteral('-0xFFn')).toBe(true)
        expect(isBigIntLiteral('0b1010n')).toBe(true)
        expect(isBigIntLiteral('10')).toBe(false)
        expect(isNotBigIntLiteral('10')).toBe(true)
    })
})
