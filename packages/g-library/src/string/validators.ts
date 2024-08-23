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
 * @category URL
 * @category IPAddress
 * @category Validators todo: try to type URLScheme
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
 * @category URL
 * @category IPAddress
 * @category Validators todo: try to type URLScheme
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
 * @category URL
 * @category Validators todo: try to type URLScheme
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
 * Checks if a string is a valid URL.
 *
 * @category URL
 * @category Validators todo: try to type URLScheme
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
 */
export const isValidSemVer = (value: string): boolean =>
    semvervalid(value) !== null

/**
 * If the length of the string is >1 and string contains a number.
 *
 * @category Validators
 */
export const stringContainsNumber = <Type extends string>(
    value: Type,
): value is Type => value.length >= 1 && /\d/.test(value)

/**
 * If the length of the string is >1 and the string does not match a letter,
 * return true.
 *
 * @category Validators
 */
export const stringContainsLetter = <Type extends string>(
    value: Type,
): value is Type => value.length >= 1 && /[a-z]/i.test(value)
