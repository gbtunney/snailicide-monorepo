import { Jsonifiable } from 'type-fest'
import { RA } from './ramdaimports.js'
import { PlainObject, Json } from '../types/utility.js'
import { isUndefined } from '../typeguard/utility.typeguards.js'

// string | number | boolean | null;
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

/** Is NON nullabble json value */
export const isJsonValue = <T extends Json.Value>(
    value: T,
): value is T extends Json.Value ? T : never => {
    return (
        RA.isObjectLike(value) ||
        RA.isString(value) ||
        RA.isNumber(value) ||
        RA.isBoolean(value) ||
        isUndefined(value)
    )
}

export const isJsonifiableObjectLike = <T extends Json.Object | Json.Array>(
    value: unknown,
): value is T extends Json.Object | Json.Array ? T : never => {
    return RA.isObjectLike(value)
}

export const isJsonifiableObject = <T extends PlainObject>(
    value: unknown,
): value is T extends Json.Object ? T : Json.Object => {
    return RA.isPlainObject(value)
}

export const isJsonifiableArray = <T extends Json.Array>(
    value: unknown,
): value is T extends Json.Array ? T : never => RA.isArray(value)
