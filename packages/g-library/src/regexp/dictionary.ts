/**
 * Semver
 *
 * @see {@link https://regex101.com/r/vkijKf/1/|regex101: build, test, and debug regex: Semver}
 */
export const semver =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/gm

/** Name field field in package.json */
export const validPackageName =
    /^(@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/

/**
 * PackageManager field in package.json
 *
 * @see {@link https://stackoverflow.com/questions/71747609/how-to-specify-packagemanager-in-package-json|node.js - How to specify "packageManager" in package.json - Stack Overflow}
 */
export const packageManager = /(npm|pnpm|yarn)@\d+\.\d+\.\d+(-.+)?/

export const newLineChars = [
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

///    in Unicode: \u000a or \n, which is a line feed; \u000d or \r, which is a carriage return; \u2028, a line separator; and \u2029, a paragraph separator. In practice though, the regex you posted is suffici
export const whiteSpaceCharacters = [
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

/**
 * US PHONE NUMBER
 *
 * Works in: ECMAScript, PCRE, Google Forms
 *
 * @category GoogleAppScript
 * @see {@link https://regex101.com/r/CYCMEc/1 | regexp101 examples}
 */
const phoneNumber =
    /^((((\+[\d\-.]{1,5})?[ \-.]?\d{3})|(\+[\d\-.]{1,5})?[ \-.]?\((\d{3}\)))?[ \-.]?\d{3}[ \-.]?\d{4}\s?)?$/g

/**
 * US ZIP CODE
 *
 * Works in: ECMAScript, PCRE, Google Forms
 *
 * @category GoogleAppScript
 * @see {@link https://regex101.com/r/VFnoSZ/2 | regexp101 examples}
 */
const zipCode = /^\d{5,6}(?:[-\s]\d{4})?$/gm
//const streetAddress = /[a-zA-Z\d\s\-\,\#\.\+]+/g

export const googleAppsR = {
    zipCode,
    phoneNumber,
}
