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

const asObjectSchema = (schema: unknown): AnyZodObject => schema as AnyZodObject

/** Export the base package.json output type */
export type BasePackage = z.output<typeof basePackage>

/** Return the standard package schema (optionally allow a different base) */
export const packageStandardSchema = (
    baseSchema: AnyZodObject = asObjectSchema(basePackage),
): AnyZodObject => baseSchema

/** IsNPMPackage overloads */
export function isNPMPackage(
    value: unknown,
): value is z.output<typeof basePackage>
export function isNPMPackage<SchemaType extends AnyZodObject>(
    value: unknown,
    customSchema: SchemaType,
    showError?: boolean | 'safe',
    passThrough?: boolean,
): value is z.output<SchemaType>
export function isNPMPackage(
    value: unknown,
    customSchema?: AnyZodObject,
    showError: boolean | 'safe' = false,
    passThrough: boolean = true,
): boolean {
    const base = asObjectSchema(basePackage)
    let merged = customSchema ? base.extend(customSchema) : base
    if (passThrough) merged = merged.loose()

    const result = merged.safeParse(value)
    if (showError === 'safe' && !result.success) console.log(result.error)
    if (showError === true && !result.success) merged.parse(value) // will throw

    return result.success
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
    let merged = customSchema !== undefined ? base.extend(customSchema) : base
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
