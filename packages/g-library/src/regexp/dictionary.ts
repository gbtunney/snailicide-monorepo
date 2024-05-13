/**
 * Semver
 *
 * @see {@link https://regex101.com/r/vkijKf/1/|regex101: build, test, and debug regex: Semver}
 */
const semver =
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/gm

/**
 * PackageManager field in package.json
 *
 * @see {@link https://stackoverflow.com/questions/71747609/how-to-specify-packagemanager-in-package-json|node.js - How to specify "packageManager" in package.json - Stack Overflow}
 */
const packageManager = /(npm|pnpm|yarn)@\d+\.\d+\.\d+(-.+)?/
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

const googleApps = {
    zipCode,
    phoneNumber,
}
