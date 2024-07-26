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

//todo: move these to "empty??"

/* * RAMDA MIMICKING TYPEGUARDS!!!!!! * */
export const isFalsy = <Type>(value: Type | Falsy): value is Falsy =>
    RA.isFalsy(value)
export const isTruthy = <Type>(value: Type | Falsy): value is Type =>
    RA.isTruthy(value)

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

export const isNotNilOrEmpty = <Type>(
    value: Type | NilOrEmpty,
): value is Type => RA.isNotNilOrEmpty(value)

/* * EMPTY STRING!!!!! * */
export const isEmptyString = <Type extends string>(
    value: Type,
): value is Type => RA.isEmptyString(value)

export const isString = <Type extends string>(value: unknown): value is Type =>
    RA.isString(value)
export const isNotString = <Type = unknown>(
    value: Type | string,
): value is Type => RA.isNotString(value)

export const isBigInt = <Type extends bigint>(
    value: unknown,
): value is Type => {
    return RA.isBigInt(value)
}

export const isNumber = <Type extends number>(value: unknown): value is Type =>
    RA.isValidNumber(value)

export const isNotNumber = <
    Type extends number,
    TypeNumber = Type extends number ? never : Type,
>(
    value: unknown,
): value is TypeNumber => !RA.isValidNumber(value)

export const isInteger = <Type extends number>(value: unknown): value is Type =>
    RA.isInteger(value)
export const isNotInteger = <
    Type extends number,
    TypeNumber = Type extends number ? never : Type,
>(
    value: unknown,
): value is TypeNumber => RA.isNotInteger(value)

export const isPrimitive = <Type extends Primitive>(
    value: unknown,
): value is Type => RA.isPrimitive(value)
export const isNotPrimitive = <Type = unknown>(
    value: Type | Primitive,
): value is Type => RA.isNotPrimitive(value)

export const isNilLike = <Type>(value: Type | NilLike): value is NilLike =>
    RA.isEmptyString(value) || isNil(value)
export const isNotNilLike = <Type>(value: Type | NilLike): value is Type =>
    !(RA.isEmptyString(value) || isNil(value))

export const isNullish = <Type>(value: Type | NilLike): value is undefined =>
    RA.isEmptyString(value) || isNil(value)
export const isNotNullish = <Type>(value: Type | NilLike): value is Type =>
    !(RA.isEmptyString(value) || isNil(value))

export const isNotNull = <Type extends NonNullable<any>>(
    value: unknown,
): value is Type => RA.isNotNull(value)

export const isNull = (value: unknown): value is null => RA.isNull(value)

export const isUndefined = <Type>(value: Type | Nullish): value is undefined =>
    isNil(value)
export const isNotUndefined = <Type>(value: unknown): value is Type =>
    RA.isNotNil(value)

export const isEmptyArray = <Type extends EmptyArray>(
    value: unknown,
): value is Type => RA.isEmptyArray(value)

export const isNonEmptyArray = <Type extends UnknownArray = EmptyArray>(
    value: Type,
): value is Type => RA.isNonEmptyArray(value)

export const isArray = <Type extends UnknownArray>(
    value: unknown,
): value is Type => RA.isArray(value)

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

export const isRegExp = <Type extends RegExp>(
    value: unknown,
): value is Type => {
    return RA.isRegExp(value)
}

export const isNotError = <Type>(
    value: Type,
): value is IsLiteral<'ERROR'> extends false ? Type : never => {
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
