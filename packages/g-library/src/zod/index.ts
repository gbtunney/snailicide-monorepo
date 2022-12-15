import { z } from 'zod'
import path from 'path'
import { validSemVer } from './../npm/index.js'
import { node } from './../node/index.js'
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

/**
 * Get zod data typed
 *
 * @category Zod
 * @example
 *     getZodData( z.object({
 *     prop1: z.string(),
 *     prop2: z.number().int(),
 *     },{
 *     prop1: 'i am a string',
 *     prop2: 2,
 *     prop3: 3
 *     } )
 *     => {
 *     prop1: 'i am a string',
 *     prop2: 2
 *     }
 *
 * @template {z.ZodSchema} Schema
 * @function getZodData
 * @param {unknown} value - Z.infer<typeof schema>
 * @param {Schema} schema - Zod schema to use
 * @returns {unknown} Z.infer<typeof schema>
 */
export const getZodData = <Schema = z.ZodSchema>(
    value: Schema extends z.ZodSchema ? z.infer<Schema> : never,
    schema: Schema extends z.ZodSchema ? Schema : never
): z.infer<typeof schema> => {
    return tg_Zod(value, schema) ? schema.parse(value) : undefined
}

/**
 * Guard function to determine if value is parseable according to schema
 *
 * @category Zod
 * @category TypeGuard
 * @example
 *     tg_Zod( z.object({
 *     prop1: z.string(),
 *     prop2: z.number().int(),
 *     },{
 *     prop1: 'i am a string',
 *     prop2: 2,
 *     } )
 *     => true
 *
 * @template {unknown} Type
 * @template {z.ZodSchema} Schema
 * @function tg_Zod
 * @param {Type} value - Value to test
 * @param {Schema} schema - Zod schema to use
 * @returns {boolean}
 */
export const tg_Zod = <Type = unknown, Schema = z.ZodSchema>(
    value: Type,
    schema: Schema extends z.ZodSchema ? Schema : never
): value is z.infer<typeof schema> => {
    return schema.safeParse(value).success
}
