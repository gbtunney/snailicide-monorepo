import { Merge } from 'type-fest'
import { z } from 'zod'
import { basePackage } from './schema.js'
// Zod v4: alias “AnyZodObject” to a permissive ZodObject
type AnyZodObject = z.ZodObject

export type PackageJson<
    Schema extends AnyZodObject = typeof basePackage,
    BaseSchema extends AnyZodObject = typeof basePackage,
> = z.infer<Merge<BaseSchema, Schema>>
export type PackageJsonInput<
    Schema extends AnyZodObject = typeof basePackage,
    BaseSchema extends AnyZodObject = typeof basePackage,
> = z.input<Merge<BaseSchema, Schema>>

const asObjectSchema = <Type extends AnyZodObject = AnyZodObject>(
    schema: Type,
): Type => schema

/** Export the base package.json output type */
export type BasePackage = z.output<typeof basePackage>

/** Return the standard package schema (optionally allow a different base) */
export const packageStandardSchema = (
    baseSchema: AnyZodObject = asObjectSchema(basePackage),
): AnyZodObject => baseSchema

export function isNPMPackage(
    value: z.input<typeof basePackage>,
    custom_schema: AnyZodObject | undefined = undefined,
): value is z.output<typeof basePackage> {
    const base: typeof basePackage = asObjectSchema(basePackage)

    //const merged :AnyZodObject = custom_schema !==undefined? base.extend(z.object({})):base

    //base.extend(z.object({}))

    const extendedSchema =
        custom_schema !== undefined
            ? z.object({
                  ...base.shape,
                  ...custom_schema.shape,
              })
            : base
    return extendedSchema.safeParse(value).success
}

/** ParseNPMPackage overloads */
export function parseNPMPackage(
    value: unknown,
): z.output<typeof basePackage> | undefined
export function parseNPMPackage<SchemaType extends AnyZodObject>(
    value: unknown,
    customSchema: SchemaType,
    showError?: boolean | 'safe',
    passThrough?: boolean,
): z.output<SchemaType> | undefined
export function parseNPMPackage(
    value: unknown,
    customSchema: AnyZodObject | undefined = undefined,
    showError: boolean | 'safe' = 'safe',
    passThrough: boolean = true,
): unknown {
    const base = asObjectSchema(basePackage)

    let merged: z.ZodObject =
        customSchema !== undefined
            ? z.object({
                  ...base.shape,
                  ...customSchema.shape,
              })
            : base

    if (passThrough) merged = merged.loose()

    const result = merged.safeParse(value)
    if (!result.success) {
        if (showError === 'safe') console.log(result.error)
        if (showError === true) merged.parse(value) // throw with detailed error
        return undefined
    }
    return result.data
}

export default isNPMPackage
