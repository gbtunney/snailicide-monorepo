import { isRegExp, isString } from '../typeguard/utility.typeguards.js'

export const isValidRegExp = (value: string | RegExp): boolean =>
    isString(value) ? isStringValidRegExp(value) : isRegExp(value)

export const isStringValidRegExp = <Type extends string>(
    value: Type,
): value is Type => {
    try {
        const regExp = new RegExp(value)
        return true
    } catch (exception) {
        return false
    }
    return false
}
