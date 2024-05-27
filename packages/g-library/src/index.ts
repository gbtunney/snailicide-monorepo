/* * GENERIC TYPEGUARDS * */
export { tg } from './typeguard/index.js'


/* * NPM UTILS * */
export * as npm from './npm/index.js'

/* * NODE UTILS MODULE * */
//import type * as NodeModule from './node/index.js'
//export { node } from './node/index.js'
//export type Node = NodeModule
export type {
    PlainObject,
    Primitive,
    PrefixProperties,
    SuffixProperties,
    DeepPartial,
    EmptyObject,
    EmptyArray,
    EmptyString,
    Falsy,
    NilOrEmpty,
    NilLike,
    Nullish,
} from './types/index.js'

/* * STRING UTILITIES * */
export * as regexp from './regexp/index.js'

export * as stringUtils from './string/index.js'

export * as stringTransform from './transformString/index.js'

export { numeric } from './number/index.js'

/* * JSON TYPES and OBJECT UTILS * */
export type { Json, Jsonifiable, Jsonify } from './object/json.js'
export * as objectUtils from './object/index.js'

export * as colorUtils from './color/index.js'
