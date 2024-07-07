import {
    isBigInt,
    isFinite,
    isFloat,
    isInteger,
    isNaN,
    isNotNaN,
    isString,
    isValidNumber,
} from 'ramda-adjunct'
import { PossibleNumeric, Numeric } from './numeric.js'
import { removeAllNewlines } from '../string/_stringUtils.js'
import { getRegExpStartOfString } from '../regexp/stringToRegexp.js'

;('possiblr numeric means string|number|bigint ')
///dtrict mode does not allow sny extraneous characters except whitespace .

export const isPossibleNumeric = <Type extends PossibleNumeric>(
    value: Type,
    strict: boolean = true,
): value is Type => {
    ///string NON strict mode, see if it contains a number
    if (isBigInt(value) || isValidNumber(value)) return true
    if (isString(value) && /\d/.test(value) && value.toString().length > 0) {
        ///a string that contains a digit.
        //if strict mode is false = see ifg it contains a non digit , non whitespace character
        console.log(
            'removeAllNewlines(value) ',
            Number.parseFloat(removeAllNewlines(value)),
        )
        if (!/^[0x]/.test(value)) {
            if (strict === true && /[a-zA-Z]/.test(removeAllNewlines(value)))
                return false
        } else {
            return true
        }

        //console.log("FLOAT IS ",strict,Number.parseFloat(String(value)) , isNotNaN(Number(Number.parseFloat(String(value)))), isFinite(Number(value)))
    }

    const _pre: string = removeAllNewlines(value.toString())

    const _number =
        /^[0x]/.test(_pre) &&
        parseFloat(_pre) === 0 &&
        parseInt(_pre) > parseFloat(_pre)
            ? parseInt(_pre)
            : parseFloat(_pre)
    console.log('its ', _number, value, isNotNaN(_number), isFinite(_number))

    return isNotNaN(_number) && isFinite(_number)
}

;('is numeric means number|bigint ')
export const isTrueNumeric = <Type extends Numeric>(
    value: unknown,
    strict: boolean = true,
): value is Type => {
    return (
        isNotNaN(Number(Number.parseFloat(String(value)))) &&
        isFinite(Number(value))
    )
}

export const isParsableToNumeric = <Type extends PossibleNumeric>(
    value: unknown,
): value is Type => {
    //const regex = new RegExp(/(\?+1)([a-z]|[A-Z]|\$|!|@|#|%|&)+(\d)/ )
    if (isString(value) && /\d/.test(value) && value.toString().length > 0) {
        //if string and contains digits
        //  if (isNaN(Number(Number.parseFloat(String(value))))) return false
        // else return true
    } else if (isBigInt(value) || isValidNumber(value)) return true
    return false
}
