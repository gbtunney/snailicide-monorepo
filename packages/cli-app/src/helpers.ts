import { z } from 'zod'

export type ZodObjectSchema = z.AnyZodObject | z.ZodEffects<z.AnyZodObject>
export type WrappedSchema<Schema extends ZodObjectSchema> =
    Schema extends ZodObjectSchema ? Schema : never
export const wrapSchema = <Schema extends ZodObjectSchema>(
    schema: Schema,
): Schema => {
    return schema
}

export const tgZodSchema = <Schema extends z.ZodSchema<unknown>>(
    schema: Schema,
    value: unknown,
): value is z.infer<Schema> => schema.safeParse(value).success

export const getZodType = (dschema: z.ZodTypeAny): string | undefined => {
    // @ts-expect-error todo: FIX THIS AT some pt
    if (dschema instanceof z.ZodEffects<unknown>) {
        if (dschema.innerType() instanceof z.ZodEffects) {
            //todo: figure out how to type this maybe?
            const _inner = dschema.innerType()
            if (_inner['_def'] && _inner['_def']['schema']) {
                return getZodType(_inner['_def']['schema']) // recursive ZodEffect
            }
        } else {
            return getZodType(dschema.innerType())
        }
        return 'ERROR-ZODEFFECTS'
    }
    if (dschema instanceof z.ZodDefault) {
        if (!('_def' in dschema)) return undefined // error
        if (!('defaultValue' in dschema._def)) return undefined // error
        return getZodType(dschema['_def']['innerType'])
    }
    if (dschema instanceof z.ZodArray) {
        if (!('_def' in dschema)) return undefined // error
        if (!('type' in dschema._def)) return undefined // error
        return 'array'
    }
    if (dschema instanceof z.ZodString) return 'string'
    if (dschema instanceof z.ZodNumber || dschema instanceof z.ZodBigInt)
        return 'number'
    if (dschema instanceof z.ZodBoolean) return 'boolean'
    if (dschema instanceof z.ZodNull) return 'null'
    return undefined
}

const ansiRegex = ({ onlyFirst = false } = {}): RegExp => {
    const pattern = [
        '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)',
        '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-nq-uy=><~]))',
    ].join('|')

    return new RegExp(pattern, onlyFirst ? undefined : 'g')
}

export const removeAnsi = (value: string): string =>
    value.replace(ansiRegex(), '')

export const swapKeysAndValues = (
    obj: Record<string, string>,
): Record<string, string> => {
    const result: Record<string, string> = Array.from(
        Object.entries(obj),
    ).reduce<Record<string, string>>((acc, [key, value]) => {
        return {
            ...acc,
            [value]: key,
        }
    }, {})
    return result
}
