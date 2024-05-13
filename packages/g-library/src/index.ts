/* * JSON TYPES and UTILS * */

export type { Json, Jsonifiable, Jsonify } from './object/json.js'
export { getJSONString, getJSON } from './object/json.js'

/* * GENERIC TYPEGUARDS * */
export { tg } from './typeguard/index.js'

/* * ZOD * */
export { zod } from './zod/index.js'

/* * ZOD * */

/* * NPM UTILS * */
export * as npm from './npm/index.js'

/* * NODE UTILS MODULE * */
import type * as NodeModule from './node/index.js'
export { node } from './node/index.js'
export type Node = NodeModule

export type {
    PlainObject,
    Primitive,
    PrefixProperties,
    SuffixProperties,
    DeepPartial,
} from './types/utility'

export type {
    EmptyObject,
    EmptyArray,
    EmptyString,
    Falsy,
    NilOrEmpty,
    NilLike,
    Nullish,
} from './types/empty'
//todo:reorganize

/* * STRING UTILITIES * */
export * as regexp from './regexp/index.js'

export * as stringUtils from './string/index.js'

export * as stringTransform from './transformString/index.js'

export { numeric } from './number/index.js'
