import type { Merge } from 'type-fest'
import { z } from 'zod'

import { basePackage } from './schema.js'

const wrapSchema = <T extends z.Schema<any>>(schema: T): T => {
    return schema
}

export const packageStandardSchema = (
    base_schema: z.AnyZodObject = basePackage,
): typeof base_schema => {
    return wrapSchema<z.AnyZodObject>(base_schema)
}
export type BasePackage = z.infer<typeof basePackage>
export type PackageJson<
    Schema extends z.AnyZodObject = typeof basePackage,
    BaseSchema extends z.AnyZodObject = typeof basePackage,
> = z.infer<Merge<BaseSchema, Schema>>
export type PackageJsonInput<
    Schema extends z.AnyZodObject = typeof basePackage,
    BaseSchema extends z.AnyZodObject = typeof basePackage,
> = z.input<Merge<BaseSchema, Schema>>

export const parseNPMPackage = <
    Schema extends z.AnyZodObject,
    BaseSchema extends z.AnyZodObject = typeof basePackage,
>(
    value: unknown,
    custom_schema: Schema | undefined = undefined,
    show_error: boolean | 'safe' = 'safe',
    passThrough: boolean = true,
): PackageJson<Schema, BaseSchema> | undefined => {
    const base_schema = wrapSchema<z.AnyZodObject>(basePackage)
    const mergedSchema =
        custom_schema !== undefined
            ? base_schema.merge(custom_schema)
            : base_schema.merge(base_schema)

    if (!isNPMPackage(value, mergedSchema) && show_error !== false) {
        isNPMPackage(value, mergedSchema, show_error)
    }
    return mergedSchema.safeParse(value).success
        ? mergedSchema.parse(value)
        : undefined
}
export const isNPMPackage = <
    Schema extends z.AnyZodObject,
    BaseSchema extends z.AnyZodObject = typeof basePackage,
>(
    value: unknown,
    custom_schema: Schema | undefined = undefined,
    show_error: boolean | 'safe' = false,
    passthru: boolean = true,
): value is PackageJson<Schema, BaseSchema> | undefined => {
    const base_schema = wrapSchema<z.AnyZodObject>(basePackage)
    const mergedSchema =
        custom_schema !== undefined
            ? passthru === true
                ? base_schema.merge(custom_schema).passthrough()
                : base_schema.merge(custom_schema)
            : passthru === true
              ? base_schema.merge(base_schema).passthrough()
              : base_schema.merge(base_schema)

    if (show_error === 'safe' && !mergedSchema.safeParse(value).success) {
        console.log(mergedSchema.safeParse(value).error)
    }
    if (show_error === true && !mergedSchema.safeParse(value).success) {
        mergedSchema.parse(value)
    }
    return mergedSchema.safeParse(value).success
}

export default isNPMPackage
