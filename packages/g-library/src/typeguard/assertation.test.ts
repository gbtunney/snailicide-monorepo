import { describe, expect, test } from 'vitest'
import {
    isNumeric,
    isPossibleNumeric,
    isValidScientificNumber,
} from './../number/validators.js'
import { guardToAssertion, predicateToAssertion } from './assertation.js'
import {
    isJsonifiableArray,
} from './json.typeguards.js'
import { isBigInt, isPlainObject, isString } from './utility.typeguards.js'

describe('typeguards', () => {
    test('utility assertions from typeguards', () => {
        const assertIsString = guardToAssertion(isString)
        const assertIsBigInt = guardToAssertion(
            isBigInt as (v: unknown) => v is bigint,
        )

        expect(() => { assertIsString('ok'); }).not.toThrow()
        expect(() => { assertIsString(42); }).toThrow(TypeError)

        expect(() => { assertIsBigInt(10n); }).not.toThrow()
        expect(() => { assertIsBigInt('10'); }).toThrow(TypeError)

        expect(() => { guardToAssertion(isNumeric)(2); }).not.toThrow()
        expect(() => { guardToAssertion(isPossibleNumeric)(2, true); }).not.toThrow()

        expect(() => { guardToAssertion(isPossibleNumeric)('tt'); }).toThrow()
        expect(() => { guardToAssertion(isPossibleNumeric)('2tt', true); }).toThrow()
        expect(() =>
            { guardToAssertion(isPossibleNumeric)('2tt', false); },
        ).not.toThrow()

        expect(() =>
            { guardToAssertion(isPlainObject)({ hello: 'ff' }); },
        ).not.toThrow()

        // @ts-expect-error tsexpect error
        expect(() => { guardToAssertion(isPlainObject)(2); }).toThrow()

        expect(() =>
            { guardToAssertion(isJsonifiableArray)(['str1', 'str2']); },
        ).not.toThrow()

        expect(() =>
            { guardToAssertion(isJsonifiableArray)({ hello: 'ff' }); },
        ).toThrow()
    })
    test('predicateToAssertion examples', () => {
        /**
         * Local boolean predicate with extra arg
         */
        const minLen = (s: string, n: number): boolean => s.length >= n
        const assertMinLen = predicateToAssertion(minLen)
        expect(() => { assertMinLen('abc', 2); }).not.toThrow()
        expect(() => { assertMinLen('a', 2); }).toThrow(TypeError)

        const startsWithPrefix = (
            value: string,
            prefix: string = '_',
        ): boolean => value.startsWith(prefix)

        // starts with predicate
        expect(() => { predicateToAssertion(startsWithPrefix)('abc'); }).toThrow()
        expect(() =>
            { predicateToAssertion(startsWithPrefix)('_abc'); },
        ).not.toThrow()

        // Scientific notation predicate
        const assertIsValidScientific = predicateToAssertion<string>(
            isValidScientificNumber,
        )
        expect(() => { assertIsValidScientific('1e-10'); }).not.toThrow()
        expect(() => { assertIsValidScientific('1.2.3'); }).toThrow(TypeError)
        // @ts-expect-error tsexpect error
        expect(() => { assertIsValidScientific(10n); }).not.toThrow()
    })
})
