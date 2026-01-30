// jsonStringified.ts
import { Jsonifiable } from 'type-fest'
import { z } from 'zod'

export type ZJsonValue =
    | string
    | number
    | boolean
    | null
    | Array<ZJsonValue>
    | { [key: string]: ZJsonValue }

export type JsonStringified<Type> = string & { readonly __json_of: Type }

/** Input value type for serialization (raw object value). This is BEFORE JSON.stringify. */
export type InferJsonSchemaInput<TStringifiedSchema> =
    TStringifiedSchema extends { inputValue(input: any): infer In } ? In : never

/** Output value type (after deserialization back to object). */
export type InferStringifiedOutput<TStringifiedSchema> =
    TStringifiedSchema extends { outputValue(output: any): infer Out }
        ? Out
        : never

export type JsonStringifiedAPI<TSchema extends z.ZodType> = {
    serialize(value: z.output<TSchema>): JsonStringified<z.output<TSchema>>
    deserialize(raw: JsonStringified<z.output<TSchema>>): z.output<TSchema>
    parseToValue(raw: string): z.output<TSchema>
    outputValue(output: z.output<TSchema>): z.output<TSchema>
    inputValue(input: z.input<TSchema>): z.input<TSchema>
    validate(raw: string | z.input<TSchema>): boolean
}

export type JsonStringifiedSchema<TSchema extends z.ZodType> = z.ZodType<
    JsonStringified<z.infer<TSchema>>,
    string
> &
    JsonStringifiedAPI<TSchema>

/** WIP @todo - some other day */
export const jsonLooseCodec = <
    TSchema extends z.ZodType<Exclude<Jsonifiable, null | number | boolean>>,
>(
    schema: TSchema,
): z.ZodType<z.output<TSchema> | string> => {
    const jsonStringSchema = z.string().brand('JsonEncoded')
    type BrandedString = z.infer<typeof jsonStringSchema>

    const userSchema = schema.brand('Jsonifiable')
    type BrandedSchema = z.input<typeof userSchema>

    const JsonCodec: z.ZodType<
        z.infer<TSchema>,
        z.input<typeof jsonStringSchema>
    > = z.codec(jsonStringSchema, userSchema, {
        decode: (
            jsonString: BrandedString,
            ctx,
        ): z.input<typeof userSchema> => {
            try {
                const _data = JSON.parse(jsonString) as z.input<
                    typeof userSchema
                >
                const myresult: z.output<typeof userSchema> =
                    userSchema.parse(_data)
                return _data
            } catch (err: any) {
                ctx.issues.push({
                    code: 'invalid_format',
                    format: 'json',
                    input: jsonString,
                    message: err?.message ?? 'Invalid JSON',
                })
                return z.NEVER
            }
        },
        encode: (
            value: BrandedSchema,
            ctx,
        ): z.infer<typeof jsonStringSchema> => {
            try {
                const parseResult = userSchema.parse(value)
                return JSON.stringify(value) as z.infer<typeof jsonStringSchema>
            } catch (err: unknown) {
                ctx.issues.push({
                    code: 'invalid_format',
                    format: 'json',
                    input: 'fff',
                    // input:// value.toString(),
                    message: 'Data could not be encoded to JSON',
                })
                return z.NEVER
            }
        },
    })

    // Allow both JSON string and raw object
    const _result: z.ZodType<z.output<typeof userSchema> | string> = z.union([
        JsonCodec,
        schema,
    ])
    return _result //z.union([JsonCodec, schema]) //.transform(val => val);
}

export const makeJsonStringifiedSchema = <TSchema extends z.ZodType>(
    schema: TSchema,
): JsonStringifiedSchema<TSchema> => {
    type Output = z.infer<TSchema>
    type Input = z.input<TSchema>

    const base = z.string().superRefine((raw, ctx) => {
        let parsed: unknown

        try {
            parsed = JSON.parse(raw)
        } catch {
            ctx.addIssue({
                code: 'custom', // <-- Zod v4
                message: 'Value is not valid JSON',
            })
            return
        }
        const result = schema.safeParse(parsed)
        if (!result.success) {
            ctx.addIssue({
                code: 'custom', // <-- Zod v4
                message: 'Parsed JSON does not match schema',
                path: result.error.issues[0]?.path ?? [],
            })
        }
    })

    const brandedSchema: z.ZodType<
        JsonStringified<Output>,
        z.infer<typeof base>
    > = base.transform(
        (s): JsonStringified<Output> => s as JsonStringified<Output>,
    )
    const _api: JsonStringifiedAPI<TSchema> = {
        deserialize(raw: JsonStringified<Output>): Output {
            return schema.parse(JSON.parse(raw))
        },

        inputValue(input: Input): Input {
            return input
        },

        outputValue(output: Output): Output {
            return output
        },
        parseToValue(raw: string): Output {
            const branded = brandedSchema.parse(raw)
            return this.deserialize(branded)
        },
        serialize(value: Output): JsonStringified<Output> {
            return JSON.stringify(value) as JsonStringified<Output>
        },
        validate(raw: string | Input): boolean {
            try {
                if (typeof raw === 'string') {
                    this.parseToValue(raw)
                } else {
                    schema.parse(raw)
                }
                return true
            } catch {
                return false
            }
        },
    }
    const _result: z.ZodType<JsonStringified<z.infer<TSchema>>, string> &
        JsonStringifiedAPI<TSchema> = Object.assign(brandedSchema, _api)
    return _result
}
export const jsonParser = <TSchema extends z.ZodType = z.ZodJSONSchema>(
    schema?: TSchema,
): JsonStringifiedSchema<TSchema> => {
    const _schema: TSchema =
        schema === undefined ? (z.json() as unknown as TSchema) : schema
    return makeJsonStringifiedSchema<TSchema>(_schema)
}
export const jsonStringified = <TSchema extends z.ZodType>(
    schema: TSchema,
): JsonStringifiedSchema<TSchema> => makeJsonStringifiedSchema(schema)
