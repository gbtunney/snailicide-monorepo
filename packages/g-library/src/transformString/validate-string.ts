import { isNotUndefined, isRegExp, isString } from 'ramda-adjunct'
import {
    getRegExpEndOfString,
    getRegExpStartOfString,
} from '../regexp/string-to-regexp.js'

export type ValidateOperation =
    | 'startsWith'
    | 'endsWith'
    | 'includes'
    | 'contains'
    | 'eq'
    | ValidateFunc
export type ValidateFunc = (value: string, pattern: string) => boolean

/**
 * Interface for validation object.
 *
 * @memberof StringUtils
 */
export type IValidateObj = {
    value: string
    pattern: string | RegExp
    validate_op?: ValidateOperation
}

/* * Validate functions.  * */
/**
 * Checks if the string starts with the given pattern.
 *
 * @memberof StringUtils
 * @function startsWith
 * @param {string} value - The string to validate.
 * @param {string} pattern - The pattern to check for.
 * @returns {boolean} True if the string starts with the pattern, false
 *   otherwise.
 */
export const startsWith: ValidateFunc = (
    value: string,
    pattern: string,
): boolean =>
    getRegExpStartOfString(pattern, ['global', 'multiline']).test(value)

/**
 * Checks if the string ends with the given pattern.
 *
 * @memberof StringUtils
 * @function endsWith
 * @param {string} value - The string to validate.
 * @param {string} pattern - The pattern to check for.
 * @returns {boolean} True if the string ends with the pattern, false otherwise.
 */
export const endsWith: ValidateFunc = (
    value: string,
    pattern: string,
): boolean => getRegExpEndOfString(pattern, ['global', 'multiline']).test(value)

/**
 * Checks if the string includes the given pattern.
 *
 * @memberof StringUtils
 * @function includes
 * @param {string} value - The string to validate.
 * @param {string} pattern - The pattern to check for.
 * @returns {boolean} True if the string includes the pattern, false otherwise.
 */
export const includes: ValidateFunc = (value, pattern) =>
    new RegExp(pattern, 'gm').test(value)

/**
 * Checks if the string is equal to the given pattern.
 *
 * @memberof StringUtils
 * @function eq
 * @param {string} value - The string to validate.
 * @param {string} pattern - The pattern to compare with.
 * @returns {boolean} True if the string is equal to the pattern, false
 *   otherwise.
 */
export const eq: ValidateFunc = (value, pattern) => value === pattern

/**
 * Alias for includes function.
 *
 * @memberof StringUtils
 * @function contains
 */
export const contains: ValidateFunc = includes

/**
 * Checks if the string matches the given RegExp pattern.
 *
 * @memberof StringUtils
 * @function match
 * @param {string} value - The string to validate.
 * @param {RegExp} pattern - The RegExp pattern to match against.
 * @returns {boolean} True if the string matches the pattern, false otherwise.
 */
export const match = (value: string, pattern: RegExp): boolean =>
    /*...*/
    /*...*/
    pattern.test(value)

/**
 * Validates a string based on the provided pattern and validation operation.
 *
 * @memberof StringUtils
 * @example
 *     validateString('kitten', 'kit', 'startsWith') // => true
 *
 * @function validateString
 * @param {string} value - The string to validate.
 * @param {string | RegExp} pattern - The pattern to validate against.
 * @param {ValidateOperation} [validate_op='eq'] - The validation operation to
 *   perform. Default is `'eq'`
 * @returns {boolean} True if the validation passes, false otherwise.
 */
export const validateString = (
    value: string,
    pattern: string | RegExp,
    validate_op: ValidateOperation = 'eq',
): boolean => {
    if (isRegExp(pattern)) return match(value, pattern as RegExp)
    return (validate_op as ValidateFunc)(value, pattern as string)
}

/**
 * Validates a batch of strings or validation objects based on the provided
 * operation.
 *
 * @memberof StringUtils
 * @template {Omit<IValidateObj, 'value'>[]} T
 * @function validateStringBatch
 * @param {string | IValidateObj[]} value - The string to validate or an array
 *   of validation objects.
 * @param {T} [validateObjects] - Optional array of validation objects, used
 *   when the first argument is a string.
 * @param {'some' | 'every'} [operation='some'] - Determines if the validation
 *   should pass if 'some' or 'every' validation is true. Default is `'some'`
 * @returns {boolean} True if the validation passes based on the operation,
 *   false otherwise.
 */
export const validateStringBatch = (
    value: string | Array<IValidateObj>,
    validateObjects?: Array<Omit<IValidateObj, 'value'>>,
    operation: 'some' | 'every' = 'some',
): boolean => {
    let validateArr: Array<IValidateObj> = []
    if (isString(value) && isNotUndefined(validateObjects)) {
        validateArr = (
            validateObjects as Array<Omit<IValidateObj, 'value'>>
        ).map((obj) => {
            return { ...obj, value }
        })
    } else validateArr = value as Array<IValidateObj>

    const _operation =
        /* eslint  @typescript-eslint/unbound-method: "warn" */
        operation === 'some' ? validateArr.some : validateArr.every
    return _operation((obj) =>
        validateString(obj.value, obj.pattern, obj.validate_op),
    )
}
