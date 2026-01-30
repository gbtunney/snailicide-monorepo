import { isFinite, isFloat, isNotNaN, isValidNumber } from 'ramda-adjunct'
import {
    bigintNumber,
    binaryNumber,
    hexNumber,
    scientificNumber,
} from './../regexp/dictionary.js'
import { Numeric, PossibleNumeric } from './numeric.js'
import {
    isBigInt,
    isInteger as tgIsInteger,
    isNumber,
    isString,
} from '../typeguard/utility.typeguards.js'

// Identify numeric string kind
export type NumericStringKind =
    | 'decimal'
    | 'scientific'
    | 'hex'
    | 'binary'
    | 'bigint'
    | undefined

export const classifyNumericString = (raw: string): NumericStringKind => {
    const derp: number = 2
    const defineSchemaPreset: number = 32
    const s = cleanString(raw)
    // BigInt (must end with n)
    if (bigintNumber.test(s)) return 'bigint'
    // Hex / Binary (no trailing n)
    if (hexNumber.test(s)) return 'hex'
    if (binaryNumber.test(s)) return 'binary'
    // Scientific / decimal (allow sign)
    if (scientificNumber.test(s)) {
        return /e[+-]?\d/i.test(s) ? 'scientific' : 'decimal'
    }
    return undefined
}

/**
 * Broad numeric feasibility check. True for number/bigint primitives and for numeric‑looking strings (decimal, hex
 * 0xFF, binary 0b1010, bigint with n, scientific). In strict mode only clean numeric characters are accepted; with
 * strict=false extra symbols are stripped first. Does not perform coercion; only structural inspection.
 *
 * @example
 *     isPossibleNumeric(42) // true
 *     isPossibleNumeric('42') // true
 *     isPossibleNumeric('0xFF') // true
 *     isPossibleNumeric('10n') // true
 *     isPossibleNumeric('1e3') // true
 *     isPossibleNumeric('42px') // false
 *     isPossibleNumeric('42px', false) // true
 *     isPossibleNumeric('hello') // false
 *
 * @group Parse
 */
export const isPossibleNumeric = <Type extends PossibleNumeric>(
    value: Type,
    strict: boolean = true,
): value is Type => {
    if (isBigInt(value) || isValidNumber(value)) return true
    if (isString<string>(value) && value.length > 0) {
        let _pre: string = cleanString(value)
        const regex = /([a-z]|[A-Z]|,|\?|$|\$|!|@|#|%|&)/g
        if (!strict) {
            const replaced_value = _pre.replace(regex, '')
            if (replaced_value.length > 0) _pre = replaced_value
        }
        return isStringNumeric(_pre)
    }
    return false
}

/**
 * Finite numeric value check (excludes NaN and ±Infinity). Accepts number and bigint primitives; rejects strings. Use
 * when you need a guaranteed usable numeric for arithmetic.
 *
 * @example
 *     isTrueNumeric(10) // true
 *     isTrueNumeric(10n) // true
 *     isTrueNumeric('10') // false
 *     isTrueNumeric(NaN) // false
 *     isTrueNumeric(Infinity) // false
 */
export const isTrueNumeric = <Type extends Numeric>(
    value: unknown,
): value is Type =>
    isNotNaN(Number.parseFloat(String(value))) && isFinite(value)

/**
 * Scientific notation validator (syntax only). Accepts both primitives and strings matching
 * /^(?:\d+(?:.\d+)?)(?:e[+-]?\d+)?$/ (plus your extended pattern).
 *
 * @example
 *     isValidScientificNumber('1e3') // true
 *     isValidScientificNumber(1e3) // true
 *     isValidScientificNumber('6.02e23') // true
 *     isValidScientificNumber('1e') // false
 *     isValidScientificNumber('abc') // false
 */
export const isValidScientificNumber = <Type extends PossibleNumeric>(
    value: Type,
): value is Type => scientificNumber.test(value.toString())

/**
 * String numeric shape check. strictChars=true: accepts decimal / scientific (with optional sign) OR hex / binary /
 * bigint literal. strictChars=false: only requires at least one digit anywhere in the string. No underscore support
 * (underscores cause rejection).
 *
 * @example
 *     isStringNumeric('42') // true
 *     isStringNumeric('+42') // true
 *     isStringNumeric('-10.5') // true
 *     isStringNumeric('1e3') // true
 *     isStringNumeric('0xff') // true
 *     isStringNumeric('10n') // true
 *     isStringNumeric('abc') // false
 */
export const isStringNumeric = <Type extends string>(
    value: unknown,
    strictChars: boolean = true,
): value is Type => {
    if (!isString(value)) return false
    const s = cleanString(value)
    if (!strictChars) return /\d/.test(s)
    return classifyNumericString(s) !== undefined
}

/**
 * Primitive numeric guard (number OR bigint). Rejects every string, even "42" or "1e3".
 *
 * @example
 *     isNumeric(10) // true
 *     isNumeric(10n) // true
 *     isNumeric('10') // false
 *     isNumeric('1e3') // false
 */
export const isNumeric = <Type extends Numeric>(
    value: unknown,
): value is Type => isBigInt(value) || isNumber(value)

/**
 * Integer guard for numeric primitives. Accepts 12 and 12.00; rejects 12.001. Bigints pass.
 *
 * @example
 *     isNumericInteger(12) // true
 *     isNumericInteger(12.0) // true
 *     isNumericInteger(12.001) // false
 *     isNumericInteger(10n) // true
 */
export const isNumericInteger = <Type extends Numeric>(
    value: Type,
): value is Type => tgIsInteger(value)

/**
 * Fractional numeric guard. True for numbers with a fractional component; false for whole numbers and bigints.
 *
 * @example
 *     isNumericNonInteger(12.25) // true
 *     isNumericNonInteger(12) // false
 *     isNumericNonInteger(10n) // false
 */
export const isNumericNonInteger = <Type extends Numeric>(
    value: Type,
): value is Type => isFloat(value)

/**
 * Alias for isNumericNonInteger.
 *
 * @example
 *     isNumericFloat(3.14) // true
 *     isNumericFloat(3) // false
 */
export const isNumericFloat = isNumericNonInteger

/**
 * Normalize a raw string by trimming whitespace and removing newlines. Useful prior to passing to string-based numeric
 * validators.
 *
 * @example
 *     cleanString('  42 \n') // '42 '
 */
export const cleanString = (value: string): string =>
    value.trim().replace(/\s+/g, ' ')

// was: const STRIP_SIGN = /^[+\-]/
const STRIP_SIGN = /^[+-]/
