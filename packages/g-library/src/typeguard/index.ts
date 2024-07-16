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
import tg_json from './json.typeguards.js'
import * as _tg from './utility.typeguards.js'

export const tg = {
    ..._tg,
    ...tg_json,
    isZodParsable,
    isCSSColorSpecial,
    isNotCSSColorSpecial,

    isPossibleNumeric,
    isParsableToNumeric,
    isTrueNumeric,
    isNumeric,
    isNumericFloat,
    isNumericInteger,
    isValidScientificNumber,
    isStringNumeric,
}
export default tg
