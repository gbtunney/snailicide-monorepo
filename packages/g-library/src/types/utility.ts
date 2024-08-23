import type {
    UnknownArray,
    Jsonifiable,
    Jsonify,
    JsonValue,
    JsonArray,
    JsonObject,
    JsonPrimitive,
} from 'type-fest'

/** TYPEFEST TYPES */
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
 * @category Utility Types
 * */
export type PlainObject = {
    [x: string]: unknown
    [y: number]: never
}

/* * @category Utility Types */
export type IsArray<Type> = Type extends UnknownArray ? true : false

/*
 * @category Utility Types
 * @category Json
 *  */
export namespace Json {
    export type Object = JsonObject
    export type Array = JsonArray
    export type Primitive = JsonPrimitive
    export type Value = Exclude<JsonValue, null>
}
/* * @category Utility Types */
export type DeepPartial<Type> = Type extends object
    ? {
          [Prop in keyof Type]?: DeepPartial<Type[Prop]>
      }
    : Type
/* * @category Utility Types */
export type PrefixProperties<Type extends object, Prefix extends string> = {
    [Key in keyof Type as `${Prefix}${Key extends string
        ? Key
        : never}`]: Type[Key]
}
/* * @category Utility Types */
export type SuffixProperties<Type extends object, Suffix extends string> = {
    [Key in keyof Type as `${Key extends string
        ? Key
        : never}${Suffix}`]: Type[Key]
}
