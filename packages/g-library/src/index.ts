/* * HTML UTILITIES * */
export { htmlUtils } from './browser/index.js'

/* * COLOR UTILITIES * */
export { colorUtils } from './color/index.js'

/* * DATE UTILITIES * */
export { dateUtils } from './date/index.js'

export * as numeric from './number/index.js'

/* * JSON & OBJECT UTILITIES * */
export { objectUtils } from './object/index.js'

export { deepmerge } from './object/index.js'

/* * REGEXP UTILITIES * */
export { regexp } from './regexp/index.js'

/* * STRING UTILITIES * */
export { stringUtils } from './string/index.js'

/* * GENERIC TYPEGUARDS * */
export { tg } from './typeguard/index.js'

export type {
    DeepPartial,
    EmptyArray,
    EmptyObject,
    EmptyString,
    Falsy,
    Json,
    Jsonifiable,
    NilLike,
    NilOrEmpty,
    Nullish,
    PlainObject,
    PrefixProperties,
    Primitive,
    SuffixProperties,
} from './types/index.js'

/* * ZOD UTILITIES * */
export { zodHelpers } from './zod_helpers/index.js'
