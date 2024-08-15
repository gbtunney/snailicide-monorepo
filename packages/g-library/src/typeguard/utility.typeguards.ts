import { isEmpty, isNil, isNotEmpty } from 'ramda'
import { IsLiteral, UnknownArray } from 'type-fest'

import type {
    EmptyArray,
    EmptyObject,
    Falsy,
    NilLike,
    NilOrEmpty,
    Nullish,
} from './../types/empty.js'
import type { PlainObject, Primitive } from './../types/utility.js'
import { RA } from './ramdaimports.js'
/**
 * Retuns `true` if the value is `null`,`undefined` or an empty string, array,
 * or object
 *
 * @example
 *     isNilOrEmpty([1, 2, 3]); //=> false
 *     isNilOrEmpty([]); //=> true
 *     isNilOrEmpty(''); //=> true
 *     isNilOrEmpty(null); //=> true
 *     isNilOrEmpty(undefined): //=> true
 *     isNilOrEmpty({}); //=> true
 *     isNilOrEmpty({length: 0}); //=> false
 *
 * @function isNilOrEmpty
 * @param {T | NilOrEmpty} value - T | NilOrEmpty
 * @returns {boolean}
 */
export const isNilOrEmpty = <Type>(
    value: Type | NilOrEmpty,
): value is NilOrEmpty => RA.isNilOrEmpty(value)

/**
 * Checks if a value is truthy.
 *
 * @category TypeGuard
 * @param {Type | Falsy} value - The value to check.
 * @returns {boolean} `true` if the value is truthy, otherwise `false`.
 * @see {@link isFalsy}
 */
export const isTruthy = <Type>(value: Type | Falsy): value is Type =>
    RA.isTruthy(value)

/**
 * Checks if a value is not nil or empty.
 *
 * @category TypeGuard
 * @param {Type | NilOrEmpty} value - The value to check.
 * @returns {boolean} `true` if the value is not nil or empty, otherwise
 *   `false`.
 * @see {@link isNilOrEmpty}
 */
export const isNotNilOrEmpty = <Type>(
    value: Type | NilOrEmpty,
): value is Type => RA.isNotNilOrEmpty(value)

/* * EMPTY STRING!!!!! * */
/**
 * Checks if a value is an empty string.
 *
 * @category TypeGuard
 * @param {Type} value - The value to check.
 * @returns {boolean} `true` if the value is an empty string, otherwise `false`.
 * @see {@link isEmptyString}
 */
export const isEmptyString = <Type extends string>(
    value: Type,
): value is Type => RA.isEmptyString(value)

/**
 * Checks if a value is a string.
 *
 * @category TypeGuard
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a string, otherwise `false`.
 * @see {@link isString}
 */
export const isString = <Type extends string>(value: unknown): value is Type =>
    RA.isString(value)

/**
 * Checks if a value is not a string.
 *
 * @category TypeGuard
 * @param {Type | string} value - The value to check.
 * @returns {boolean} `true` if the value is not a string, otherwise `false`.
 * @see {@link isNotString}
 */
export const isNotString = <Type = unknown>(
    value: Type | string,
): value is Type => RA.isNotString(value)

/**
 * Checks if a value is a bigint.
 *
 * @category TypeGuard
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a bigint, otherwise `false`.
 * @see {@link isBigInt}
 */
export const isBigInt = <Type extends bigint>(
    value: unknown,
): value is Type => {
    return RA.isBigInt(value)
}

/**
 * Checks if a value is a number.
 *
 * @category TypeGuard
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a number, otherwise `false`.
 * @see {@link isNotNumber}
 */
export const isNumber = <Type extends number>(value: unknown): value is Type =>
    RA.isValidNumber(value)

/**
 * Checks if a value is not a number.
 *
 * @category TypeGuard
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is not a number, otherwise `false`.
 * @see {@link isNumber}
 */
export const isNotNumber = <
    Type extends number,
    TypeNumber = Type extends number ? never : Type,
>(
    value: unknown,
): value is TypeNumber => !RA.isValidNumber(value)

