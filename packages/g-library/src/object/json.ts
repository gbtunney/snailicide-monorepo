import {
    Jsonifiable,
    Jsonify,
    JsonValue,
    JsonArray,
    JsonObject,
    JsonPrimitive,
} from 'type-fest'

export const getJSONString = <Type extends Jsonifiable>(
    value: Type,
    prettyPrint = true,
    indentSpaces = 4
): string => {
    return prettyPrint
        ? JSON.stringify(getJSON<Type>(value), undefined, indentSpaces)
        : JSON.stringify(getJSON<Type>(value))
}

export const getJSON = <Type extends Jsonifiable>(
    value: Type
): Jsonify<Type> | undefined => {
    try {
        const json_value: Jsonify<Type> = JSON.parse(JSON.stringify(value))
    } catch (e) {
        console.error(e)
        return undefined
    }
    return JSON.parse(JSON.stringify(value))
}

export type { Jsonify, Jsonifiable } from 'type-fest'

export namespace JSON {
    export type Object = JsonObject
    export type Array = JsonArray
    export type Primitive = JsonPrimitive
    export type Value = JsonValue
}
