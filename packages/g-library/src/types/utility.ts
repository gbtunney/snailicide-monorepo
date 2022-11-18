import type { Primitive as tsPrimitive } from 'type-fest'

/* * UTILITY TYPES  * */
export type PlainObject = {
    [x: string]: unknown
    [y: number]: never
}
export type Primitive = tsPrimitive

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
