import tg_json from './json.typeguards.js'
import { isZodParsable } from './../zod_helpers/index.js'
import { isCSSColorSpecial, isNotCSSColorSpecial } from './../browser/css.js'
import {
    isNumeric,
    isNumericFloat,
    isNumericInteger,
} from './../number/numeric.js'

import * as _tg from './utility.typeguards.js'

export const tg = {
    ..._tg,
    ...tg_json,
    isZodParsable,
    isCSSColorSpecial,
    isNotCSSColorSpecial,
    isNumeric,
    isNumericInteger,
    isNumericFloat,
}
export default tg
