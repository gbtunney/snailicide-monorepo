import z from 'zod'
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
    schema: Schema extends z.ZodSchema ? Schema : never,
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
    schema: Schema extends z.ZodSchema ? Schema : never,
): value is z.infer<typeof schema> => {
    return schema.safeParse(value).success
}

export const parseFactory =
    <T extends z.ZodTypeAny>(schema: T) =>
    (data: unknown): z.infer<T> => {
        try {
            return schema.parse(data)
        } catch (err) {
            // handle error
            throw new Error()
        }
    }
