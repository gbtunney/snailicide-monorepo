import { describe, expect, test } from 'vitest'
import {
    isStringNumeric,
    isValidScientificNumber,
    isInteger,
    isNonInteger,
    isValidNumber,
    isValidBigInt,
    toStringNumeric,
} from './validators.js'
import {
    trimWhiteSpace,
    removeAllNewlines,
    escapeUnicode,
    escapeRegExp,
} from '../string/_stringUtils.js'
import { PossibleNumeric } from './numeric'
import {
    getRegExpStartOfString,
    stringListToRegexp,
} from '../regexp/stringToRegexp.js'

//if ( escapeRegExp) getRegExpStartOfString
///if its  a valid scientific number
// if string
// if new Number is NAN, then it
//if it ends in 'n' its a bigint ( exampel 0x01n or 2n ) >>> remove n and new BigInt and test its validity
//if it leads with a +0x or -0x it is an in  can be parsed as integr
//if parse Int !== parseFloat    then parseFloat
//if (newNumber === parseInt && parseInt !== parseFloat)    then parseInt
//if newNumber === parseFloat  parsefloat
// if (validNumber === false and bigint ===true ) return number
/// if (validNumber === true and bigint ===false ) return number)

///if string && not valid scientific number  && but contains digits    parseFloat ??

const logNumbers = (valueArr: (number | bigint | string)[]) => {
    valueArr.forEach((value) => {
        console.log(
            value,
            'isValidScientificNumber',
            isValidScientificNumber(value),
            'isValidNumber',
            isValidNumber(value),
            'isBigInt',
            isValidBigInt(value),
            'isCastableString',
            isStringNumeric(value),
            /// "isNonInteger" ,isNonInteger(value)
        )
    })
}
const logStrings = (valueArr: string[]) => {
    valueArr.forEach((value) => {
        //const value =_value.toString()
        console.log(
            value,
            'logStrings isValidScientificNumber',
            isValidScientificNumber(value),
            'toStringNumeric',
            toStringNumeric(value),
            typeof toStringNumeric(value),

            //  "isBigInt" ,BigInt(value),
            ' new Number( value)',
            new Number(value),
            'parseInt',
            parseInt(value),
            'parseFloat',
            parseFloat(value),

            //   "isValidNumber" ,isValidNumber(value),
            // "isInteger" ,isInteger(value),
            // "isBigInt" ,isBigInt(value),
            // "isNonInteger" ,isNonInteger(value)
        )
    })
}

describe('validators', () => {
    test('transform: TODO:', () => {
        // match:
        const validNumbers: (number | bigint)[] = [
            0xff, //these should be integers
            0xff, //these should be integers
            7.123e0_1,
            -0xabc,
            +0x00f,
            0b0010_1010,
            2,
            0.2,
            0,
            500n,
            1_1n,
            0x0n,
            10n,
            0x00n,
            -1n,
            +10,
            3.4028236692093846346e38,
        ]
        const validSrer: string[] = [
            '882812888n',
            '0xff', //these should be integers
            '0xFF', //these should be integers
            '20.00',
            '20.02',
            '7.123e+0_1',
            '-0xAbc',
            '+0x00F',
            '0b0010_1010',
            '0x0n',
            '10n',
            '0x00n',
            '-1n',
            '+10',
            '3.4028236692093846346e+38',
            '0x01n',
        ]

        //octal literals??

        // error:
        const invalidNumbers: (number | bigint)[] = [/* '+1n'*/ NaN, Infinity]
        //isValidScientificNumber

        // logNumbers( validNumbers)
        // logStrings(validSrer)
        // getRegExpFromStrings()

        logStrings(['20.00', '20.02', '88281n2888n'])

        //  console.log( "!!!BigInt"  , toStringNumeric("0xFF " ,false) )
        //logStrings(validSrer)

        // console.log("BIG INT " , "isValidNumber" , typeof new Number( "20.00").valueOf() )
        const validStrings = ['0e0', '08.123e+0_1', '018e1', '01812.1', '08000']

        const invalidStrings = [
            '07.123e+0_1',
            '2_',
            '2._2',
            '0e',
            '0070e0',
            '00.',
            '0111._',
            '017e1',
            '017.1',
            '_n',
            '_0n',
            '0_n',
            '1e3n',
        ]
    })
})

export {}
