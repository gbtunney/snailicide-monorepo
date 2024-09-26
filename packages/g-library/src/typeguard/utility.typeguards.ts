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
 * Checks if a value is truthy.
 * @group Empty Types
 * @see {@link isFalsy}
 */
export const isTruthy = <Type>(value: Type | Falsy): value is Type =>
    RA.isTruthy(value)
/**
 * Checks if a value is falsy.
 * @group Empty Types
 * @see {@link isTruthy}
 */
export const isFalsy = <Type>(value: Type | Falsy): value is Falsy =>
    RA.isFalsy(value)

/**
 * Retuns `true` if the value is `null`,`undefined` or an empty string, array, or object
 * @example
 *     isNilOrEmpty([1, 2, 3]); //=> false
 *     isNilOrEmpty([]); //=> true
 *     isNilOrEmpty(''); //=> true
 *     isNilOrEmpty(null); //=> true
 *     isNilOrEmpty(undefined): //=> true
 *     isNilOrEmpty({}); //=> true
 *     isNilOrEmpty({length: 0}); //=> false
 *
 * @group Empty Types
 * @see {@link isNotNilOrEmpty}
 */
export const isNilOrEmpty = <Type>(
    value: Type | NilOrEmpty,
): value is NilOrEmpty => RA.isNilOrEmpty(value)

/**
 * Checks if a value is not nil or empty.
 * @group Empty Types
 * @see {@link isNilOrEmpty}
 */
export const isNotNilOrEmpty = <Type>(
    value: Type | NilOrEmpty,
): value is Type => RA.isNotNilOrEmpty(value)

/**
 * Checks if a value is an empty string.
 * @category Primitive
 * @group Empty Types
 */
export const isEmptyString = <Type extends string>(
    value: Type,
): value is Type => RA.isEmptyString(value)

/**
 * Checks if a value is a string.
 * @group Primitive
 * @see {@link isNotString}
 */
export const isString = <Type extends string>(value: unknown): value is Type =>
    RA.isString(value)

/**
 * Checks if a value is NOT a string.
 * @group Primitive
 * @see {@link isString}
 */
export const isNotString = <Type = unknown>(
    value: Type | string,
): value is Type => RA.isNotString(value)

/**
 * Checks if a value is a bigint.
 * @group Primitive
 */
export const isBigInt = <Type extends bigint>(
    value: unknown,
): value is Type => {
    return RA.isBigInt(value)
}

/**
 * Checks if a value is a number.
 * @group Primitive
 * @see {@link isNotNumber}
 */
export const isNumber = <Type extends number>(value: unknown): value is Type =>
    RA.isValidNumber(value)

/**
 * Checks if a value is NOT a number.
 * @group Primitive
 * @group Numeric
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
 * @category Primitive
 * @see {@link isNotInteger}
 */
export const isInteger = <Type extends number>(value: unknown): value is Type =>
    RA.isInteger(value)

/**
 * Checks if a value is NOT an integer.
 * @category Primitive
 * @see {@link isInteger}
 */
export const isNotInteger = <
    Type extends number,
    TypeNumber = Type extends number ? never : Type,
>(
    value: unknown,
): value is TypeNumber => RA.isNotInteger(value)

/**
 * Checks if a value is a primitive.
 * @category Primitive
 * @see {@link isNotPrimitive}
 */
export const isPrimitive = <Type extends Primitive>(
    value: unknown,
): value is Type => RA.isPrimitive(value)

/**
 * Checks if a value is NOT a primitive.
 * @category Primitive
 * @see {@link isPrimitive}
 */
export const isNotPrimitive = <Type = unknown>(
    value: Type | Primitive,
): value is Type => RA.isNotPrimitive(value)

/**
 * Checks if a value is nil-like.
 * @category Empty Types
 * @see {@link isNotNilLike}
 */
export const isNilLike = <Type>(value: Type | NilLike): value is NilLike =>
    RA.isEmptyString(value) || isNil(value)

