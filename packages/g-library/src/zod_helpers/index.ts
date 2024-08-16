import z from 'zod'
import { ensureArray, numeric, resolveRegExpSchema } from './schemas.js'
export const schemaForType =
    <Type>() =>
    <Schema extends z.ZodType<Type, any, any>>(arg: Schema): Schema => {
        return arg
    }

/** So that it doesnt lose its schema typing after a transform or merge function */
export const wrapSchema = <Schema extends z.Schema>(schema: Schema): Schema => {
    return schema
}
/**
 * Get zod data typed
 *
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
 */
export const parseZodData = <Schema extends z.ZodSchema>(
    value: unknown,
    schema: Schema,
): z.infer<Schema> | undefined => {
    return isZodParsable<Schema>(value, schema)
        ? schema.parse(value)
        : undefined
}
/**
 * Guard function to determine if value is parseable according to schema
 *
 * @category Typeguard
 * @example
 *     tg_Zod( z.object({
 *     prop1: z.string(),
 *     prop2: z.number().int(),
 *     },{
 *     prop1: 'i am a string',
 *     prop2: 2,
 *     } )
 *     => true
 */
export const isZodParsable = <Schema extends z.ZodSchema>(
    value: unknown,
    schema: Schema,
): value is z.infer<Schema> => {
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

/** @namespace This file contains utility functions for zod */
export const zodHelpers = {
    ensureArray,
    isZodParsable,
    numeric,
    parseFactory,
    parseZodData,
    resolveRegExpSchema,
    schemaForType,
    wrapSchema,
}
export default zodHelpers
export type { ZodRegExp } from './schemas.js'
