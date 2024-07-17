/**
 * @category Json
 * @namespace Typeguards
 */

import { Jsonifiable } from 'type-fest'

import { isNotUndefined } from '../typeguard/utility.typeguards.js'
import { Json, PlainObject } from '../types/utility.js'
import { RA } from './ramdaimports.js'

/**
 * Checks if a value is JSON-serializable.
 *
 * @memberof Typeguards.Json
 * @function isJsonifiable
 * @param {unknown} value - The value to check.
 * @returns {boolean} - True if the value is JSON-serializable, false otherwise.
 */
export const isJsonifiable = <T extends Jsonifiable>(
    value: unknown,
): value is T extends Jsonifiable ? T : never => {
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
export const isJsonValue = <T extends Json.Value>(
    value: T,
): value is T extends Json.Value ? T : never => {
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
export const isJsonifiableObjectLike = <T extends Json.Object | Json.Array>(
    value: T,
): value is T extends Json.Object | Json.Array ? T : never => {
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
export const isJsonifiableObject = <T extends PlainObject>(
    value: unknown,
): value is T extends Json.Object ? T : Json.Object => {
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
export const isJsonifiableArray = <T extends Json.Array>(
    value: unknown,
): value is T extends Json.Array ? T : never => RA.isArray(value)

export const tg_json = {
    isJsonifiable,
    isJsonValue,
    isJsonifiableObjectLike,
    isJsonifiableObject,
    isJsonifiableArray,
}
export default tg_json
