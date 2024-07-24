/**
 * OBJECT UTILS UTILS
 *
 * This file contains utility functions for objects *
 *
 * @namespace ObjectUtils
 */
import { flatten, unflatten } from 'flat'
import {
    prettyPrintJSON,
    safeDeserializeJson,
    safeSerializeJson,
} from './json.js'

export const objectUtils = {
    flatten,
    prettyPrintJSON,
    safeDeserializeJson,
    safeSerializeJson,
    unflatten,
}
export default objectUtils

export type { FlattenOptions, UnflattenOptions } from 'flat'
export { merge as deepmerge } from 'ts-deepmerge'
