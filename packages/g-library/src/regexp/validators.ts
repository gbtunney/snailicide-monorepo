import { isRegExp, isString } from '../typeguard/utility.typeguards.js'

/**
 * Checks if a value is a valid regular expression.
 * @param value - The value to be checked. It can be a string or a RegExp object.
 * @returns A boolean indicating whether the value is a valid regular expression.
 */
export const isValidRegExp = (value: string | RegExp): boolean =>
    isString(value) ? isStringValidRegExp(value) : isRegExp(value)

/** Check to see if string needs to be escaped or otherwise it will throw error */
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

/** Matches a string to a regular expression pattern. */
export const matchStringToRegExp = (value: string, pattern: RegExp): boolean =>
    pattern.test(value)
