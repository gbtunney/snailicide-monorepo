import { isStringValidRegExp } from './validators.js'

/**
 * Escape characters with special meaning either inside or outside character sets. Uses a simple backslash escape when
 * it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter
 * grammar.
 */
export const escapeStringRegexp = (value: string): string => {
    return value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')
}

/**
 * Escapes special characters in a string to create a valid regular expression pattern.
 * @param value - The string to escape.
 * @param escape - Optional. Specifies whether to escape the string if it is invalid RegExp. Default is true.
 * @returns If the string is not a valid regexp and escape is set to false, will return undefined
 */
export const escapeStringRegexpInvalid = (
    value: string,
    escape: boolean = true,
): string | undefined => {
    if (isStringValidRegExp(value)) return value
    if (escape && !isStringValidRegExp(value)) {
        if (isStringValidRegExp(escapeStringRegexp(value)))
            return escapeStringRegexp(value)
    }
    return undefined
}
