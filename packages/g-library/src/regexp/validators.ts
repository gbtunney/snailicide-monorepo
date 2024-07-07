import { isRegExp, isString } from '../typeguard/utility.typeguards.js'

export const isValidRegExp = (value: string | RegExp) =>
    isString(value) ? isStringValidRegExp(value) : isRegExp(value)

export const isStringValidRegExp = <T extends string>(value: T): value is T => {
    try {
        const regExp = new RegExp(value)
        return true
    } catch (exception) {
        return false
    }
    return false
}
