// @ts-expect-error no definitions
import { vsprintf } from 'format'
import z from 'zod'

import { ensureArray } from '../zod_helpers/schemas.js'

export const formatString = (
    value: string,
    args: string | string[],
): string => {
    const _vars = ensureArray(z.string()).parse(args)
    return vsprintf(value, _vars)
}
