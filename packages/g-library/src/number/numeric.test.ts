import { isBigInt, isFloat, isInteger } from 'ramda-adjunct'
import { describe, expect, test } from 'vitest'
import {
    isNumeric,
    isNumericFloat,
    isNumericInteger,
    isPossibleNumeric,
} from './validators.js'

describe('Numeric Module', () => {
    test('isNumeric, is string/number a number value WITHOUT extraneas characters except whitespace', () => {
        const validTestValues = [
            3444.4,
            BigInt('0o377777777777777777'),
            '100000.0',
            -3444,
            '-10',
            '0',
            '0xff',
            '0xFF',
            //TODO: problem value now. anything with a valid scientific value    '8e5',
            '3.1415',
            '144',
            '5',
        ]
        //   '8e5'
        //  const hih = "toto".t
        // expect( isValidScientificNumber('8e5')).toEqual(true)
        validTestValues.forEach((value) => {
            expect(isPossibleNumeric(value)).toEqual(true)
        })

        //isValidScientificNumber()
        expect(isPossibleNumeric<string>('\n\r-100000.0', false)).toEqual(true)
        expect(isNumeric<bigint>(BigInt('0o377777777777777777'))).toEqual(true)
        //ramda tests
        expect(isInteger(1.0)).toEqual(true)
        expect(isInteger(1)).toEqual(true)
        expect(isBigInt(100)).toEqual(false)
        expect(isFloat(100.00002)).toEqual(true)
    })
    test('INVALID isNumeric', () => {
        const invalidTestValues = [
            '',
            'abc',
            '10%',
            '2^10',
            '10px',
            '#10',
            '2!',
            '(10)',
            '\n-\r100000',
            '1,000 ',
            ' 100 000',
            '-0x42',
            '100.00.00',
            '7.2acdgs',
            {},
            [],
            NaN,
            null,
            true,
            Infinity,
            undefined,
        ]
        invalidTestValues.forEach((value) => {
            expect(isNumeric(value)).toEqual(false)
        })
        expect(isNumeric<number>('false')).toEqual(false)
        expect(isNumeric(BigInt('0o377777777777777777'))).toEqual(true)
        //BigInt(10) 10n is a value
        expect(isInteger(10n)).toEqual(false)
        expect(isInteger('111111 ')).toEqual(false)
        const number_to_test = 22.25
        expect(isNumericFloat(number_to_test)).toEqual(true)
        const int_to_test = 22
        expect(isNumericFloat(int_to_test)).toEqual(false)

        expect(
            // @ts-expect-error isNumericFloat with strict turned on to help catch type errors
            isNumericFloat<typeof int_to_test, true>(int_to_test),
        ).toEqual(false)
        expect(isNumericInteger(int_to_test)).toEqual(true)
        expect(isNumericInteger<typeof number_to_test>(number_to_test)).toEqual(
            false,
        )
    })
})

/*// match:
08.123e+0_1
7.123e+0_1
-0xAbc
+0x00F
0b0010_1010
2.
.2
0.
0e0
500n
1_1n
0x0n
10n
0x00n
-1n
018e1
01812.1
08000.
00009.
01911.

// values that should error:?
2
07.123e+0_1
2_
2._2
0e
0070e0
00.
0111.
017e1
017.1
+1n
00n
0.n
.0n
.n
_n
_0n
0_n
1e3n
1ne3
1ne3n*/
