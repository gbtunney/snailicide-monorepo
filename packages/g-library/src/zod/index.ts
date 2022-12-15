import { z, ZodString } from 'zod'
import { validSemVer } from './../npm/index.js'
import { node } from './../node/index.js'
import { isNotUndefined } from './../typeguard/utility.typeguards.js'
import path from 'path'
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

const normalizePath = (value: string) => path.normalize(path.resolve(value))

export const filePathExists = z
    .string()
    .refine((val) => node.doesFileExist(val), {
        message: 'File path already exists',
    })
    .transform(normalizePath)

export const filePathDoesNotExist = z
    .string()
    .refine((val) => !node.doesFileExist(val), {
        message: 'File path already exists',
    })
    .transform(normalizePath)

export const filePath = z.string().transform(normalizePath)

/* * ZOD * */
export type Zod = typeof z & {
    optionalDefault: typeof optionalDefault
    semVer: typeof semVer
    filePath: typeof filePath
    filePathExists: typeof filePathExists
    filePathDoesNotExist: typeof filePathDoesNotExist
}
export const zod: Zod = {
    ...z,
    optionalDefault,
    semVer,
    filePath,
    filePathExists,
    filePathDoesNotExist,
}
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