/**
 * Checks if a value is an integer.
 *
 * @category TypeGuard
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is an integer, otherwise `false`.
 * @see {@link isInteger}
 */
export const isInteger = <Type extends number>(value: unknown): value is Type =>
    RA.isInteger(value)

/**
 * Checks if a value is not an integer.
 *
 * @category TypeGuard
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is not an integer, otherwise `false`.
 * @see {@link isNotInteger}
 */
export const isNotInteger = <
    Type extends number,
    TypeNumber = Type extends number ? never : Type,
>(
    value: unknown,
): value is TypeNumber => RA.isNotInteger(value)

/**
 * Checks if a value is a primitive.
 *
 * @category TypeGuard
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a primitive, otherwise `false`.
 * @see {@link isPrimitive}
 */
export const isPrimitive = <Type extends Primitive>(
    value: unknown,
): value is Type => RA.isPrimitive(value)

/**
 * Checks if a value is not a primitive.
 *
 * @category TypeGuard
 * @param {Type | Primitive} value - The value to check.
 * @returns {boolean} `true` if the value is not a primitive, otherwise `false`.
 * @see {@link isNotPrimitive}
 */
export const isNotPrimitive = <Type = unknown>(
    value: Type | Primitive,
): value is Type => RA.isNotPrimitive(value)

/**
 * Checks if a value is nil-like.
 *
 * @category TypeGuard
 * @param {Type | NilLike} value - The value to check.
 * @returns {boolean} `true` if the value is nil-like, otherwise `false`.
 * @see {@link isNilLike}
 */
export const isNilLike = <Type>(value: Type | NilLike): value is NilLike =>
    RA.isEmptyString(value) || isNil(value)

/**
 * Checks if a value is not nil-like.
 *
 * @category TypeGuard
 * @param {Type | NilLike} value - The value to check.
 * @returns {boolean} `true` if the value is not nil-like, otherwise `false`.
 * @see {@link isNotNilLike}
 */
export const isNotNilLike = <Type>(value: Type | NilLike): value is Type =>
    !(RA.isEmptyString(value) || isNil(value))

/**
 * Checks if a value is nullish.
 *
 * @category TypeGuard
 * @param {Type | NilLike} value - The value to check.
 * @returns {boolean} `true` if the value is nullish, otherwise `false`.
 * @see {@link isNullish}
 */
export const isNullish = <Type>(value: Type | NilLike): value is undefined =>
    RA.isEmptyString(value) || isNil(value)

/**
 * Checks if a value is not nullish.
 *
 * @category TypeGuard
 * @param {Type | NilLike} value - The value to check.
 * @returns {boolean} `true` if the value is not nullish, otherwise `false`.
 * @see {@link isNotNullish}
 */
export const isNotNullish = <Type>(value: Type | NilLike): value is Type =>
    !(RA.isEmptyString(value) || isNil(value))

/**
 * Checks if a value is not null.
 *
 * @category TypeGuard
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is not null, otherwise `false`.
 * @see {@link isNotNull}
 */
export const isNotNull = <Type extends NonNullable<any>>(
    value: unknown,
): value is Type => RA.isNotNull(value)

/**
 * Checks if a value is null.
 *
 * @category TypeGuard
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is null, otherwise `false`.
 * @see {@link isNull}
 */
export const isNull = (value: unknown): value is null => RA.isNull(value)

/**
 * Checks if a value is undefined.
 *
 * @category TypeGuard
 * @param {Type | Nullish} value - The value to check.
 * @returns {boolean} `true` if the value is undefined, otherwise `false`.
 * @see {@link isUndefined}
 */
export const isUndefined = <Type>(value: Type | Nullish): value is undefined =>
    isNil(value)

/**
 * Checks if a value is not undefined.
 *
 * @category TypeGuard
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is not undefined, otherwise `false`.
 * @see {@link isNotUndefined}
 */
export const isNotUndefined = <Type>(value: unknown): value is Type =>
    RA.isNotNil(value)

