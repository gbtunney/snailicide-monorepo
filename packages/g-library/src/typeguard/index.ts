import { isCSSColorSpecial, isNotCSSColorSpecial } from './../browser/css.js'
import { isParsableToNumeric } from './../number/parse.js'
import {
    isNumeric,
    isNumericFloat,
    isNumericInteger,
    isPossibleNumeric,
    isStringNumeric,
    isTrueNumeric,
    isValidScientificNumber,
} from './../number/validators.js'
import { isZodParsable } from './../zod_helpers/index.js'
import tgJson from './json.typeguards.js'
import * as _tg from './utility.typeguards.js'

/** @namespace Typeguard Functions */
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
