/* * GENERIC TYPEGUARDS * */
export { tg } from './typeguard/index.js'

/* * NPM UTILS * */
export * as npm from './npm/index.js'

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
    Json,
    Jsonifiable,
} from './types/index.js'

/* * STRING UTILITIES * */
export * as regexp from './regexp/index.js'
export { stringUtils } from './string/index.js'

export { numeric } from './number/index.js'

export * as dateUtils from './date/index.js'

export * as zodUtils from './zod_helpers/index.js'
/* * JSON & OBJECT UTILS * */
export * as objectUtils from './object/index.js'

export * as colorUtils from './color/index.js'
