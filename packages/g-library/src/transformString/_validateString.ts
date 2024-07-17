import { isNotUndefined, isRegExp, isString } from 'ramda-adjunct'

export type validateOperation =
    | 'startsWith'
    | 'endsWith'
    | 'includes'
    | 'contains'
    | 'eq'
    | validateFunc
export type validateFunc = (value: string, pattern: string) => boolean

/**
 * Interface for validation object.
 *
 * @memberof StringUtils
 */
export interface IValidateObj {
    value: string
    pattern: string | RegExp
    validate_op?: validateOperation
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
export const startsWith: validateFunc = (value, pattern) =>
    value.startsWith(pattern)

/**
 * Checks if the string ends with the given pattern.
 *
 * @memberof StringUtils
 * @function endsWith
 * @param {string} value - The string to validate.
 * @param {string} pattern - The pattern to check for.
 * @returns {boolean} True if the string ends with the pattern, false otherwise.
 */
export const endsWith: validateFunc = (value, pattern) =>
    value.endsWith(pattern)

/**
 * Checks if the string includes the given pattern.
 *
 * @memberof StringUtils
 * @function includes
 * @param {string} value - The string to validate.
 * @param {string} pattern - The pattern to check for.
 * @returns {boolean} True if the string includes the pattern, false otherwise.
 */
export const includes: validateFunc = (value, pattern) =>
    value.includes(pattern)

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
export const eq: validateFunc = (value, pattern) => value === pattern

/**
 * Alias for includes function.
 *
 * @memberof StringUtils
 * @function contains
 */
export const contains: validateFunc = includes

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
 * @param {validateOperation} [validate_op='eq'] - The validation operation to
 *   perform. Default is `'eq'`
 * @returns {boolean} True if the validation passes, false otherwise.
 */
export const validateString = (
    value: string,
    pattern: string | RegExp,
    validate_op: validateOperation = 'eq',
): boolean => {
    if (isRegExp(pattern)) return match(value, pattern as RegExp)
    return (validate_op as validateFunc)(value, pattern as string)
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
    value: string | IValidateObj[],
    validateObjects?: Omit<IValidateObj, 'value'>[],
    operation: 'some' | 'every' = 'some',
): boolean => {
    let validateArr: IValidateObj[] = []
    if (isString(value) && isNotUndefined(validateObjects)) {
        validateArr = (validateObjects as Omit<IValidateObj, 'value'>[]).map(
            (obj) => {
                return { ...obj, value }
            },
        )
    } else validateArr = value as IValidateObj[]
    /*...*/
    /*...*/
    const _operation =
        operation === 'some' ? validateArr.some : validateArr.every
    return _operation((obj) =>
        validateString(obj.value, obj.pattern, obj.validate_op),
    )
}
