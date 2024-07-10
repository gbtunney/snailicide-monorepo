import tg_json from './json.typeguards.js'
import { isZodParsable } from './../zod_helpers/index.js'
import { isCSSColorSpecial, isNotCSSColorSpecial } from './../browser/css.js'
import {
    isNumeric,
    isNumericFloat,
    isNumericInteger,
    isValidScientificNumber,
    isStringNumeric,
} from './../number/validators.js'
import {
    isParsableToNumeric,
    isTrueNumeric,
    isPossibleNumeric,
} from './../number/typeguards.js'
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
