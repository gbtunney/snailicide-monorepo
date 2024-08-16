import semvervalid from 'semver/functions/valid.js'

/**
 * @category URL
 * @group Validators
 */
export type URL<Type extends string> = Type

/**
 * Checks if a string is a valid URL.
 *
 * @category URL
 * @group Validators
 */
export const isValidUrl = <Type extends string>(
    value: Type,
): value is URL<Type> =>
    /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
        value,
    )

/**
 * Checks if the provided string is a valid semantic version (SemVer).
 *
 * @group Validators
 */
export const isValidSemVer = (value: string): boolean =>
    semvervalid(value) !== null

/**
 * Checks if a string contains a number.
 *
 * @group Validators
 */
export const stringContainsNumber = <Type extends string>(
    value: Type,
): value is Type => /\d/.test(value)

/**
 * If the length of the string is 1 and the string does not match a letter,
 * return true.
 *
 * @group Validators
 */
export const stringContainsLetter = <Type extends string>(
    value: Type,
): value is Type => value.length === 1 && value.match(/[a-z]/i) === null
