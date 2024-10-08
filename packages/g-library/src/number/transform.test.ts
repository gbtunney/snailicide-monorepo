import { describe, expect, test } from 'vitest'
import { toNumeric } from './transform.js'
import { isNumeric, isPossibleNumeric } from './validators.js'

describe('Numeric Transform,', () => {
    test('test: toNumeric:', () => {
        expect(true).toEqual(true)
        const _testBigInt = toNumeric('1000000n')
        expect(typeof _testBigInt).toEqual('bigint')
        expect(isPossibleNumeric('10101000000n')).toEqual(true)

        expect(isNumeric(BigInt(1000000n))).toEqual(true)
        const __result = toNumeric(BigInt(1000000n))
        expect(typeof __result).toEqual('bigint')
    })
})

export {}
