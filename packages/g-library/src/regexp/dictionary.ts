import { ensureArray } from 'ramda-adjunct'

import type { Writable } from 'type-fest'

/**
 * Name field in package.json
 *
 * @example
 *     '@snailicide/g-library'(
 *         // bad
 *         'GLibrary',
 *     )
 */
export const validPackageName =
    /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/

/**
 * PackageManager field in package.json
 *
 * @see {@link https://stackoverflow.com/questions/71747609/how-to-specify-packagemanager-in-package-json|node.js - How to specify "packageManager" in package.json - Stack Overflow}
 */
export const packageManager = /(npm|pnpm|yarn)@\d+\.\d+\.\d+(-.+)?/

/**
 * Scientific Number
 *
 * @category Numeric Removed NaN and Infinity from original source. Allows numeric separators (_) in integer,
 *   fractional, and exponent digits.
 * @see {@link https://regex101.com/r/oubK67/5}
 */
export const scientificNumber =
    /^[+-]?(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?|\.\d(?:_?\d)*)(?:e[+-]?\d(?:_?\d)*)?$/i

export const hexNumber = /^[+-]?0x[0-9a-f](?:_?[0-9a-f])*$/i
export const binaryNumber = /^[+-]?0b[01](?:_?[01])*$/i
export const bigintNumber =
    /^[+-]?(?:\d(?:_?\d)*|0x[0-9a-f](?:_?[0-9a-f])*|0b[01](?:_?[01])*)n$/i

/** Common characters to trim from CSS classes or otherwise. */
export const DEFAULT_TRIM_CHARACTERS = [
    '.',
    "'",
    '"',
    ' ',
    '-',
    '[',
    ']',
    '(',
    ')',
]
export const TRIM_CHARS_DEFAULT = DEFAULT_TRIM_CHARACTERS
/** A list of new line characters, both unicode and ascii. */
export const NEW_LINE_CHARS = [
    /* * Unicode:line feed * */
    '\u000a',
    /* * Unicode:carriage return * */
    '\u000d',
    /* * Unicode:line separator * */
    '\u2028',
    /* * Unicode:paragraph separator * */
    '\u2029',
    /* * line feed * */
    '\n',
    /* * carriage return * */
    '\r',
]

/** List of white space characters, both unicode and ascii. */
export const WHITE_SPACE_CHARACTERS = [
    ' ',
    '\n',
    '\r',
    '\t',
    '\f',
    '\v',
    '\u00A0',
    '\u1680',
    '\u180E',
    '\u2000',
    '\u2001',
    '\u2002',
    '\u2003',
    '\u2004',
    '\u2005',
    '\u2006',
    '\u2007',
    '\u2008',
    '\u2009',
    '\u200A',
    '\u2028',
    '\u2029',
    '\u202F',
    '\u205F',
    '\u3000',
]

