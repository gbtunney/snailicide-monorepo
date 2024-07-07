/* * GENERIC TYPEGUARDS * */
export { tg } from './typeguard/index.js'

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
export { regexp } from './regexp/index.js'
export { stringUtils } from './string/index.js'

export { numeric } from './number/index.js'

export { htmlUtils } from './browser/index.js'
export { zodHelpers } from './zod_helpers/index.js'

/* * JSON & OBJECT UTILS * */
export { objectUtils } from './object/index.js'

import * as _dateUtils from './date/index.js'
import * as _colorUtils from './color/index.js'

export const dateUtils: typeof _dateUtils = _dateUtils
export const colorUtils: typeof _colorUtils = _colorUtils

export { deepmerge } from './object/index.js'