/**
 * Checks if a value is NOT nil-like.
 * @category Empty Types
 * @see {@link isNilLike}
 */
export const isNotNilLike = <Type>(value: Type | NilLike): value is Type =>
    !(RA.isEmptyString(value) || isNil(value))

/**
 * Checks if a value is nullish.
 * @category Empty Types
 * @see {@link isNotNullish}
 */
export const isNullish = <Type>(value: Type | NilLike): value is undefined =>
    RA.isEmptyString(value) || isNil(value)

/**
 * Checks if a value is NOT nullish.
 * @category Empty Types
 * @see {@link isNullish}
 */
export const isNotNullish = <Type>(value: Type | NilLike): value is Type =>
    !(RA.isEmptyString(value) || isNil(value))

/**
 * Checks if a value is null.
 * @category Empty Types
 * @see {@link isNotNull}
 */
export const isNull = (value: unknown): value is null => RA.isNull(value)

/**
 * Checks if a value is NOT null.
 * @category Empty Types
 * @see {@link isNull}
 */
export const isNotNull = <Type extends NonNullable<any>>(
    value: unknown,
): value is Type => RA.isNotNull(value)

/**
 * Checks if a value is undefined.
 * @category Empty Types
 * @see {@link isNotUndefined}
 */
export const isUndefined = <Type>(value: Type | Nullish): value is undefined =>
    isNil(value)

/**
 * Checks if a value is not undefined.
 * @category Empty Types
 * @see {@link isUndefined}
 */
export const isNotUndefined = <Type>(value: unknown): value is Type =>
    RA.isNotNil(value)

/**
 * Checks if a value is an empty array.
 * @category Array
 * @category Empty Types
 * @see {@link isNonEmptyArray}
 */
export const isEmptyArray = <Type extends EmptyArray>(
    value: unknown,
): value is Type => RA.isEmptyArray(value)

/**
 * Checks if a value is a non-empty array.
 * @category Array
 * @see {@link isEmptyArray}
 */
export const isNonEmptyArray = <Type extends UnknownArray = EmptyArray>(
    value: Type,
): value is Type => RA.isNonEmptyArray(value)

/**
 * Checks if a value is an array.
 * @category Array
 */
export const isArray = <Type extends UnknownArray>(
    value: unknown,
): value is Type => RA.isArray(value)

/**
 * Checks if a value is a non-empty object.
 * @category Object
 * @see {@link isEmptyObject}
 */
export const isNonEmptyObject = <
    Type extends PlainObject | Record<string, unknown>,
>(
    value: Type,
): value is Type => isNotEmpty(value) && RA.isNotArray(value)

/**
 * Checks if a value is an empty object.
 * @category Empty Types
 * @category Object
 * @see {@link isNonEmptyObject}
 */
export const isEmptyObject = <Type extends EmptyObject>(
    value: Type,
): value is Type => isEmpty(value)

/**
 * Checks if a value is a plain object.
 * @category Object
 */
export const isPlainObject = <
    Type extends PlainObject | Record<string, unknown>,
>(
    value: Type,
): value is Type => RA.isPlainObject(value)

/**
 * Checks if a value is a regular expression.
 * @category RegExp
 */
export const isRegExp = <Type extends RegExp>(
    value: unknown,
): value is Type => {
    return RA.isRegExp(value)
}

/**
 * Checks if a value is not an error.
 * @category Error
 * @see {@link isError}
 */
export const isNotError = <Type>(
    value: Type,
): value is IsLiteral<'ERROR'> extends false ? Type : never => {
    return value !== 'ERROR'
}

/**
 * Checks if a value is an error.
 * @category Error
 * @see {@link isNotError}
 */
export const isError = (
    value: unknown,
): value is IsLiteral<'ERROR'> extends true ? 'ERROR' : never => {
    return value === 'ERROR'
}
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
