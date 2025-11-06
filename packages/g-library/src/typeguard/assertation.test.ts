import { describe, expect, test } from 'vitest'
import {
    isNumeric,
    isPossibleNumeric,
    isValidScientificNumber,
} from './../number/validators.js'
import { PlainObject } from './../types/utility.js'
import { guardToAssertion, predicateToAssertion } from './assertation.js'
import { isJsonifiableArray } from './json.typeguards.js'
import { isBigInt, isPlainObject, isString } from './utility.typeguards.js'

/** Local predicates for this test */
const minLen = (value: string, min: number): boolean =>
    typeof value === 'string' && value.length >= min
const startsWithPrefix = (value: string, prefix: string): boolean =>
    typeof value === 'string' && value.startsWith(prefix)

// Assertion function types
type AssertString = (value: unknown) => asserts value is string
type AssertBigInt = (value: unknown) => asserts value is bigint
type AssertNumber = (value: unknown) => asserts value is number
type AssertPlainObject = (
    value: unknown,
) => asserts value is PlainObject | Record<string, unknown>
type AssertJsonArray = (value: unknown) => asserts value is Array<unknown>
type AssertPossibleNumeric = (
    value: unknown,
    strict?: boolean,
) => asserts value is number | string
type AssertScientific = (value: unknown) => asserts value is string
type AssertMinLen = (value: string, min: number) => asserts value is string
type AssertStartsWith = (
    value: string,
    prefix: string,
) => asserts value is string

// Guard-derived assertions
const assertIsString: AssertString = guardToAssertion(isString)
const assertIsBigInt: AssertBigInt = guardToAssertion(isBigInt)
const assertIsNumeric: AssertNumber = guardToAssertion(isNumeric)
/** Wrap to widen the parameter to unknown */
const assertIsPossibleNumeric: AssertPossibleNumeric = (value, strict) =>
    (guardToAssertion(isPossibleNumeric) as any)(value as any, strict)
const assertIsPlainObject: AssertPlainObject = (value) =>
    (guardToAssertion(isPlainObject) as any)(value as any)
const assertIsJsonArray: AssertJsonArray = guardToAssertion(isJsonifiableArray)

// Predicate-based assertions
const assertMinLen: AssertMinLen = predicateToAssertion(minLen)
const assertStartsWithPrefix: AssertStartsWith =
    predicateToAssertion(startsWithPrefix)
const assertIsValidScientific: AssertScientific = (value) =>
    (predicateToAssertion<string>(isValidScientificNumber as any) as any)(
        value as any,
    )

describe('typeguards', () => {
    test('string', () => {
        assertIsString('ok')
        expect(() => {
            assertIsString(42)
        }).toThrow()
    })

    test('bigint', () => {
        assertIsBigInt(10n)
        expect(() => {
            assertIsBigInt('10')
        }).toThrow()
    })

    test('numeric', () => {
        assertIsNumeric(2)
        expect(() => {
            assertIsNumeric('2' as any)
        }).toThrow()
        assertIsPossibleNumeric(2)
        expect(() => {
            assertIsPossibleNumeric('2tt', true)
        }).toThrow()
    })

    test('plain object', () => {
        assertIsPlainObject({ hello: 'ff' })
        expect(() => {
            assertIsPlainObject(2)
        }).toThrow()
    })

    test('json array', () => {
        assertIsJsonArray(['str1', 'str2'])
        expect(() => {
            assertIsJsonArray({ hello: 'ff' })
        }).toThrow()
    })

    test('min length', () => {
        assertMinLen('abc', 2)
        expect(() => {
            assertMinLen('a', 2)
        }).toThrow()
    })

    test('starts with prefix', () => {
        assertStartsWithPrefix('abc', 'a')
        expect(() => {
            assertStartsWithPrefix('_abc', 'a')
        }).toThrow()
    })

    test('scientific', () => {
        expect(() => {
            assertIsValidScientific('1e-10')
        }).toBeDefined()
        expect(() => {
            assertIsValidScientific('10')
        }).toBeDefined()
        expect(() => {
            assertIsValidScientific('1.2.3')
        }).toThrow()
        expect(() => {
            assertIsValidScientific('10nnnn')
        }).toThrow()
    })
})

const unsafeFn: (value: string, ...args: Array<unknown>) => boolean = (value) =>
    value.length > 0
