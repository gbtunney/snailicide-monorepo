import { isCSSColorSpecial, isNotCSSColorSpecial } from './../browser/css.js'
import {
    isParsableToNumeric,
    isPossibleNumeric,
    isTrueNumeric,
} from './../number/typeguards.js'
import {
    isNumeric,
    isNumericFloat,
    isNumericInteger,
    isStringNumeric,
    isValidScientificNumber,
} from './../number/validators.js'
import { isZodParsable } from './../zod_helpers/index.js'
import tgJson from './json.typeguards.js'
import * as _tg from './utility.typeguards.js'

export const tg = {
    ..._tg,
    ...tgJson,
    isCSSColorSpecial,
    isNotCSSColorSpecial,
    isNumeric,
    isNumericFloat,
    isNumericInteger,
    isParsableToNumeric,
    isPossibleNumeric,
    isStringNumeric,
    isTrueNumeric,
    isValidScientificNumber,
    isZodParsable,
}
export default tg
