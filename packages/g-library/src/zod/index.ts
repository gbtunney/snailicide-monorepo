import { z, ZodString } from 'zod'
import { validSemVer } from './../npm/index.js'
import { isNotUndefined } from './../typeguard/utility.typeguards.js'
/* * CUSTOM ZOD UTILITIES!! * */

export const optionalDefault = <Type extends z.ZodType>(
    value: Type,
    _value: z.infer<Type>
) => {
    return z.union([value.default(_value), value.optional()])
}

export const semVer = (useDefault: undefined | string = undefined) => {
    const semVerType = z.string().regex(validSemVer)
    return isNotUndefined(useDefault)
        ? optionalDefault(semVerType, useDefault)
        : semVerType
}
/* * ZOD * */
export type Zod = typeof z & {
    optionalDefault: typeof optionalDefault
    semVer: typeof semVer
}
export const zod: Zod = { ...z, optionalDefault, semVer }
export default zod

export const validateZodType = <Schema extends z.ZodSchema>(
    value: z.infer<Schema>,
    schema: Schema
): value is z.infer<typeof schema> => {
    return schema.safeParse(value).success
}

export const tg_Zod = <Type = unknown, Schema = z.ZodSchema>(
    value: Type,
    schema: Schema extends z.ZodSchema ? Schema : never
): value is z.infer<typeof schema> => {
    return schema.safeParse(value).success
}
