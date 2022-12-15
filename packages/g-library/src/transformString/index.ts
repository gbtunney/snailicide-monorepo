/* * TRANSFORM STRING LIBRARY *
 * @author Gillian Tunney */
export { batchReplaceAll as replaceCharacters } from './_replaceCharacters.js'

export {
    trimCharacters,
    batchTrimCharacters,
    trimCharactersStart,
    trimCharactersEnd,
    getRegExpMatchStartOfString,
    getRegExpMatchEndOfString,
} from './_trimCharacters.js'

export {
    validateString,
    validateStringBatch,
    startsWith,
    endsWith,
    includes,
    eq,
    contains,
    match,
} from './_validateString.js'
export {
    transformExplodeArray,
    explodeCSSClassString,
} from './_transformExplodeArray.js'
