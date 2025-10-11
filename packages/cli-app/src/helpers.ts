import { MergeExclusive } from 'type-fest'
import { z } from 'zod'
import util from 'node:util'
import { getLogger } from './logger.js'
// Example: Refactor sichema merging
export type ZodObjectSchema = z.ZodObject //| z.ZodType<z.ZodObject>  //| z.ZodEffects<z.AnyZodObject>
export type WrappedSchema<Schema extends ZodObjectSchema> =
    Schema extends ZodObjectSchema ? Schema : never
// Detect effects (transform/refine/preprocess)

export const wrapSchema = <Schema extends ZodObjectSchema>(
    schema: Schema,
): Schema => {
    return wrapAnyZodSchema<Schema>(schema)
}
export const wrapAnyZodSchema = <Schema extends z.ZodType>(
    schema: Schema,
): Schema => {
    return schema
}
export const mergeSchemas = <
    Schema1 extends z.ZodObject,
    Schema2 extends z.ZodObject,
>(
    schemaA: Schema1,
    schemaB: Schema2,
): MergedSchemas<Schema1, Schema2> => {
    const _merged: MergedSchemas<Schema1, Schema2> = z.object({
        ...schemaA.shape,
        ...schemaB.shape,
    })
    return _merged
}

export type MergedSchemas<
    SchemaA extends z.ZodObject,
    SchemaB extends z.ZodObject,
> = z.ZodObject<MergeExclusive<SchemaA['shape'], SchemaB['shape']>>

export const getDefaultValue = <Schema extends z.ZodType>(
    schema: Schema,
): z.infer<Schema> | undefined => {
    const _parsed = schema.safeParse(undefined)
    if (_parsed.success) {
        return _parsed.data
    }
    return undefined
}

export const tgZodSchema = <Schema extends z.ZodType>(
    schema: Schema,
    value: unknown,
): value is Schema => schema.safeParse(value).success

/** Get the inner schema of an array (e.g., z.array(z.number()) -> z.number()) */
export const getArrayElementSchema = <Schema extends z.ZodType>(
    schema: Schema,
): z.ZodType | undefined => {
    const base = getValueSchema(schema)
    return base instanceof z.ZodArray && base.element
        ? wrapAnyZodSchema(base.element as z.ZodType)
        : undefined
}

export const isOptionalType = (schema: z.ZodType): boolean => {
    return schema.safeParse(undefined).success
}

export const isRequiredStrict = (schema: z.ZodType): boolean => {
    return !isOptionalType(schema) && getDefaultValue(schema) !== undefined
}

type WithUnwrap = { unwrap: () => z.ZodType }
type WithInnerType = { innerType: () => z.ZodType }
type WithRemoveDefault = { removeDefault: () => z.ZodType }

const hasUnwrap = (s: unknown): s is z.ZodType & WithUnwrap =>
    typeof (s as any)?.unwrap === 'function'
const hasInnerType = (s: unknown): s is z.ZodType & WithInnerType =>
    typeof (s as any)?.innerType === 'function'
const hasRemoveDefault = (s: unknown): s is z.ZodType & WithRemoveDefault =>
    typeof (s as any)?.removeDefault === 'function'

/** Container is a schema that contains other schemas, like array,object,record,set,map,tuple */
export const hasContainer = <Schema extends z.ZodType>(
    schema: Schema,
): boolean =>
    schema instanceof z.ZodArray ||
    schema instanceof z.ZodObject ||
    schema instanceof z.ZodRecord ||
    schema instanceof z.ZodSet ||
    schema instanceof z.ZodMap ||
    schema instanceof z.ZodTuple

export const hasDefaultValueSet = <Schema extends z.ZodType>(
    schema: Schema,
): boolean => {
    return (
        hasUnwrap(schema) &&
        hasRemoveDefault(schema) &&
        getDefaultValue(schema) !== undefined
    )
}
export const hasZodWrapper = <Schema extends z.ZodType>(
    schema: Schema,
): boolean => schema instanceof z.ZodDefault || schema instanceof z.ZodOptional

