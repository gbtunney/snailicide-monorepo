import { isStringValidRegExp } from './validators.js'

export const escapeStringRegexp = (value: string): string => {
    // Escape characters with special meaning either inside or outside character sets.
    // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
    return value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d')
}

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
