import * as RA from 'ramda-adjunct'
import {
    numeric,
    tg,
    stringUtils,
    stringTransform,
} from '@snailicide/g-library'
import { parseGid } from '@shopify/admin-graphql-api-utilities'

export const toGID = (value: string): string | undefined => {
    return isEncodedGID(value) ? atob(value) : isGID(value) ? value : undefined
}

export const isEncodedGID = <Type extends string>(
    value: Type
): value is Type => {
    try {
        return isGID(atob(value))
    } catch (exceptionVar) {
        return false
    }
}

export const isGID = <Type extends string>(value: Type): value is Type => {
    return stringTransform.validateString(
        value,
        'gid://',
        stringTransform.startsWith
    ) === true
        ? true
        : isEncodedGID(value)
        ? stringTransform.validateString(
              atob(value),
              'gid://',
              stringTransform.startsWith
          )
        : false
}

export const isParsableToSID = <Type extends string | number>(
    value: Type,
    min_digits = 9
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
 * ToSID
 *
 * @template {string} Type - Must extend string
 * @param {Type} value - Value to validate
 * @param {number} min_digits [d=9]
 * @returns {number | undefined} Bool if invalid
 */
export const toSID = <Type extends string>(
    value: Type,
    min_digits = 9
): number | undefined => {
    if (isGID(value)) {
        const __gid = toGID(value)
        if (tg.isNotUndefined<string>(__gid)) {
            const _possible_sid = parseGid(__gid)
            if (
                tg.isNotUndefined<string>(_possible_sid) &&
                isSID(_possible_sid, min_digits)
            ) {
                return numeric.parseToInteger(_possible_sid)
            }
        }
    } else if (isSID(value, min_digits)) return numeric.parseToInteger(value)
    return undefined
}

/**
 * IsSID
 *
 * @template {number | string} Type - Must extend number | string
 * @param {Type} value - Value to validate
 * @param {number} min_digits [d=9]
 * @returns {boolean} Bool if invalid
 */
export const isSID = <Type extends number | string>(
    value: Type,
    min_digits = 9
): value is Type => {
    if (numeric.isParsableToNumeric(value)) {
        const sidInt = numeric.parseToInteger(value)
        return tg.isNotUndefined<number>(sidInt) &&
            numeric.getIntegerDigitCount(sidInt) >= min_digits
            ? true
            : false
    }
    return false
}

/**
 * ShopifyMediaURL
 *
 * @class
 * @param {string | undefined} src - Shopify Image url. (usually from
 *   ProductImage)
 * @param {number | string | undefined} - Width [d=undefined]
 * @param {number | string | undefined} - Height [d=undefined]
 * @param {'top' | 'center' | 'bottom' | 'left' | 'right' | undefined} - Crop
 *   value [d=undefined]
 * @returns {string} - Url. ? needs validate? bc they make it a pain in the ass
 *   to get a specific size image. IDEA? maybe do aspect ratio instead
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
    scale = false
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
            _width = numeric.parseToNumeric(width)
        }
        if (
            tg.isNotUndefined<string | number>(height) &&
            numeric.isParsableToNumeric(height)
        ) {
            _height = numeric.parseToNumeric(height)
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
                '.'
            )
            .replace(/\.jpg|\.png|\.gif|\.jpeg/g, function (match) {
                return '_' + str + match
            })
    }
    return undefined
}
