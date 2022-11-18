import { isNil } from 'ramda'
import * as RA from 'ramda-adjunct'
import type {
    Falsy,
    NilOrEmpty,
    NilLike,
    Nullish,
    EmptyString,
    EmptyObject,
    EmptyArray,
} from './../types/empty.js'
import type { Primitive } from './../types/utility.js'

//todo: move these to "empty??"

/* * RAMDA MIMICKING TYPEGUARDS!!!!!! * */
export const isFalsy = <T>(value: T | Falsy): value is Falsy =>
    RA.isFalsy(value)
export const isTruthy = <T>(value: T | Falsy): value is T => RA.isTruthy(value)

export const isNilOrEmpty = <T>(value: T | NilOrEmpty): value is NilOrEmpty =>
    RA.isNilOrEmpty(value)
export const isNotNilOrEmpty = <T>(value: T | NilOrEmpty): value is T =>
    RA.isNotNilOrEmpty(value)

/* * EMPTY STRING!!!!! * */
export const isEmptyString = <T = unknown>(
    value: T | EmptyString
): value is EmptyString => RA.isEmptyString(value)

export const isString = <T = unknown>(value: T | string): value is string =>
    RA.isString(value)
export const isNotString = <T = unknown>(value: T | string): value is T =>
    RA.isNotString(value)

export const isInteger = <T extends Primitive>(
    value: T | number
): value is number => RA.isInteger(value)
export const isNotInteger = <T extends Primitive>(
    value: T | number
): value is T => RA.isNotInteger(value)

export const isPrimitive = <T = unknown>(
    value: T | Primitive
): value is Primitive => RA.isPrimitive(value)
export const isNotPrimitive = <T = unknown>(value: T | Primitive): value is T =>
    RA.isNotPrimitive(value)

export const isNilLike = <T>(value: T | NilLike): value is NilLike =>
    RA.isEmptyString(value) || isNil(value)
export const isNotNilLike = <T>(value: T | NilLike): value is T =>
    !(RA.isEmptyString(value) || isNil(value))

//'' | null | undefined
export const isNullish = <T>(value: T | NilLike): value is undefined =>
    RA.isEmptyString(value) || isNil(value)
export const isNotNullish = <T>(value: T | NilLike): value is T =>
    !(RA.isEmptyString(value) || isNil(value))

// is null | undefined   ????????????????
/**
 * Typeguard Undefined : narrows Nullish ( null | undefined )
 *
 * @example
 *     const test_value = 22
 *     if (isNotUndefined(test_value)) {
 *         const vallll: LiteralToPrimitive<typeof test_value> = test_value
 *     }
 *
 * @param value - Description
 * @returns -
 */
export const isUndefined = <T>(value: T | Nullish): value is undefined =>
    isNil(value)
export const isNotUndefined = <T = unknown>(
    value: (T extends NonNullable<T> ? T : never) | Nullish
): value is T extends NonNullable<T> ? T : never => RA.isNotNil(value)

export const isEmptyArray = <T = unknown>(
    value: T[] extends EmptyArray ? EmptyArray : never
): value is T[] extends EmptyArray ? EmptyArray : never =>
    RA.isEmptyArray(value)
export const isNonEmptyArray = <T = unknown>(
    value: T[] extends EmptyArray ? never : T[]
): value is T[] extends EmptyArray ? never : T[] => RA.isNonEmptyArray(value)

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
