//TODO: MOVE
export const stringContainsNumber = (value: string): boolean => /\d/.test(value)

/**
 * If the length of the string is 1 and the string does not match a letter,
 * return true.
 *
 * @param {string} value - String - The value that will be checked.
 */
export const stringContainsLetter = (value: string): boolean =>
    value.length === 1 && value.match(/[a-z]/i) === null
