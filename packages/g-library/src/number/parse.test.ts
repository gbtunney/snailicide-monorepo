import { describe, expect, test } from 'vitest'

import * as _parse from './parse.js'
import { isParsableToNumeric } from './typeguards.js'
import { isNumeric } from './validators.js'

describe('Parse Module', () => {
    test('isParsableToNumeric', () => {
        expect(isParsableToNumeric('\n\r-100000.0')).toEqual(true)
        //demo the difference between these
        const test_value = ' 100000.02px'
        expect(isNumeric(test_value)).toEqual(false)
        ////todo: fix isParsableToNumeric numeric if it starts with leter
        expect(isParsableToNumeric(test_value)).toEqual(true)
        expect(_parse.parseToFloat(test_value)).toBe(100000.02)
        //jest ignores zeros anyway
        expect(_parse.parseStringToInteger(test_value)).toEqual(100000)

        const test_value_2 = ' 100000.02.22px'
        expect(isNumeric(test_value_2)).toEqual(false)
        expect(isParsableToNumeric(test_value_2)).toEqual(true)
        expect(_parse.parseToFloat(test_value_2)).toBe(100000.02)
        expect(_parse.parseStringToInteger(test_value_2)).toBe(100000)
        expect(_parse.parseStringToInteger(test_value_2)).toBe(100000.0)

        const busted_value = 'rr107777.444px'
        expect(isNumeric(busted_value)).toEqual(false)
        expect(isParsableToNumeric(busted_value)).toEqual(true)
        expect(_parse.parseStringToNumeric(busted_value)).toEqual(107777.444)
        expect(_parse.parseStringToInteger(busted_value)).toEqual(107777)

        //TODO: THIS LINE WILL BREAK BC IT HATES LETTERS AT START  either remove leading characters or idk.
        // expect(_parse.parseToFloat(busted_value)).toBe(10)
    })
})

/*const invalidTestValues = [
            "",
            "abc",
            "10%",
            "2^10",
            "10px",
            "#10",
            "2!",
            "(10)",
            "\n-\r100000",
            "1,000 ",
            " 100 000",
            "-0x42",
            '100.00.00',
            "7.2acdgs",
            {},
            [],
            NaN,
            null,
            true,
            Infinity,
            undefined
        ]
        invalidTestValues.forEach( (value )=>{
            expect(_num.isNumeric(value )).toEqual(false)
        })

        //BigInt(10) 10n is a value
        expect( isInteger( 10n )).toEqual(false)
        expect( isInteger( "111111 " )).toEqual(false)

        //todo do parse tests

        const number_to_test = 22.25
        expect( _num.isNumericFloat<typeof number_to_test, true>(number_to_test)).toEqual(true)
        const int_to_test = 22.00
        expect( _num.isNumericFloat(int_to_test)).toEqual(false)

       */
