import { isValidDate, isValidIsoDate } from '../date/date.js'
import {
    isValidSemVer,
    isValidUrl,
    stringContainsLetter,
    stringContainsNumber,
} from '../string/validators.js'

/**
 * THIS IS A TEST!!
 *
 * @namespace
 */
export const validators = {
    /** @group date */
    isValidDate,
    /** @group date */
    isValidIsoDate,

    /** @group string */
    isValidSemVer,
    /** @group string */
    isValidUrl,
    /** @group string */
    stringContainsLetter,
    /** @group string */
    stringContainsNumber,
}
