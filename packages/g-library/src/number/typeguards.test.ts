import { describe, expect, test } from 'vitest'

import { isParsableToNumeric, isPossibleNumeric } from './typeguards.js'

describe('transform numeric tests,', () => {
    test('transform: TODO:', () => {
        expect(isPossibleNumeric('222')).toEqual(true)
        expect(isPossibleNumeric(' 222  ')).toEqual(true)

        expect(isPossibleNumeric('222px')).toEqual(false)
        expect(isPossibleNumeric('222px', false)).toEqual(true)
        expect(isPossibleNumeric('-100000.0')).toEqual(true)

        expect(true).toEqual(true)

        const value = 'px'
        expect(isParsableToNumeric(value)).toEqual(false)

        const testValue = ' 200px'
        expect(isParsableToNumeric(testValue)).toEqual(true)
        expect(isPossibleNumeric(testValue)).toEqual(false)

        console.log(
            'isPossibleNumeric',
            isPossibleNumeric(testValue),
            'isParsableToNumeric',
            isParsableToNumeric(testValue),
        )

        const validTestValues = [
            3444.4,
            BigInt('0o377777777777777777'),
            '\n\r-100000.0',
            -3444,
            '-10',
            //   '0',
            '0xff',
            '0xFF',
            //'8e5',
            '3.1415',
            '+10',
            '144',
            '5',
            //'22px'
        ]
        validTestValues.forEach((value) => {
            expect(isPossibleNumeric(value)).toEqual(true)
        })
    })
})

export {}
