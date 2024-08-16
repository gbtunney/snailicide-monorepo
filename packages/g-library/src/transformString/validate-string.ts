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

/** Interface for validation object. */
export type IValidateObj = {
    value: string
    pattern: string | RegExp
    validate_op?: ValidateOperation
}

/**
 * Checks if the string starts with the given pattern
 *
 * @see {@link endsWith}
 */
export const startsWith: ValidateFunc = (
    value: string,
    pattern: string,
): boolean =>
    getRegExpStartOfString(pattern, ['global', 'multiline']).test(value)

/**
 * Checks if the string ends with the given pattern.
 *
 * @see {@link startsWith}
 */
export const endsWith: ValidateFunc = (
    value: string,
    pattern: string,
): boolean => getRegExpEndOfString(pattern, ['global', 'multiline']).test(value)

/** Checks if the string includes the given pattern. */
export const includes: ValidateFunc = (value, pattern) =>
    new RegExp(pattern, 'gm').test(value)

/** Checks if the string is equal to the given pattern. */
export const eq: ValidateFunc = (value, pattern) => value === pattern

/** Alias for includes function. */
export const contains: ValidateFunc = includes

/** Checks if the string matches the given RegExp pattern. */
export const match = (value: string, pattern: RegExp): boolean =>
    pattern.test(value)

/**
 * Validates a string based on the provided pattern and validation operation.
 *
 * @see {@link validateStringBatch}
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
 * @see {@link validateString}
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
