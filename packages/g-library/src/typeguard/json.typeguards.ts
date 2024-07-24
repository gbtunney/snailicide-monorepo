/**
 * @category Json
 * @namespace Typeguards
 */

import { Jsonifiable } from 'type-fest'

import { RA } from './ramdaimports.js'
import { isNotUndefined } from '../typeguard/utility.typeguards.js'
import { Json, PlainObject } from '../types/utility.js'

/**
 * Checks if a value is JSON-serializable.
 *
 * @memberof Typeguards.Json
 * @function isJsonifiable
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is JSON-serializable, false otherwise.
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
 * Checks if a value is a non-nullable JSON value.
 *
 * @memberof Typeguards.Json
 * @function isJsonValue
 * @param {Json.Value} value - The value to check.
 * @returns {boolean} - True if the value is a non-nullable JSON value, false
 *   otherwise.
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
 * Checks if a value is an object-like JSON-serializable value.
 *
 * @memberof Typeguards.Json
 * @function isJsonifiableObjectLike
 * @param {Json.Object | Json.Array} value - The value to check.
 * @returns {boolean} - True if the value is an object-like JSON-serializable
 *   value, false otherwise.
 */
export const isJsonifiableObjectLike = <Type extends Json.Object | Json.Array>(
    value: Type,
): value is Type extends Json.Object | Json.Array ? Type : never => {
    return RA.isObjectLike(value)
}

/**
 * Checks if a value is a JSON-serializable object.
 *
 * @memberof Typeguards.Json
 * @function isJsonifiableObject
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is a JSON-serializable object, false
 *   otherwise.
 */
export const isJsonifiableObject = <Type extends PlainObject>(
    value: unknown,
): value is Type extends Json.Object ? Type : Json.Object => {
    return RA.isPlainObject(value)
}

/**
 * Checks if a value is a JSON-serializable array.
 *
 * @memberof Typeguards.Json
 * @function isJsonifiableArray
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is a JSON-serializable array, false
 *   otherwise.
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
