import type { Primitive as tsPrimitive } from 'type-fest'
import {
    Jsonifiable,
    Jsonify,
    JsonValue,
    JsonArray,
    JsonObject,
    JsonPrimitive,
} from 'type-fest'

/* * UTILITY TYPES  * */
export type PlainObject = {
    [x: string]: unknown
    [y: number]: never
}
export type Primitive = tsPrimitive

export namespace Json {
    export type Object = JsonObject
    export type Array = JsonArray
    export type Primitive = JsonPrimitive
    export type Value = Exclude<JsonValue, null>
}

export type { Jsonify, Jsonifiable } from 'type-fest'

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
