import { minimatch } from 'minimatch'
import semvervalid from 'semver/functions/valid.js'
import { ValueOf, Writable } from 'type-fest'
import z from 'zod'
import {
    IP_ADDRESS_REG_EXP,
    URL,
    URL_DOMAIN_EXTENSION,
    URL_SCHEME,
    urlScheme,
} from '../regexp/dictionary.js'

export const minLen = (value: string, min: number): boolean =>
    typeof value === 'string' && value.length >= min
/**
 * Checks if a string starts with a given prefix. Optional trim before comparison.
 *
 * @example
 *     startsWithPrefix('  hello', 'he', true) // true
 *     startsWithPrefix('hello', 'he') // true
 *     startsWithPrefix('hello', 'x') // false
 */
export const startsWithPrefix = (
    value: string,
    prefix: string,
    trimmed: boolean = false,
): boolean =>
    typeof value === 'string' &&
    (trimmed ? value.trim() : value).startsWith(prefix)
/**
 * Checks if a string ends with a given suffix. Optional trim before comparison.
 *
 * @example
 *     endsWithSuffix('hello  ', 'lo', true) // true
 *     endsWithSuffix('hello', 'lo') // true
 *     endsWithSuffix('hello', 'xx') // false
 */
export const endsWithSuffix = (
    value: string,
    suffix: string,
    trimmed: boolean = false,
): boolean =>
    typeof value === 'string' &&
    (trimmed ? value.trim() : value).endsWith(suffix)
/**
 * Minimatch pattern validation. True when value matches pattern (glob style).
 *
 * @example
 *     getValidMinimatch('src/index.ts', 'src/*.ts') // true
 *     getValidMinimatch('src/index.js', 'src/*.ts') // false
 */
export const getValidMinimatch = (value: string, pattern: string): boolean => {
    return minimatch(value, pattern)
}
/** @category URL */
export type URLScheme = ValueOf<typeof URL_SCHEME>

/** @category URL */
export type URLDomainExtention = ValueOf<typeof URL_DOMAIN_EXTENSION>

/**
 * @category URL
 * @category IPAddress
 * @category Validators
 */
export type IPAddress = z.BRAND<'IPAddress'>

/**
 * Validates an IP address string (optionally with scheme). Returns branded IPAddress or undefined.
 *
 * @example
 *     getValidIPAddress('127.0.0.1') // IPAddress
 *     getValidIPAddress('http://127.0.0.1') // IPAddress
 *     getValidIPAddress('999.0.0.1') // undefined
 */
export const getValidIPAddress = <Type extends string>(
    value: Type,
    scheme: string | Array<string> = URL_SCHEME as Writable<typeof URL_SCHEME>,
    optional: boolean = true,
): IPAddress | undefined => {
    const _schema = z
        .string()
        .refine((value: string) => isValidIpAddress(value, scheme, optional))
        .brand('IPAddress')
    if (_schema.safeParse(value).success) {
        const result: IPAddress = _schema.parse(value)
        return result
    }
    return undefined
}

/**
 * IP address syntax check (optionally requires scheme).
 *
 * @example
 *     isValidIpAddress('127.0.0.1') // true
 *     isValidIpAddress('http://127.0.0.1') // true
 *     isValidIpAddress('999.0.0.1') // false
 */
export const isValidIpAddress = <Type extends string = string>(
    value: Type,
    scheme: string | Array<string> = URL_SCHEME as Writable<typeof URL_SCHEME>,
    optional: boolean = true,
): value is Type => {
    const _regexp: RegExp = !optional
        ? new RegExp(
              `${urlScheme(scheme, false).source}${IP_ADDRESS_REG_EXP.source}`,
              'm',
          )
        : new RegExp(
              `${urlScheme(scheme, true).source}?${IP_ADDRESS_REG_EXP.source}`,
              'm',
          )
    return _regexp.test(value)
}

/** @category URL */
export type URL = z.BRAND<'URL'>

/**
 * Validates a URL string (optionally with scheme). Returns branded URL or undefined.
 *
 * @example
 *     getValidUrl('https://example.com') // URL
 *     getValidUrl('example') // undefined
 */
export const getValidUrl = <Type extends string>(
    value: Type,
    scheme: string | Array<string> = URL_SCHEME as Writable<typeof URL_SCHEME>,
    optional: boolean = true,
): URL | undefined => {
    const _schema = z
        .string()
        .refine((value: string) => isValidUrl(value, scheme, optional))
        .brand('URL')
    if (_schema.safeParse(value).success) {
        const result: URL = _schema.parse(value)
        return result
    }
    return undefined
}

/**
 * URL syntax check (optionally requires scheme).
 *
 * @example
 *     isValidUrl('https://example.com') // true
 *     isValidUrl('ftp://example.com') // true
 *     isValidUrl('example') // false
 */
export const isValidUrl = <Type extends string = string>(
    value: Type,
    scheme: string | Array<string> = URL_SCHEME as Writable<typeof URL_SCHEME>,
    optional: boolean = true,
): value is Type => {
    const _regexp: RegExp = !optional
        ? new RegExp(`${urlScheme(scheme, false).source}${URL.source}`, 'm')
        : new RegExp(`${urlScheme(scheme, true).source}?${URL.source}`, 'm')
    return _regexp.test(value)
}

/**
 * Checks if the provided string is a valid semantic version (SemVer).
 *
 * @category Validators
 * @example
 *     isValidSemVer('1.2.3') // true
 *     isValidSemVer('1.2') // false
 *     isValidSemVer('invalid') // false
 */
export const isValidSemVer = (value: string): boolean =>
    semvervalid(value) !== null

/**
 * If the length of the string is >1 and string contains a number.
 *
 * @category Validators
 * @example
 *     stringContainsNumber('a1') // true
 *     stringContainsNumber('abc') // false
 */
export const stringContainsNumber = <Type extends string>(
    value: Type,
): value is Type => value.length >= 1 && /\d/.test(value)

/**
 * If the length of the string is >1 and the string does not match a letter, return true.
 *
 * @category Validators
 * @example
 *     stringContainsLetter('a1') // true
 *     stringContainsLetter('123') // false
 */
export const stringContainsLetter = <Type extends string>(
    value: Type,
): value is Type => value.length >= 1 && /[a-z]/i.test(value)
