import escapeStringRegexp from 'escape-string-regexp'
import { pipe, replace } from 'ramda'

/**
 * Escapes special characters in string for regexp.
 *
 * @category Escape
 */
export const escapeRegExp = (value: string): string => escapeStringRegexp(value)

/**
 * Escapes a string for insertion into HTML.
 *
 * @category Escape
 */
export const escapeHtml = (value: string): string =>
    pipe(
        replace(/&/g, '&amp;'),
        replace(/</g, '&lt;'),
        replace(/>/g, '&gt;'),
        replace(/'/g, '&#39;'),
        replace(/"/g, '&quot;'),
    )(value)

/**
 * Unescapes HTML special chars.
 *
 * @category Escape
 */
export const unescapeHtml = (value: string): string =>
    pipe(
        replace(/&amp;/g, '&'),
        replace(/&lt;/g, '<'),
        replace(/&gt;/g, '>'),
        replace(/&#39;/g, "'"),
        replace(/&quot;/g, '"'),
    )(value)

/**
 * Escapes a string into unicode sequences.
 *
 * @category Escape
 */
export function escapeUnicode(
    value: string,
    shouldEscapePrintable = false,
): string {
    return value.replace(/[\s\S]/g, function (ch) {
        // skip printable ASCII chars if we should not escape them
        if (!shouldEscapePrintable && /[\x20-\x7E]/.test(ch)) {
            return ch
        }
        // we use "000" and slice(-4) for brevity, need to pad zeros,
        // unicode escape always have 4 chars after "\u"
        return '\\u' + ('000' + ch.charCodeAt(0).toString(16)).slice(-4)
    })
}
