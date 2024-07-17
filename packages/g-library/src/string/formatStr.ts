// @ts-expect-error no definitions
import { vsprintf } from 'format'
import z from 'zod'

import { ensureArray } from '../zod_helpers/schemas.js'

/**
 * Formats a string by replacing placeholders with provided arguments. This
 * function utilizes the `vsprintf` method from the `format` library to apply
 * sprintf-style formatting to the input string using the provided arguments.
 * The arguments can be a single string or an array of strings, which are
 * validated and converted to an array if necessary using a Zod schema.
 *
 * @memberof StringUtils
 * @function formatString
 * @param {string} value - The string containing placeholders for formatting.
 *   Placeholders follow the sprintf format.
 * @param {string | string[]} args - The argument(s) to replace placeholders in
 *   the `value` string. Can be a single string or an array of strings.
 * @returns {string} The formatted string with placeholders replaced by provided
 *   arguments.
 */
export const formatString = (
    value: string,
    args: string | string[],
): string => {
    const _vars = ensureArray(z.string()).parse(args)
    return vsprintf(value, _vars)
}
