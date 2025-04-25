import { trim } from 'ramda'

/**
 * Insert a string at an index
 *
 * @category Replace Characters
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

/**
 * Truncates a string to a specified length, appending '...' if truncated.
 *
 * @category Remove Characters
 */
export const truncate = (
    value: string,
    maxChars: number = 200,
    append: string = '...',
    onlyFullWords: boolean = true,
): string => {
    maxChars = onlyFullWords ? maxChars + 1 : maxChars
    value = trim(value)
    if (value.length <= maxChars) return value
    value = value.substring(0, maxChars - append.length)
    //crop at last space or remove trailing whitespace
    value = onlyFullWords
        ? value.substring(0, value.lastIndexOf(' '))
        : trim(value)
    return `${value}${append}`
}
