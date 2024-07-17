/**
 * OBJECT UTILS UTILS
 *
 * This file contains utility functions for objects *
 *
 * @namespace ObjectUtils
 */
import {
    prettyPrintJSON,
    safeDeserializeJson,
    safeSerializeJson,
} from './json.js'

export { merge as deepmerge } from 'ts-deepmerge'
import { flatten, unflatten } from 'flat'
export type { FlattenOptions, UnflattenOptions } from 'flat'

export const objectUtils = {
    prettyPrintJSON,
    safeSerializeJson,
    safeDeserializeJson,
    flatten,
    unflatten,
}
export default objectUtils
