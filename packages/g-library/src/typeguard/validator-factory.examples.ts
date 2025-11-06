import { factoryValidator } from './validator-factory.js'
import {
    bigintNumber,
    binaryNumber,
    hexNumber,
    scientificNumber,
} from '../regexp/dictionary.js'

/** String type guards backed by regex dictionary */
const isScientificString = (v: unknown): v is string =>
    typeof v === 'string' && scientificNumber.test(v)

const isHexString = (v: unknown): v is string =>
    typeof v === 'string' && hexNumber.test(v)

const isBinaryString = (v: unknown): v is string =>
    typeof v === 'string' && binaryNumber.test(v)

const isBigIntLiteralString = (v: unknown): v is string =>
    typeof v === 'string' && bigintNumber.test(v)

// Create paired validators
export const { isNotScientificNumber, isScientificNumber } = factoryValidator(
    isScientificString,
    'scientificNumber',
)

export const { isHexNumber, isNotHexNumber } = factoryValidator(
    isHexString,
    'hexNumber',
)

export const { isBinaryNumber, isNotBinaryNumber } = factoryValidator(
    isBinaryString,
    'binaryNumber',
)

export const { isBigIntLiteral, isNotBigIntLiteral } = factoryValidator(
    isBigIntLiteralString,
    'bigIntLiteral',
)
