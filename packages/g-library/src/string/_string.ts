/**
 * Checks if a string contains a number.
 *
 * @memberof StringUtils
 * @function stringContainsNumber
 * @param {string} value - The string to check.
 * @returns {boolean} - True if the string contains a number, false otherwise.
 */
export const stringContainsNumber = <Type extends string>(
    value: Type,
): value is Type => /\d/.test(value)

/**
 * If the length of the string is 1 and the string does not match a letter,
 * return true.
 *
 * @memberof StringUtils
 * @function stringContainsLetter
 * @param {string} value - The string to check.
 * @returns {boolean} - True if the string length is 1 and does not match a
 *   letter, false otherwise.
 */
export const stringContainsLetter = <Type extends string>(
    value: Type,
): value is Type => value.length === 1 && value.match(/[a-z]/i) === null

export type URL<T extends string> = T

/**
 * Checks if a string is a valid URL.
 *
 * @memberof StringUtils
 * @function isValidUrl
 * @param {string} value - The string to check.
 * @returns {boolean} - True if the string is a valid URL, false otherwise.
 */
export const isValidUrl = <Type extends string>(
    value: Type,
): value is URL<Type> =>
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        value,
    )

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
) => {
    return index > 0
        ? `${value.substring(0, index)}${insert_value}${value.substring(index, value.length)}`
        : value
}