/**
 * Checks if a value is an empty array.
 *
 * @category TypeGuard
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is an empty array, otherwise `false`.
 * @see {@link isEmptyArray}
 */
export const isEmptyArray = <Type extends EmptyArray>(
    value: unknown,
): value is Type => RA.isEmptyArray(value)

/**
 * Checks if a value is a non-empty array.
 *
 * @category TypeGuard
 * @param {Type} value - The value to check.
 * @returns {boolean} `true` if the value is a non-empty array, otherwise
 *   `false`.
 * @see {@link isNonEmptyArray}
 */
export const isNonEmptyArray = <Type extends UnknownArray = EmptyArray>(
    value: Type,
): value is Type => RA.isNonEmptyArray(value)

/**
 * Checks if a value is an array.
 *
 * @category TypeGuard
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is an array, otherwise `false`.
 * @see {@link isArray}
 */
export const isArray = <Type extends UnknownArray>(
    value: unknown,
): value is Type => RA.isArray(value)

/**
 * Checks if a value is a non-empty object.
 *
 * @category TypeGuard
 * @param {Type} value - The value to check.
 * @returns {boolean} `true` if the value is a non-empty object, otherwise
 *   `false`.
 * @see {@link isNonEmptyObject}
 */
export const isNonEmptyObject = <
    Type extends PlainObject | Record<string, unknown>,
>(
    value: Type,
): value is Type => isNotEmpty(value) && RA.isNotArray(value)

/**
 * Checks if a value is an empty object.
 *
 * @category TypeGuard
 * @param {Type} value - The value to check.
 * @returns {boolean} `true` if the value is an empty object, otherwise `false`.
 * @see {@link isEmptyObject}
 */
export const isEmptyObject = <Type extends EmptyObject>(
    value: Type,
): value is Type => isEmpty(value)

/**
 * Checks if a value is a plain object.
 *
 * @category TypeGuard
 * @param {Type} value - The value to check.
 * @returns {boolean} `true` if the value is a plain object, otherwise `false`.
 * @see {@link isPlainObject}
 */
export const isPlainObject = <
    Type extends PlainObject | Record<string, unknown>,
>(
    value: Type,
): value is Type => RA.isPlainObject(value)

/**
 * Checks if a value is a regular expression.
 *
 * @category TypeGuard
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a regular expression, otherwise
 *   `false`.
 * @see {@link isRegExp}
 */
export const isRegExp = <Type extends RegExp>(
    value: unknown,
): value is Type => {
    return RA.isRegExp(value)
}

/**
 * Checks if a value is not an error.
 *
 * @category TypeGuard
 * @param {Type} value - The value to check.
 * @returns {boolean} `true` if the value is not an error, otherwise `false`.
 * @see {@link isNotError}
 */
export const isNotError = <Type>(
    value: Type,
): value is IsLiteral<'ERROR'> extends false ? Type : never => {
    return value !== 'ERROR'
}

/**
 * Checks if a value is an error.
 *
 * @category TypeGuard
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is an error, otherwise `false`.
 * @see {@link isError}
 */
export const isError = (
    value: unknown,
): value is IsLiteral<'ERROR'> extends true ? 'ERROR' : never => {
    return value === 'ERROR'
}

//Test case  --
/*const test_value  = 22 //'   ' //PlainObject = { hhihih:'hjhj'}
if ( tg_isNotUndefined( test_value) ){
    const vallll : LiteralToPrimitive<typeof test_value>   = test_value
}*/
/*
RA.isNotNull(1); //=> true
RA.isNotNull(undefined); //=> true
RA.isNotNull(null); //=> false

RA.isNotEmpty([1, 2, 3]); //=> true
RA.isNotEmpty([]); //=> false
RA.isNotEmpty(''); //=> false
RA.isNotEmpty(null); //=> true
RA.isNotEmpty(undefined) //=> true
RA.isNotEmpty({}); //=> false
RA.isNotEmpty({length: 0}); //=> true

RA.isEmptyString(''); // => true
RA.isEmptyString('42'); // => false
RA.isEmptyString(new String('42')); // => false
*/
