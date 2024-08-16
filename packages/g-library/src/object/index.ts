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

import {
    isJsonifiable,
    isJsonifiableArray,
    isJsonifiableObject,
    isJsonifiableObjectLike,
    isJsonValue,
} from '../typeguard/json.typeguards.js'

export const objectUtils = {
    flatten,
    prettyPrintJSON,
    safeDeserializeJson,
    safeSerializeJson,
    unflatten,
}

/** @namespace */
export const GILLIAN = {
    isJsonifiable,
    isJsonifiableArray,
    isJsonifiableObject,
    isJsonifiableObjectLike,
    isJsonValue,
    prettyPrintJSON,
    safeDeserializeJson,
    safeSerializeJson,
}
export default objectUtils
export { merge as deepmerge } from 'ts-deepmerge'
