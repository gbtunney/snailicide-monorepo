import { isFinite, isNotNaN, isValidNumber } from 'ramda-adjunct'

import { removeAllNewlines, trimWhiteSpace } from '../string/_stringUtils.js'
import { isBigInt, isString } from '../typeguard/utility.typeguards.js'
import { Numeric, PossibleNumeric } from './numeric.js'
import { isStringNumeric } from './validators.js'
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
    if (isString<string>(value) && value.toString().length > 0) {
        let _pre: string = cleanString(value)

        const regex = new RegExp(/([a-z]|[A-Z]|,|\?|$|\$|!|@|#|%|&)/, 'g')

        if (strict === false) {
            const replaced_value = _pre.replace(regex, '')
            if (replaced_value.length > 0) _pre = replaced_value
        }

        return isStringNumeric(_pre)
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
const cleanString = (value: string) => trimWhiteSpace(removeAllNewlines(value))
