import { pipe, replace, toLower, toUpper, trim } from 'ramda'
import { replaceAll } from 'ramda-adjunct'
import { removeNonWord, replaceAccents } from './string-utils.js'

/**
 * Converts a string to lowercase.
 * @category Case
 */
export const lowerCase = (value: string): string => toLower(value)

/**
 * Converts a string to uppercase.
 * @category Case
 */
export const upperCase = (value: string): string => toUpper(value)

/**
 * Capitalizes the first letter of each word in a string.
 * @category Case
 */
export const capitalizeWords = (value: string): string =>
    value.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))

/**
 * Converts a string to camelCase.
 * @category Case
 */
export const camelCase = (value: string): string => {
    value = replaceAll(/[-_]/g, ' ', pipe(replaceAccents, removeNonWord)(value))
    if (/[a-z]/.test(value) && /^|\s[A-Z]+\s|$/.test(value)) {
        // we convert any word that isn't all caps into lowercase
        // value = value.replace(/\s(\w+)/g, function(word, m) {
        //   return /^[A-Z]+$/.test(m) ? word : lowerCase(word);
        //  });
    } else if (/\s/.test(value)) {
        // if it doesn't contain an acronym and it has spaces we should
        // convert every word to lowercase
        value = toLower(value)
    }
    return pipe(
        replace(/\s[a-z]/g, toUpper),
        replace(/^\s*[A-Z]+/g, toLower),
        replace(/\s+/g, ''),
    )(value)
}

/**
 * Adds space between camelCase text.
 * @category Case
 */
export const unCamelCase = (value: string): string =>
    pipe(
        replace(/([a-z])([A-Z])/g, '$1 $2'),
        replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3'),
        replace(/^./, toUpper),
    )(value)

/**
 * Converts a string to proper case (UPPERCASE first char of each word).
 * @category Case
 */
export const properCase = (value: string): string =>
    pipe(toLower, replace(/^\w|\s\w/g, toUpper))(value)

/**
 * Converts a string to PascalCase.
 * @category Case
 */
export const pascalCase = (value: string): string =>
    replace(/^[a-z]/, toUpper, camelCase(value))

/**
 * Converts a string to sentence case.
 * @category Case
 */
export const sentenceCase = (value: string): string =>
    value
        .split('.')
        .map(function (word, index) {
            return index === 0
                ? word.charAt(0).toUpperCase().concat(word.substring(1))
                : word
        })
        .join(' ')

/**
 * Converts a string to slug format with a specified delimiter.
 * @category Case
 */
export const slugify = (value: string, delimiter = '-'): string => {
    const transformFunc = pipe(replaceAccents, removeNonWord, trim, toLower)
    return replaceAll(' ', delimiter, transformFunc(value))
}

/**
 * Converts camelCase text to hyphenated text. ( kabobcase!)
 * @category Case
 */
export const hyphenate = (value: string): string =>
    pipe(unCamelCase, slugify)(value)

/**
 * Converts hyphenated text to spaces.
 * @category Case
 */
export const unhyphenate = (value: string): string =>
    replace(/(\w)(-)(\w)/g, '$1 $3', value)

/**
 * Converts camelCase text to underscored text.
 * @category Case
 */
export const underscore = (value: string): string =>
    slugify(unCamelCase(value), '_')
