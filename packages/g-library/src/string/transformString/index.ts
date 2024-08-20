export { batchReplaceAll as replaceCharacters } from './replace-characters.js'

export {
    explodeCSSClassString,
    transformExplodeArray,
} from './transform-explode-array.js'

export {
    batchTrimCharacters,
    trimCharacters,
    trimCharactersEnd,
    trimCharactersStart,
} from './trim-characters.js'

export type {
    BaseValue,
    BatchBaseValue,
    Pattern,
    ReplaceCharacters,
    TrimCharacters,
} from './type.js'

/* * TRANSFORM STRING LIBRARY *
 * @author Gillian Tunney */
export type { ValidateFunc, ValidateOperation } from './validate-string.js'
export {
    contains,
    endsWith,
    eq,
    includes,
    match,
    startsWith,
    validateString,
    validateStringBatch,
} from './validate-string.js'
