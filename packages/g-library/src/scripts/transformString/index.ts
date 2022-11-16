/* * TRANSFORM STRING LIBRARY *
 * @author Gillian Tunney */
export { batchReplaceAll as replaceCharacters } from './_replaceCharacters'

export {
    trimCharacters,
    batchTrimCharacters,
    trimCharactersStart,
    trimCharactersEnd,
    getRegMatchStartOfString,
    getRegMatchEndOfString,
} from './_trimCharacters'

export {
    validateString,
    validateStringBatch,
    startsWith,
    endsWith,
    includes,
    eq,
    contains,
    match,
} from './_validateString'
export {
    transformExplodeArray,
    explodeCSSClassString,
} from './_transformExplodeArray'
