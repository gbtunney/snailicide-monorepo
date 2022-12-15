import * as _parse from './parse.js'
import * as _num from './numeric.js'

describe('Parse Module', () => {
    it('isParsableToNumeric', () => {
        expect(_parse.isParsableToNumeric('\n\r-100000.0')).toEqual(true)
        //demo the difference between these
        const test_value = ' 100000.02px'
        expect(_num.isNumeric(test_value)).toEqual(false)
        ////todo: fix isParsableToNumeric numeric if it starts with leter
        expect(_parse.isParsableToNumeric(test_value)).toEqual(true)
        expect(_parse.parseToFloat(test_value)).toBe(100000.02)
        //jest ignores zeros anyway
        expect(_parse.parseToInteger(test_value)).toEqual(100000)

        const test_value_2 = ' 100000.02.22px'
        expect(_num.isNumeric(test_value_2)).toEqual(false)
        expect(_parse.isParsableToNumeric(test_value_2)).toEqual(true)
        expect(_parse.parseToFloat(test_value_2)).toBe(100000.02)
        expect(_parse.parseToInteger(test_value_2)).toBe(100000)
        expect(_parse.parseToInteger(test_value_2)).toBe(100000.0)

        const busted_value = 'rr107777.444px'
        expect(_num.isNumeric(busted_value)).toEqual(false)
        expect(_parse.isParsableToNumeric(busted_value)).toEqual(false)
        //TODO: THIS LINE WILL BREAK BC IT HATES LETTERS AT START  either remove leading characters or idk.
        // expect(_parse.parseToFloat(busted_value)).toBe(10)
    })
})
/*
describe('Parse number tests, ', () => {
    it('returns `number` when parseIntegerType', () => {
        expect(parseIntegerType(33)).toBe(33)
        expect(parseIntegerType('33px')).toBe(33)
        expect(parseIntegerType('33.33')).toBe(33)
        expect(parseIntegerType('33.333px')).toBe(33)
        expect(parseIntegerType('  px')).toBe(undefined)
        expect(parseIntegerType(33.333)).toBe(33)
    })
    it('returns `number` when parseFloatType',() => {
        expect(parseFloatType(33)).toBe(33)
        expect(parseFloatType('33px')).toBe(33)
        expect(parseFloatType('33.02')).toBe(33.02)
        expect(parseFloatType('33.25px')).toBe(33.25)
        expect(parseFloatType('  px')).toBe(undefined)
        expect(parseFloatType(33)).toBe(33.00)
    })
})*/
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
