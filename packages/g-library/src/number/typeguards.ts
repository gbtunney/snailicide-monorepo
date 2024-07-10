import { isFinite, isNotNaN, isValidNumber } from 'ramda-adjunct'
import { PossibleNumeric, Numeric } from './numeric.js'
import { removeAllNewlines } from '../string/_stringUtils.js'
import { isString, isBigInt } from '../typeguard/utility.typeguards.js'
const LOGGING: boolean = false

export const isParsableToNumeric = <Type extends PossibleNumeric>(
    value: Type,
): value is Type => {
    return isPossibleNumeric(value, false)
}

///strict mode does not allow sny extraneous characters except whitespace .
// /if strict mode is false =cleans non digits  , non whitespace character and then validates the number
export const isPossibleNumeric = <Type extends PossibleNumeric>(
    value: Type,
    strict: boolean = true,
): value is Type => {
    if (isBigInt(value) || isValidNumber(value)) return true
    if (
        isString<string>(value) &&
        /\d/.test(value) &&
        value.toString().length > 0
    ) {
        // hex numbers are always valid
        if (!/^[0x]/.test(value)) {
            if (strict === true && /[a-zA-Z]/.test(removeAllNewlines(value)))
                return false
        } else {
            return true
        }
        let _pre: string = value
        const regex = new RegExp(/([a-z]|[A-Z]|,|\?|$|\$|!|@|#|%|&)/, 'g')

        if (strict === false) {
            const replaced_value = removeAllNewlines(value.toString()).replace(
                regex,
                '',
            )
            if (replaced_value.length > 0) _pre = replaced_value
        } else {
            _pre = removeAllNewlines(value.toString())
        }
        const _number =
            /^[0x]/.test(_pre) &&
            parseFloat(_pre) === 0 &&
            parseInt(_pre) > parseFloat(_pre)
                ? parseInt(_pre)
                : parseFloat(_pre)
        if (LOGGING) {
            console.log(
                'its ',
                _number,
                value,
                isNotNaN(_number),
                isFinite(_number),
            )
        }
        return isNotNaN(_number) && isFinite(_number)
    }
    return false
}

export const isTrueNumeric = <Type extends Numeric>(
    value: unknown,
): value is Type => {
    return (
        isNotNaN(Number(Number.parseFloat(String(value)))) &&
        isFinite(Number(value))
    )
}
