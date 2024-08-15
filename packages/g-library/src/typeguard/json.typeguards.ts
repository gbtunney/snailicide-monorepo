import { Jsonifiable } from 'type-fest'
import { RA } from './ramdaimports.js'
import { isNotUndefined } from '../typeguard/utility.typeguards.js'
import { Json, PlainObject } from '../types/utility.js'

/**
 * Checks if a value is JSONifiable.
 *
 * @category TypeGuard
 * @template Type - The type of the value being checked.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is JSONifiable, otherwise `false`.
 */
export const isJsonifiable = <Type extends Jsonifiable>(
    value: unknown,
): value is Type extends Jsonifiable ? Type : never => {
    return (
        RA.isObjectLike(value) ||
        RA.isString(value) ||
        RA.isNumber(value) ||
        RA.isBoolean(value) ||
        RA.isNull(value)
    )
}

/**
 * Checks if a value is a valid JSON value.
 *
 * @category TypeGuard
 * @template Type - The type of the value being checked.
 * @param {Type} value - The value to check.
 * @returns {boolean} `true` if the value is a valid JSON value, otherwise
 *   `false`.
 */
export const isJsonValue = <Type extends Json.Value>(
    value: Type,
): value is Type extends Json.Value ? Type : never => {
    return (
        RA.isObjectLike(value) ||
        RA.isString(value) ||
        RA.isNumber(value) ||
        RA.isBoolean(value) ||
        isNotUndefined(value)
    )
}

/**
 * Checks if a value is a JSONifiable object-like structure (object or array).
 *
 * @category TypeGuard
 * @template Type - The type of the value being checked.
 * @param {Type} value - The value to check.
 * @returns {boolean} `true` if the value is a JSONifiable object-like
 *   structure, otherwise `false`.
 */
export const isJsonifiableObjectLike = <Type extends Json.Object | Json.Array>(
    value: Type,
): value is Type extends Json.Object | Json.Array ? Type : never => {
    return RA.isObjectLike(value)
}

/**
 * Checks if a value is a JSONifiable object.
 *
 * @category TypeGuard
 * @template Type - The type of the value being checked.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a JSONifiable object, otherwise
 *   `false`.
 */
export const isJsonifiableObject = <Type extends PlainObject>(
    value: unknown,
): value is Type extends Json.Object ? Type : Json.Object => {
    return RA.isPlainObject(value)
}

/**
 * Checks if a value is a JSONifiable array.
 *
 * @category TypeGuard
 * @template Type - The type of the value being checked.
 * @param {unknown} value - The value to check.
 * @returns {boolean} `true` if the value is a JSONifiable array, otherwise
 *   `false`.
 */
export const isJsonifiableArray = <Type extends Json.Array>(
    value: unknown,
): value is Type extends Json.Array ? Type : never => RA.isArray(value)

export const tgJson = {
    isJsonifiable,
    isJsonifiableArray,
    isJsonifiableObject,
    isJsonifiableObjectLike,
    isJsonValue,
}

export default tgJson
