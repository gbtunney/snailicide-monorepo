/**
 * GENERAL STRING UTILS
 *
 * @author https://github.com/mout/mout/tree/master/src/string
 */
import RA from 'ramda-adjunct'
import R from 'ramda'

export const lowerCase = (value: string): string => R.toLower(value)

export const upperCase = (value: string): string => R.toUpper(value)

export const capitalizeWords = (value: string): string =>
    value.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()))

/** Convert string to camelCase text. */
export const camelCase = (value: string): string => {
    value = RA.replaceAll(
        /[-_]/g,
        ' ',
        R.pipe(replaceAccents, removeNonWord)(value)
    )
    if (/[a-z]/.test(value) && /^|\s[A-Z]+\s|$/.test(value)) {
        // we convert any word that isn't all caps into lowercase
        // value = value.replace(/\s(\w+)/g, function(word, m) {
        //   return /^[A-Z]+$/.test(m) ? word : lowerCase(word);
        //  });
    } else if (/\s/.test(value)) {
        // if it doesn't contain an acronym and it has spaces we should
        // convert every word to lowercase
        value = R.toLower(value)
    }
    return R.pipe(
        R.replace(/\s[a-z]/g, R.toUpper),
        R.replace(/^\s*[A-Z]+/g, R.toLower),
        R.replace(/\s+/g, '')
    )(value)
}

/** Add space between camelCase text. */
export const unCamelCase = (value: string): string =>
    R.pipe(
        R.replace(/([a-z])([A-Z])/g, '$1 $2'),
        // space before last upper in a sequence followed by lower
        R.replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3'),
        // uppercase the first character
        R.replace(/^./, R.toUpper)
    )(value)

/** UPPERCASE first char of each word. */
export const properCase = (value: string): string =>
    R.pipe(R.toLower, R.replace(/^\w|\s\w/g, R.toUpper))(value)

/** CamelCase + UPPERCASE first char */
export const pascalCase = (value: string): string =>
    R.replace(/^[a-z]/, R.toUpper, camelCase(value))

/** UPPERCASE first char of each sentence and lowercase other chars. */
export const sentenceCase = (value: string): string =>
    // Replace first char of each sentence (new line or after '.\s+') to
    R.pipe(R.toLower, R.replace(/(^\w)|\.\s+(\w)/gm, R.toUpper))(value)

/**
 * Convert to lower case, remove accents, remove non-word chars and replace
 * spaces with the specified delimeter. Does not split camelCase text.
 */

export const slugify = (value: string, delimiter = '-'): string => {
    const transformFunc = R.pipe(
        replaceAccents,
        removeNonWord,
        R.trim,
        R.toLower
    )
    return RA.replaceAll(' ', delimiter, transformFunc(value) as string) //.replace(/ +/g, delimiter)
}
/**
 * Replaces spaces with hyphens, split camelCase text, remove non-word chars,
 * remove accents and convert to lower case.
 */
export const hyphenate = (value: string): string =>
    R.pipe(unCamelCase, slugify)(value)

/** Replaces hyphens with spaces. (only hyphens between word chars) */
export const unhyphenate = (value: string): string =>
    R.replace(/(\w)(-)(\w)/g, '$1 $3', value)

/**
 * Replaces spaces with underscores, split camelCase text, remove non-word
 * chars, remove accents and convert to lower case.
 */
export const underscore = (value: string): string =>
    slugify(unCamelCase(value), '_')

/** Remove non-word chars. */
export const removeNonWord = (value: string): string =>
    R.replace(/[^0-9a-zA-ZxC0-xFF -]/g, '', value)

/** Convert line-breaks from DOS/MAC to a single standard (UNIX by default) */
export const normalizeLineBreaks = (value: string, lineEnd = '\n'): string =>
    R.pipe(
        R.replace(/\r\n/g, lineEnd),
        R.replace(/\r/g, lineEnd),
        R.replace(/\n/g, lineEnd)
    )(value)