/** Very simple recursive unwrapping: unwrap → removeDefault → innerType */
export const getValueSchema = <Schema extends z.ZodType>(
    schema: Schema,
    unwrapContainers: boolean = false,
): z.ZodType => {
    const current: z.ZodType = wrapAnyZodSchema<Schema>(schema)

    if (current instanceof z.ZodPipe) {
        /** .type */
        const _outputType = current._zod.def.out._zod.def
        const _inputType = current._zod.def.in._zod.def
            ? current._zod.def.in._zod.def
            : undefined

        if (!_outputType) {
            getLogger().warn(
                `no output detected in pipe; this may cause unexpected behavior.`,
            )
        } else if (_outputType.type === 'transform') {
            getLogger().info(
                prettify`zod pipe TRANSFORM detected; unwrapping output:[${_outputType.type}] input:[${_inputType?.type}]`,
            )

            if (_inputType?.type !== 'transform') {
                getLogger().debug(
                    prettify`TRANSFORM outtype detected; ATTEMPTING TO SUBSTITUTE INPUT input:[${_inputType?.type}]`,
                )

                //attempt to coerce inner type ( STUPID ZOD)
                const myNewType: z.ZodType | undefined = (
                    _inputType as unknown as Record<string, unknown>
                )['innerType']
                    ? ((_inputType as unknown as Record<string, unknown>)[
                          'innerType'
                      ] as z.ZodType)
                    : undefined
                if (myNewType) {
                    getLogger().debug(
                        prettify`SUBSTITUTE SUCESS ${myNewType?.type} hasUnwrap: ${hasUnwrap(myNewType)} hasRemoveDefault:${hasRemoveDefault(myNewType)} hasInnerType:${hasInnerType(myNewType)}`,
                    )
                    return getValueSchema(myNewType, unwrapContainers)
                }
            }
        } else {
            getLogger().info(
                prettify`zod pipe detected; unwrapping output:[${_outputType.type}] input:[${_inputType?.type}]`,
            )
            return getValueSchema(_outputType as z.ZodType, unwrapContainers)
        }
    }

    if (!unwrapContainers && hasContainer(current)) {
        return current
    }

    // getLogger().debug(`${current.type} hasUnwrap: ${hasUnwrap(current)} hasRemoveDefault:${hasRemoveDefault(current)} hasInnerType:${hasInnerType(current)}`)
    if (hasUnwrap(current)) {
        return getValueSchema(current.unwrap(), unwrapContainers)
    }
    if (hasRemoveDefault(current)) {
        return getValueSchema(current.removeDefault(), unwrapContainers)
    }
    if (hasInnerType(current)) {
        return getValueSchema(current.innerType(), unwrapContainers)
    }
    return current
}

export type PrettyPrintOptions = {
    depth?: number
    colors?: boolean
    compact?: boolean | number
    maxArrayLength?: number
    breakLength?: number
    sorted?: boolean | ((a: string, b: string) => number)
}

/** Format any unknown into a readable string (safe for logs) */
export const formatValue = (
    value: unknown,
    opts?: PrettyPrintOptions,
): string => {
    switch (typeof value) {
        case 'string':
            return value
        case 'number':
        case 'boolean':
            return String(value)
        case 'bigint':
            return `${value.toString()}n`
        case 'symbol':
            return value.toString()
        case 'function':
            return value.name ? `[Function ${value.name}]` : '[Function]'
        case 'undefined':
            return 'undefined'
        case 'object':
            if (value === null) return 'null'
            if (value instanceof Error)
                return value.stack ?? `${value.name}: ${value.message}`
            try {
                return util.inspect(value, {
                    breakLength: opts?.breakLength ?? 120,
                    colors: opts?.colors ?? process.stdout.isTTY,
                    compact: opts?.compact ?? 2,
                    depth: opts?.depth ?? 4,
                    maxArrayLength: opts?.maxArrayLength ?? 100,
                    sorted: opts?.sorted ?? true,
                })
            } catch {
                return '[Uninspectable Object]'
            }
        default:
            return String(value)
    }
}

/** Join many unknowns into a single formatted string */
export const formatArgs = (
    delimiter: string = '',
    ...vals: Array<unknown>
): string => vals.map((v) => formatValue(v)).join(delimiter)

/** Tagged template: safely interpolate unknowns */
export const prettify = (
    strings: TemplateStringsArray,
    ...values: Array<unknown>
): string =>
    strings.reduce((accumulated, chunk, index) => {
        const interpolated =
            index < values.length ? formatValue(values[index]) : ''
        return accumulated + chunk + interpolated
    }, '')

/** @deprecated Use fmt */
export const pp = prettify
