import { describe, expect, test } from 'vitest'

import { EmptyArray } from './../types/empty.js'
import {
    isBigInt,
    isEmptyObject,
    isInteger,
    isNonEmptyArray,
    isNonEmptyObject,
    isNotNumber,
    isNumber,
    isPrimitive,
} from './utility.typeguards.js'
describe('typeguards', () => {
    test('utility typeguards', () => {
        //TODO: PLEASE REWRITE OR RECOVER these tests
        const test = [] as const
        const testArr: EmptyArray = []
        const test2 = ['gillian']
        const testObj = { hi: 'gillian' }
        expect(isNonEmptyArray<Array<string>>(test2)).toBe(true)

        const gbt: string | number | bigint = '2'
        if (isNotNumber(gbt)) {
            const testMe: string = gbt
        }

        if (isPrimitive(gbt)) {
            const inner: string = gbt
        }

        const testBigInt = 100000000n

        expect(isBigInt(testBigInt)).toBe(true)
        expect(isInteger(testBigInt)).toBe(false)

        expect(isPrimitive(gbt)).toBe(true)
        expect(isPrimitive(test)).toBe(false)

        expect(isNotNumber(gbt)).toBe(true)
        expect(isNumber('3')).toBe(false)

        expect(isInteger(3.02)).toBe(false)
        expect(isInteger(3.0)).toBe(true)

        // @ts-expect-error should make a ts error
        expect(isNonEmptyArray(testObj)).toBe(false)

        expect(isNonEmptyObject(testObj)).toBe(true)

        // @ts-expect-error tsexpect error
        expect(isEmptyObject(test)).toBe(true)

        // @ts-expect-error tsexpect error
        expect(isEmptyObject(testArr)).toBe(true)

        // @ts-expect-error tsexpect error
        expect(isNonEmptyObject(test2)).toBe(false)
    })
})
export {}
