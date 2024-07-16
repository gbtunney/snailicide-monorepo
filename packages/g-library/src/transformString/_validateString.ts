import { isNotUndefined, isRegExp, isString } from 'ramda-adjunct'

type validateOperation =
    | 'startsWith'
    | 'endsWith'
    | 'includes'
    | 'contains'
    | 'eq'
    | validateFunc
type validateFunc = (value: string, pattern: string) => boolean

export interface IValidateObj {
    value: string
    pattern: string | RegExp
    validate_op?: validateOperation
}

/* * Validate functions.  * */
export const startsWith: validateFunc = (value, pattern) =>
    value.startsWith(pattern)
export const endsWith: validateFunc = (value, pattern) =>
    value.endsWith(pattern)
export const includes: validateFunc = (value, pattern) =>
    value.includes(pattern)
export const eq: validateFunc = (value, pattern) => value === pattern
export const contains: validateFunc = includes
export const match = (value: string, pattern: RegExp): boolean =>
    pattern.test(value)

/**
 * Validate String TODO:update tihs.
 *
 * @example
 *     validateString("kitten", ["kit", "hi"], "startsWith"))
 *     => true
 *
 * @param {any} value - String to test
 * @param {string | RegExp} pattern - Values to compare
 * @param {startsWith | includes | endsWith | eq | contains} - Validate_op
 */
export const validateString = (
    value: string,
    pattern: string | RegExp,
    validate_op: validateOperation = 'eq',
): boolean => {
    if (isRegExp(pattern)) return match(value, pattern as RegExp)
    return (validate_op as validateFunc)(value, pattern as string)
}

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
    const _operation =
        operation === 'some' ? validateArr.some : validateArr.every
    return _operation((obj) =>
        validateString(obj.value, obj.pattern, obj.validate_op),
    )
}
