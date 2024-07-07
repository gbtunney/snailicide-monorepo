import { isNil, isEmpty, isNotEmpty } from 'ramda'
import { UnknownArray, IsLiteral } from 'type-fest'

import { RA } from './ramdaimports.js'
import type {
    Falsy,
    NilOrEmpty,
    NilLike,
    Nullish,
    EmptyString,
    EmptyObject,
    EmptyArray,
} from './../types/empty.js'
import type { Primitive, PlainObject } from './../types/utility.js'
import { IsArray } from './../types/utility.js'

//todo: move these to "empty??"

/* * RAMDA MIMICKING TYPEGUARDS!!!!!! * */
export const isFalsy = <T>(value: T | Falsy): value is Falsy =>
    RA.isFalsy(value)
export const isTruthy = <T>(value: T | Falsy): value is T => RA.isTruthy(value)

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
export const isNilOrEmpty = <T>(value: T | NilOrEmpty): value is NilOrEmpty =>
    RA.isNilOrEmpty(value)

export const isNotNilOrEmpty = <T>(value: T | NilOrEmpty): value is T =>
    RA.isNotNilOrEmpty(value)

/* * EMPTY STRING!!!!! * */
export const isEmptyString = <T = unknown>(
    value: T | EmptyString,
): value is EmptyString => RA.isEmptyString(value)

export const isString = <T extends string>(value: unknown): value is T =>
    RA.isString(value)
export const isNotString = <T = unknown>(value: T | string): value is T =>
    RA.isNotString(value)

export const isBigInt = <T extends bigint>(value: unknown): value is T => {
    return RA.isBigInt(value)
}

export const isNumber = <T extends number>(value: unknown): value is T =>
    RA.isValidNumber(value)

export const isNotNumber = <T extends number, N = T extends number ? never : T>(
    value: unknown,
): value is N => !RA.isValidNumber(value)

export const isInteger = <T extends number>(value: unknown): value is T =>
    RA.isInteger(value)
export const isNotInteger = <
    T extends number,
    N = T extends number ? never : T,
>(
    value: unknown,
): value is N => RA.isNotInteger(value)

export const isPrimitive = <T extends Primitive>(value: unknown): value is T =>
    RA.isPrimitive(value)
export const isNotPrimitive = <T = unknown>(value: T | Primitive): value is T =>
    RA.isNotPrimitive(value)

export const isNilLike = <T>(value: T | NilLike): value is NilLike =>
    RA.isEmptyString(value) || isNil(value)
export const isNotNilLike = <T>(value: T | NilLike): value is T =>
    !(RA.isEmptyString(value) || isNil(value))

export const isNullish = <T>(value: T | NilLike): value is undefined =>
    RA.isEmptyString(value) || isNil(value)
export const isNotNullish = <T>(value: T | NilLike): value is T =>
    !(RA.isEmptyString(value) || isNil(value))

export const isNotNull = <T extends NonNullable<any>>(
    value: unknown,
): value is T => RA.isNotNull(value)

export const isNull = (value: unknown): value is null => RA.isNull(value)

export const isUndefined = <T>(value: T | Nullish): value is undefined =>
    isNil(value)
export const isNotUndefined = <T>(value: unknown): value is T =>
    RA.isNotNil(value)

export const isEmptyArray = <T = unknown>(
    value: T[] extends any[] ? T[] : never,
): value is T[] => RA.isEmptyArray(value)

export const isNonEmptyArray = <T = unknown>(
    value: T extends EmptyArray ? never : IsArray<T> extends true ? T : never,
): value is T extends EmptyArray
    ? never
    : IsArray<T> extends true
      ? T
      : never => RA.isNonEmptyArray(value)

export const isArray = <T extends UnknownArray>(value: unknown): value is T =>
    RA.isArray(value)

export const isNonEmptyObject = <
    Type extends PlainObject | Record<string, unknown>,
>(
    value: Type,
): value is Type => isNotEmpty(value) && RA.isNotArray(value)

export const isEmptyObject = <Type extends EmptyObject>(
    value: Type,
): value is Type => isEmpty(value)
//TODO: NOTE WHY IS THIS 'EMPTY'?

export const isPlainObject = <
    Type extends PlainObject | Record<string, unknown>,
>(
    value: Type,
): value is Type => RA.isPlainObject(value)

export const isRegExp = <T extends RegExp>(value: unknown): value is T => {
    return RA.isRegExp(value)
}

export const isNotError = <T>(
    value: T,
): value is IsLiteral<'ERROR'> extends false ? T : never => {
    return value !== 'ERROR'
}
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
