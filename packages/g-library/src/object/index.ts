/**
 * OBJECT UTILS UTILS
 *
 * This file contains utility functions for objects *
 * @namespace ObjectUtils
 */
import { flatten, unflatten } from 'flat'

import {
    prettyPrintJSON,
    safeDeserializeJson,
    safeSerializeJson,
} from './json.js'

import {
    isJsonifiable,
    isJsonifiableArray,
    isJsonifiableObject,
    isJsonifiableObjectLike,
    isJsonValue,
} from '../typeguard/json.typeguards.js'

/** @namespace */
export const objectUtils = {
    flatten,
    // deepmerge,
    isJsonifiable,
    isJsonifiableArray,
    isJsonifiableObject,
    isJsonifiableObjectLike,
    isJsonValue,
    prettyPrintJSON,
    safeDeserializeJson,
    safeSerializeJson,
    unflatten,
}
export default objectUtils

export const tg = {
    isJsonifiable,
    isJsonifiableArray,
    isJsonifiableObject,
    isJsonifiableObjectLike,
    isJsonValue,
}

export {
    prettyPrintJSON,
    safeDeserializeJson,
    safeSerializeJson,
} from './json.js'

export { flatten, unflatten } from 'flat'

export { merge as deepmerge } from 'ts-deepmerge'
