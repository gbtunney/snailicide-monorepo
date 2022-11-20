import 'jest'
import { isInteger, isFloat, isBigInt } from 'ramda-adjunct'
import * as _num from './numeric.js'
describe('Numeric Module', () => {
    it('isNumeric, is string/number a number value WITHOUT extraneas characters except whitespace', () => {
        const validTestValues = [
            3444.4,
            BigInt('0o377777777777777777'),
            '\n\r-100000.0',
            -3444,
            '-10',
            '0',
            '0xff',
            '0xFF',
            '8e5',
            '3.1415',
            '+10',
            '144',
            '5',
        ]
        validTestValues.forEach((value) => {
            expect(_num.isNumeric(value)).toEqual(true)
        })
        expect(_num.isNumeric<string>('\n\r-100000.0')).toEqual(true)
        expect(_num.isNumeric<bigint>(BigInt('0o377777777777777777'))).toEqual(
            true
        )
        //ramda tests
        expect(isInteger(1.0)).toEqual(true)
        expect(isInteger(1)).toEqual(true)
        expect(isBigInt(100)).toEqual(false)
        expect(isFloat(100.00002)).toEqual(true)
    })
    it('test INVALID isNumeric', () => {
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
            expect(_num.isNumeric(value)).toEqual(false)
        })
        // @ts-expect-error is a string, not number
        expect(_num.isNumeric<number>('\n\r-100000.0')).toEqual(true)
        // @ts-expect-error is a bigint, not number
        expect(_num.isNumeric<number>(BigInt('0o377777777777777777'))).toEqual(
            true
        )

        //BigInt(10) 10n is a value
        expect(isInteger(10n)).toEqual(false)
        expect(isInteger('111111 ')).toEqual(false)

        //todo do parse tests

        const number_to_test = 22.25
        expect(
            _num.isNumericFloat<typeof number_to_test, true>(number_to_test)
        ).toEqual(true)
        const int_to_test = 22.0
        expect(_num.isNumericFloat(int_to_test)).toEqual(false)

        expect(
            // @ts-expect-error isNumericFloat with strict turned on to help catch type errors
            _num.isNumericFloat<typeof int_to_test, true>(int_to_test)
        ).toEqual(false)
        expect(
            _num.isNumericInteger<typeof int_to_test, true>(int_to_test)
        ).toEqual(true)
        expect(
            // @ts-expect-error isNumericInteger with strict turned on to help catch type errors
            _num.isNumericInteger<typeof number_to_test, true>(number_to_test)
        ).toEqual(false)
    })
})
