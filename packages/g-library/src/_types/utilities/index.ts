import * as R from 'ramda'
import * as RA from 'ramda-adjunct'
import type { Primitive as tsPrimitive } from 'type-fest'

/* * UTILITY TYPES  * */

export type EmptyObject = {
    [K in string]: never
}
export type EmptyArray = {
    [K in number]: never
}
export type PlainObject = {
    [x: string]: unknown
    [y: number]: never
}
export type EmptyString = ''
export type Primitive = tsPrimitive
export type Falsy = false | 0 | '' | null | undefined | 'Nan'
export type NilOrEmpty = EmptyObject | [] | '' | null | undefined
export type NilLike = '' | null | undefined //nullish but with empty string
export type Nullish = null | undefined

/* * DeepPartial UTILITY TYPE * */
export type DeepPartial<T> = T extends object
    ? {
          [P in keyof T]?: DeepPartial<T[P]>
      }
    : T

export type PrefixProperties<Type extends object, Prefix extends string> = {
    [Key in keyof Type as `${Prefix}${Key extends string
        ? Key
        : never}`]: Type[Key]
}
export type SuffixProperties<Type extends object, Suffix extends string> = {
    [Key in keyof Type as `${Key extends string
        ? Key
        : never}${Suffix}`]: Type[Key]
}

/* * RAMDA MIMICKING TYPEGUARDS!!!!!! * */
export const tg_isFalsy = <T>(value: T | Falsy): value is Falsy =>
    RA.isFalsy(value)
export const tg_isTruthy = <T>(value: T | Falsy): value is T =>
    RA.isTruthy(value)

export const tg_isNilOrEmpty = <T>(
    value: T | NilOrEmpty
): value is NilOrEmpty => RA.isNilOrEmpty(value)
export const tg_isNotNilOrEmpty = <T>(value: T | NilOrEmpty): value is T =>
    RA.isNotNilOrEmpty(value)

/* * EMPTY STRING!!!!! * */
export const tg_isEmptyString = <T = unknown>(
    value: T | EmptyString
): value is EmptyString => RA.isEmptyString(value)

export const tg_isString = <T = unknown>(value: T | string): value is string =>
    RA.isString(value)
export const tg_isNotString = <T = unknown>(value: T | string): value is T =>
    RA.isNotString(value)

export const tg_isInteger = <T = unknown>(value: T | number): value is number =>
    RA.isInteger(value)
export const tg_isNotInteger = <T = unknown>(value: T | number): value is T =>
    RA.isNotInteger(value)

export const tg_isPrimitive = <T = unknown>(
    value: T | tsPrimitive
): value is tsPrimitive => RA.isPrimitive(value)
export const tg_isNotPrimitive = <T = unknown>(
    value: T | tsPrimitive
): value is T => RA.isNotPrimitive(value)

export const tg_isNilLike = <T>(value: T | NilLike): value is NilLike =>
    RA.isEmptyString(value) || R.isNil(value)
export const tg_isNotNilLike = <T>(value: T | NilLike): value is T =>
    !(RA.isEmptyString(value) || R.isNil(value))

//'' | null | undefined
export const tg_isNullish = <T>(value: T | NilLike): value is undefined =>
    RA.isEmptyString(value) || R.isNil(value)
export const tg_isNotNullish = <T>(value: T | NilLike): value is T =>
    !(RA.isEmptyString(value) || R.isNil(value))

// is null | undefined   ????????????????
/**
 * Typeguard Undefined : narrows Nullish ( null | undefined )
 *
 * @example
 *     const test_value = 22
 *     if (tg_isNotUndefined(test_value)) {
 *         const vallll: LiteralToPrimitive<typeof test_value> = test_value
 *     }
 *
 * @param value - Description
 * @returns -
 */
export const tg_isUndefined = <T>(value: T | Nullish): value is undefined =>
    R.isNil(value)
export const tg_isNotUndefined = <T = unknown>(
    value: (T extends NonNullable<T> ? T : never) | Nullish
): value is T extends NonNullable<T> ? T : never => RA.isNotNil(value)

export const tg_isEmptyArray = <T = unknown>(
    value: T[] extends EmptyArray ? EmptyArray : never
): value is T[] extends EmptyArray ? EmptyArray : never =>
    RA.isEmptyArray(value)
export const tg_isNonEmptyArray = <T = unknown>(
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
