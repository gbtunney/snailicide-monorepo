import z from 'zod'

import { ensureArray, numeric, resolveRegExpSchema } from './schemas.js'
export const schemaForType =
    <T>() =>
    <S extends z.ZodType<T, any, any>>(arg: S) => {
        return arg
    }

/** So that it doesnt lose its schema typing after a transform or merge function */
export const wrapSchema = <T extends z.Schema<any>>(schema: T): T => {
    return schema
}
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
export const parseZodData = <S extends z.ZodSchema>(
    value: unknown,
    schema: S,
): z.infer<S> | undefined => {
    return isZodParsable<S>(value, schema) ? schema.parse(value) : undefined
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
export const isZodParsable = <S extends z.ZodSchema>(
    value: unknown,
    schema: S,
): value is z.infer<S> => {
    return schema.safeParse(value).success
}

export const parseFactory =
    <T extends z.ZodTypeAny>(schema: T) =>
    (data: unknown): z.infer<T> | undefined => {
        if (isZodParsable<T>(data, schema)) {
            return schema.parse(data)
        }
        return undefined
    }

export const zodHelpers = {
    schemaForType,
    wrapSchema,
    isZodParsable,
    parseZodData,
    parseFactory,
    ensureArray,
    numeric,
    resolveRegExpSchema,
}
export default zodHelpers