export const URL_SCHEME = ['https', 'http', 'ftp'] as const
export const URL_DOMAIN_EXTENSION = [
    'aero',
    'asia',
    'biz',
    'cat',
    'com',
    'coop',
    'edu',
    'gov',
    'info',
    'int',
    'jobs',
    'mil',
    'mobi',
    'museum',
    'name',
    'net',
    'org',
    'pro',
    'tel',
    'travel',
    'ac',
    'ad',
    'ae',
    'af',
    'ag',
    'ai',
    'al',
    'am',
    'an',
    'ao',
    'aq',
    'ar',
    'as',
    'at',
    'au',
    'aw',
    'ax',
    'az',
    'ba',
    'bb',
    'bd',
    'be',
    'bf',
    'bg',
    'bh',
    'bi',
    'bj',
    'bm',
    'bn',
    'bo',
    'br',
    'bs',
    'bt',
    'bv',
    'bw',
    'by',
    'bz',
    'ca',
    'cc',
    'cd',
    'cf',
    'cg',
    'ch',
    'ci',
    'ck',
    'cl',
    'cm',
    'cn',
    'co',
    'cr',
    'cu',
    'cv',
    'cx',
    'cy',
    'cz',
    'cz',
    'de',
    'dj',
    'dk',
    'dm',
    'do',
    'dz',
    'ec',
    'ee',
    'eg',
    'er',
    'es',
    'et',
    'eu',
    'fi',
    'fj',
    'fk',
    'fm',
    'fo',
    'fr',
    'ga',
    'gb',
    'gd',
    'ge',
    'gf',
    'gg',
    'gh',
    'gi',
    'gl',
    'gm',
    'gn',
    'gp',
    'gq',
    'gr',
    'gs',
    'gt',
    'gu',
    'gw',
    'gy',
    'hk',
    'hm',
    'hn',
    'hr',
    'ht',
    'hu',
    'id',
    'ie',
    'il',
    'im',
    'in',
    'io',
    'iq',
    'ir',
    'is',
    'it',
    'je',
    'jm',
    'jo',
    'jp',
    'ke',
    'kg',
    'kh',
    'ki',
    'km',
    'kn',
    'kp',
    'kr',
    'kw',
    'ky',
    'kz',
    'la',
    'lb',
    'lc',
    'li',
    'lk',
    'lr',
    'ls',
    'lt',
    'lu',
    'lv',
    'ly',
    'ma',
    'mc',
    'md',
    'me',
    'mg',
    'mh',
    'mk',
    'ml',
    'mn',
    'mn',
    'mo',
    'mp',
    'mr',
    'ms',
    'mt',
    'mu',
    'mv',
    'mw',
    'mx',
    'my',
    'mz',
    'na',
    'nc',
    'ne',
    'nf',
    'ng',
    'ni',
    'nl',
    'no',
    'np',
    'nr',
    'nu',
    'nz',
    'nom',
    'pa',
    'pe',
    'pf',
    'pg',
    'ph',
    'pk',
    'pl',
    'pm',
    'pn',
    'pr',
    'ps',
    'pt',
    'pw',
    'py',
    'qa',
    're',
    'ra',
    'rs',
    'ru',
    'rw',
    'sa',
    'sb',
    'sc',
    'sd',
    'se',
    'sg',
    'sh',
    'si',
    'sj',
    'sj',
    'sk',
    'sl',
    'sm',
    'sn',
    'so',
    'sr',
    'st',
    'su',
    'sv',
    'sy',
    'sz',
    'tc',
    'td',
    'tf',
    'tg',
    'th',
    'tj',
    'tk',
    'tl',
    'tm',
    'tn',
    'to',
    'tp',
    'tr',
    'tt',
    'tv',
    'tw',
    'tz',
    'ua',
    'ug',
    'uk',
    'us',
    'uy',
    'uz',
    'va',
    'vc',
    've',
    'vg',
    'vi',
    'vn',
    'vu',
    'wf',
    'ws',
    'ye',
    'yt',
    'yu',
    'za',
    'zm',
    'zw',
    'arpa',
] as const

/** Regexp to match a url WITHOUT A SCHEME todo: need to add domain extension to this */
export const URL = new RegExp(
    '(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\\.(?:[a-z\u00a1-\uffff]{2,})))(?::\\d{2,5})?(?:[/?#]\\S*)?$',
    'm',
)

export const IP_ADDRESS_REG_EXP = new RegExp(
    '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$',
    'm',
)

export const anyURLDomainExtension = (): RegExp => urlDomainExtension()
/** Todo: handle urls with query strings */
export const urlDomainExtension = (
    value: string | Array<string> = URL_DOMAIN_EXTENSION as Writable<
        typeof URL_DOMAIN_EXTENSION
    >,
): RegExp => new RegExp(`^(?!\\.)[^.]+\\.(${ensureArray(value).join('|')})$`)

export const anyURLScheme = (): RegExp => urlScheme()
export const urlScheme = (
    value: string | Array<string> = URL_SCHEME as Writable<typeof URL_SCHEME>,
    optional: boolean = false,
): RegExp =>
    !optional
        ? new RegExp(`^(${ensureArray(value).join('|')})://`)
        : new RegExp(`^(?:(${ensureArray(value).join('|')})://)`)
/**
 * US PHONE NUMBER
 *
 * Works in: ECMAScript, PCRE, Google Forms
 *
 * @category GoogleAppScript
 * @see {@link https://regex101.com/r/CYCMEc/1 | regexp101 examples}
 */
export const phoneNumber =
    /^((((\+[\d\-.]{1,5})?[ \-.]?\d{3})|(\+[\d\-.]{1,5})?[ \-.]?\((\d{3}\)))?[ \-.]?\d{3}[ \-.]?\d{4}\s?)?$/g

/**
 * US ZIP CODE
 *
 * Works in: ECMAScript, PCRE, Google Forms
 *
 * @category GoogleAppScript
 * @see {@link https://regex101.com/r/VFnoSZ/2 | regexp101 examples}
 */
export const zipCode = /^\d{5,6}(?:[-\s]\d{4})?$/gm
//const streetAddress = /[a-zA-Z\d\s\-\,\#\.\+]+/g
