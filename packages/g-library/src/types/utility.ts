import type {
    UnknownArray,
    Jsonifiable,
    Jsonify,
    JsonValue,
    JsonArray,
    JsonObject,
    JsonPrimitive,
} from 'type-fest'

/** @group Utility Types */
export type {
    Primitive,
    Simplify,
    SimplifyDeep,
    Merge,
    MergeDeep,
    LiteralUnion,
    LiteralToPrimitive,
    LiteralToPrimitiveDeep,
    ValueOf,
    Stringified,
    PartialDeep,
    Jsonify,
    Jsonifiable,
} from 'type-fest'

/* * UTILITY TYPES
 * @group Utility Types
 * */
export type PlainObject = {
    [x: string]: unknown
    [y: number]: never
}

/* * @group Utility Types */
export type IsArray<Type> = Type extends UnknownArray ? true : false

/* * @group Utility Types
 * @group JSON */
export namespace Json {
    export type Object = JsonObject
    export type Array = JsonArray
    export type Primitive = JsonPrimitive
    export type Value = Exclude<JsonValue, null>
}

/* * @group Utility Types */
export type DeepPartial<Type> = Type extends object
    ? {
          [Prop in keyof Type]?: DeepPartial<Type[Prop]>
      }
    : Type
/* * @group Utility Types */
export type PrefixProperties<Type extends object, Prefix extends string> = {
    [Key in keyof Type as `${Prefix}${Key extends string
        ? Key
        : never}`]: Type[Key]
}
/* * @group Utility Types */
export type SuffixProperties<Type extends object, Suffix extends string> = {
    [Key in keyof Type as `${Key extends string
        ? Key
        : never}${Suffix}`]: Type[Key]
}
