/**
 * Replace a string at an index
 *
 * @memberof StringUtils
 * @function insert
 * @param {string} value - String to insert the characters into
 * @param {string} [insert_value=''] - String to insert. Default is `''`
 * @param {number} [index=0] - Index to insert characters at. Default is `0`
 * @returns {string}
 */
export const insert = (
    value: string,
    insert_value: string = '',
    index: number = 0,
): string => {
    return index > 0
        ? `${value.substring(0, index)}${insert_value}${value.substring(index, value.length)}`
        : value
}
