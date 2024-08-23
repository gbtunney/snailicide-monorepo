/** HTML utilities for browser and node */
export * as htmlUtils from './browser/index.js'
export type * from './browser/index.js'

/* * COLOR UTILITIES * */
export { colorUtils } from './color/index.js'
export type * from './color/index.js'

/* * DATE UTILITIES * */
export { dateUtils } from './date/index.js'
export type * from './date/index.js'

/* * NUMERIC UTILITIES * */
export * as numeric from './number/index.js'
export type * from './number/index.js'

/* * JSON & OBJECT UTILITIES * */
export { objectUtils } from './object/index.js'
export { deepmerge } from './object/index.js'

/* * REGEXP UTILITIES * */
/** @namespace */
export { regexp } from './regexp/index.js'

/* * STRING UTILITIES * */
export { stringUtils } from './string/index.js'
export type {
    BaseValue,
    BatchBaseValue,
    Pattern,
    ReplaceCharacters,
    TrimCharacters,
    ValidateFunc,
    ValidateOperation,
} from './string/transformString/index.js'

/* * GENERIC TYPEGUARDS * */
export { tg } from './typeguard/index.js'

/* * GENERIC AND UTILITY TYPES * */
export type * from './types/index.js'

/* * ZOD UTILITIES * */
export { zodHelpers } from './zod_helpers/index.js'
export type { ZodRegExp } from './zod_helpers/index.js'
