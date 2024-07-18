import { parseGid } from '@shopify/admin-graphql-api-utilities'
import { numeric, stringUtils, tg } from '@snailicide/g-library'
import * as RA from 'ramda-adjunct'

/**
 * Converts a potentially encoded Global ID (GID) to its decoded form if it is a
 * valid GID, otherwise returns undefined.
 *
 * @function toGID
 * @param {string} value - The GID to decode.
 * @returns {string | undefined} The decoded GID if valid, otherwise undefined.
 */
export const toGID = (value: string): string | undefined => {
    return isEncodedGID(value) ? atob(value) : isGID(value) ? value : undefined
}

/**
 * Checks if the provided string is an encoded GID.
 *
 * @function isEncodedGID
 * @param {string} value - The string to check.
 * @returns {boolean} True if the string is an encoded GID, false otherwise.
 */
export const isEncodedGID = <Type extends string>(
    value: Type,
): value is Type => {
    try {
        return isGID(atob(value))
    } catch (exceptionVar) {
        return false
    }
}
/**
 * Determines if the provided string is a valid GID.
 *
 * @function isGID
 * @param {string} value - The string to validate.
 * @returns {boolean} True if the string is a valid GID, false otherwise.
 */
export const isGID = <Type extends string>(value: Type): value is Type => {
    return stringUtils.validateString(
        value,
        'gid://',
        stringUtils.startsWith,
    ) === true
        ? true
        : isEncodedGID(value)
          ? stringUtils.validateString(
                atob(value),
                'gid://',
                stringUtils.startsWith,
            )
          : false
}
/**
 * Checks if the provided value can be parsed into a Shopify ID (SID) with a
 * minimum number of digits.
 *
 * @function isParsableToSID
 * @param {string | number} value - The value to check.
 * @param {number} [min_digits=9] - The minimum number of digits required for
 *   the SID. Default is `9`
 * @returns {boolean} True if the value can be parsed into a SID, false
 *   otherwise.
 */
export const isParsableToSID = <Type extends string | number>(
    value: Type,
    min_digits = 9,
): value is Type => {
    if (RA.isInteger(value) && isSID(value.toString(), min_digits)) return true
    if (RA.isString(value)) {
        if (isGID(value) && tg.isNotUndefined(toSID(value, min_digits))) {
            return true
        }
        return isSID(value, min_digits)
    }
    return false
}

/**
 * Converts a GID to a Shopify ID (SID) if possible, considering a minimum
 * number of digits.
 *
 * @function toSID
 * @param {string} value - The GID to convert.
 * @param {number} [min_digits=9] - The minimum number of digits required for
 *   the SID. Default is `9`
 * @returns {number | undefined} The SID if conversion is possible, otherwise
 *   undefined.
 */
export const toSID = <Type extends string>(
    value: Type,
    min_digits = 9,
): number | undefined => {
    if (isGID(value)) {
        const __gid = toGID(value)
        if (tg.isNotUndefined<string>(__gid)) {
            const _possible_sid = parseGid(__gid)
            if (
                tg.isNotUndefined<string>(_possible_sid) &&
                isSID(_possible_sid, min_digits)
            ) {
                return numeric.parseStringToInteger(_possible_sid)
            }
        }
    } else if (isSID(value, min_digits))
        return numeric.parseStringToInteger(value)
    return undefined
}

/**
 * Determines if the provided value is a valid Shopify ID (SID), considering a
 * minimum number of digits.
 *
 * @function isSID
 * @param {number | string} value - The value to validate.
 * @param {number} [min_digits=9] - The minimum number of digits required for
 *   the SID. Default is `9`
 * @returns {boolean} True if the value is a valid SID, false otherwise.
 */
export const isSID = <Type extends number | string>(
    value: Type,
    min_digits = 9,
): value is Type => {
    if (numeric.isParsableToNumeric(value)) {
        const sidInt = numeric.parseStringToInteger(value.toString())
        return tg.isNotUndefined<number>(sidInt) &&
            numeric.getIntegerDigitCount(sidInt) >= min_digits
            ? true
            : false
    }
    return false
}

/**
 * Generates a Shopify media URL with optional parameters for resizing and
 * cropping.
 *
 * @function shopifyMediaURL
 * @param {string} [src=undefined] - The source URL of the media. Default is
 *   `undefined`
 * @param {number | string} [width=undefined] - The desired width of the media.
 *   Default is `undefined`
 * @param {number | string} [height=undefined] - The desired height of the
 *   media. Default is `undefined`
 * @param {'top' | 'center' | 'bottom' | 'left' | 'right'} [crop=undefined] -
 *   The crop position. Default is `undefined`
 * @param {boolean} [scale=false] - Whether to scale the image. Default is
 *   `false`
 * @returns {string | undefined} The modified media URL or undefined if the
 *   source URL is invalid.
 */
export const shopifyMediaURL = (
    src: string | undefined = undefined,
    width: number | string | undefined = undefined,
    height: number | string | undefined = undefined,
    crop:
        | 'top'
        | 'center'
        | 'bottom'
        | 'left'
        | 'right'
        | undefined = undefined,
    scale = false,
): string | undefined => {
    if (
        tg.isNotUndefined<string>(src) &&
        stringUtils.isValidUrl(src) &&
        /\.jpg|\.png|\.gif|\.jpeg/g.test(src)
    ) {
        if (tg.isUndefined(width)) return src
        let _width: number | undefined = undefined
        let _height: number | undefined = undefined
        if (
            tg.isNotUndefined<string | number>(width) &&
            numeric.isParsableToNumeric(width)
        ) {
            const __width = numeric.parseToNumeric(width)
            _width = tg.isNumber(__width) ? __width : undefined
        }
        if (
            tg.isNotUndefined<string | number>(height) &&
            numeric.isParsableToNumeric(height)
        ) {
            const __height = numeric.parseToNumeric(height)
            _height = tg.isNumber(__height) ? __height : undefined
        }
        if (_height === 0) _height = _width
        const dimensions = `${tg.isNotUndefined<number>(_width) ? _width : ''}${
            tg.isNotUndefined<number>(_height) ? `x${_height}` : ''
        }`
        let str = dimensions
        if (tg.isNotUndefined(crop)) str = `${str}_crop_${crop}`
        return src
            .replace(
                /_(pico|icon|thumb|small|compact|medium|large|grande|original|1024x1024|2048x2048|master)+\./g,
                '.',
            )
            .replace(/\.jpg|\.png|\.gif|\.jpeg/g, function (match) {
                return '_' + str + match
            })
    }
    return undefined
}
