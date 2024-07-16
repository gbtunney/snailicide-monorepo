import { ensureArray as R_ensureArray, isNotString } from 'ramda-adjunct'
import z, { ZodArray, ZodEffects, ZodUnion } from 'zod'

import { Numeric } from '../number/numeric'
import { toNumeric } from '../number/transform.js'
import { isPossibleNumeric } from '../number/typeguards.js'
import { isStringValidRegExp } from '../regexp/validators.js'
import { isRegExp, isString } from '../typeguard/utility.typeguards.js'

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
export const resolveRegExpSchema = z
    .union([z.string(), z.instanceof(RegExp)])
    .refine((value) => {
        return isRegExp(value) ? true : isStringValidRegExp(value)
    }, 'Please provide a valid regular expression.')
    .transform((value) => {
        const reg: RegExp =
            isString(value) && isStringValidRegExp(value)
                ? new RegExp(value)
                : value
    })

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

export const ensureArray = <T extends z.ZodTypeAny>(
    schema: T,
): ZodEffects<ZodUnion<[ZodArray<T, 'many'>, T]>, T['_output'][]> => {
    const union: ZodEffects<
        ZodUnion<[ZodArray<T, 'many'>, T]>,
        T['_output'][]
    > = z
        .union([z.array(schema), schema])
        .transform((value): z.infer<ZodArray<typeof schema, 'many'>> => {
            return R_ensureArray<typeof schema>(value)
        })

    return union
}

//TODO: finish this
export const numeric = <T extends z.ZodTypeAny>(schema: T) =>
    z
        .union([z.string(), z.number(), z.bigint()])
        .refine(
            (value) => isPossibleNumeric(value),
            'Please enter a valid number|bigint|string',
        )
        .transform((value): bigint | number | undefined => {
            const _value: Numeric | undefined = toNumeric<typeof value>(value)
            if (_value !== undefined && isNotString(_value)) {
                return _value
            }
            return undefined
        })

export const zodHelpers = {
    schemaForType,
    wrapSchema,
    isZodParsable,
    parseZodData,
    parseFactory,
}
export default zodHelpers