/** Replaces all accented chars with regular ones */
export const replaceAccents = (value: string): string => {
    // verifies if the String has accents and replace them
    if (value.search(/[\xC0-\xFF]/g) == -1) return value
    return value
        .replace(/[\xC0-\xC5]/g, 'A')
        .replace(/[\xC6]/g, 'AE')
        .replace(/[\xC7]/g, 'C')
        .replace(/[\xC8-\xCB]/g, 'E')
        .replace(/[\xCC-\xCF]/g, 'I')
        .replace(/[\xD0]/g, 'D')
        .replace(/[\xD1]/g, 'N')
        .replace(/[\xD2-\xD6\xD8]/g, 'O')
        .replace(/[\xD9-\xDC]/g, 'U')
        .replace(/[\xDD]/g, 'Y')
        .replace(/[\xDE]/g, 'P')
        .replace(/[\xE0-\xE5]/g, 'a')
        .replace(/[\xE6]/g, 'ae')
        .replace(/[\xE7]/g, 'c')
        .replace(/[\xE8-\xEB]/g, 'e')
        .replace(/[\xEC-\xEF]/g, 'i')
        .replace(/[\xF1]/g, 'n')
        .replace(/[\xF2-\xF6\xF8]/g, 'o')
        .replace(/[\xF9-\xFC]/g, 'u')
        .replace(/[\xFE]/g, 'p')
        .replace(/[\xFD\xFF]/g, 'y')
}

export const truncate = (
    value: string,
    maxChars = 200,
    append = '...',
    onlyFullWords = true
): string => {
    maxChars = onlyFullWords ? maxChars + 1 : maxChars
    value = R.trim(value)
    if (value.length <= maxChars) return value
    value = value.substr(0, maxChars - append.length)
    //crop at last space or remove trailing whitespace
    value = onlyFullWords
        ? value.substr(0, value.lastIndexOf(' '))
        : R.trim(value)
    return `${value}${append}`
}

/**
 * Capture all capital letters following a word boundary (in case the input is
 * in all caps)
 */
export const abbreviate = (value: string): string => {
    if (!value.match(/\b([A-Z])/g)) return value
    return R.join('', value.match(/\b([A-Z])/g) as RegExpMatchArray)
}

/** Escapes special characters in string for regexp */
export const escapeRegExp = (value: string): string | undefined => {
    return value.toString().replace(/[-[/\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}

/** Escapes a string for insertion into HTML. */
export const escapeHtml = (value: string) =>
    R.pipe(
        R.replace(/&/g, '&amp;'),
        R.replace(/</g, '&lt;'),
        R.replace(/>/g, '&gt;'),
        R.replace(/'/g, '&#39;'),
        R.replace(/"/g, '&quot;')
    )(value)

/** Unescapes HTML special chars */
export const unescapeHtml = (value: string): string =>
    R.pipe(
        R.replace(/&amp;/g, '&'),
        R.replace(/&lt;/g, '<'),
        R.replace(/&gt;/g, '>'),
        R.replace(/&#39;/g, "'"),
        R.replace(/&quot;/g, '"')
    )(value)

/** Escape string into unicode sequences */
export function escapeUnicode(
    value: string,
    shouldEscapePrintable = false
): string {
    return value.replace(/[\s\S]/g, function (ch) {
        // skip printable ASCII chars if we should not escape them
        if (!shouldEscapePrintable && /[\x20-\x7E]/.test(ch)) {
            return ch
        }
        // we use "000" and slice(-4) for brevity, need to pad zeros,
        // unicode escape always have 4 chars after "\u"
        return '\\u' + ('000' + ch.charCodeAt(0).toString(16)).slice(-4)
    })
}

/** Remove HTML tags from string. */
export const stripHtmlTags = (value: string): string =>
    R.replace(/<[^>]*>/g, '', value)

/** Remove non-printable ASCII chars */
export const removeNonASCII = (value: string): string =>
    // Matches non-printable ASCII chars -
    // http://en.wikipedia.org/wiki/ASCII#ASCII_printable_characters
    R.replace(/[^\x20-\x7E]/g, '', value)

export const WHITE_SPACES = [
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
