import { stringUtils } from '@snailicide/g-library'
import { zod } from '@snailicide/g-library/node'
import { z } from 'zod'

export type AppOptions = z.infer<typeof app_schema>
export type unResolvedAppOptions = z.input<typeof app_schema>
export type ResolvedAppOptions = z.output<typeof app_schema>
export type AppAliasOption<Schema extends z.AnyZodObject | z.ZodEffects<any>> =
    {
        help?: string
        version?: string
    } & {
        [Key in keyof z.infer<Schema>]?: string
    }

export const app_schema = z.object({
    name: zod
        .string()
        .transform((value) => stringUtils.hyphenate(value).toLowerCase()),
    description: z.string().optional(),
    version: zod
        .string()
        .default('0.0.0')
        .refine((value) => stringUtils.isValidSemVer(value), {
            message: 'Version must be a valid semver',
        }),
    alias: zod.record(zod.string()).default({}),
    examples: zod
        .array(zod.tuple([zod.string(), zod.string()]))
        .default([])
        .describe('Examples for app cli help'),
    hidden: zod
        .array(zod.string())
        .default([])
        .describe('hide a key from the help menu'),
    title_color: z
        .object({
            fg: zod.string().default('#d104ff'), //TODO: validate with chroma
            bg: zod.string().default('#12043A'), //TODO: validate with chroma
        })
        .default({
            fg: '#d104ff',
            bg: '#12043A',
        }),
    figlet: z
        .boolean()
        .default(true)
        .describe('Get title using lg ascii text w/FIGfont spec'), //todo: allow figlet options
    clear: z
        .boolean()
        .default(true)
        .describe('Clear the terminal screen if possible.'),
    print: zod.boolean().default(true).describe('Print header'),
})

export type BaseArgs = z.infer<typeof base_schema>
export const base_schema = zod.object({
    rootDir: zod.filePathExists
        .default('.')
        .describe('<dir> Set Root Directory'),
    outFile: zod
        .string()
        .default('svg-swatch')
        .describe('Output file name with no extension'),
    outDir: zod
        .string()
        .default('./tests/_output')
        .describe('<dir> Output directory'),
    debug: zod.boolean().default(false).describe('Debug output'),
    verbose: zod.boolean().default(false).describe('Verbose Logging'),
})

export const tg_ZodSchema = <Schema extends z.ZodSchema<any>>(
    schema: Schema,
    value: unknown,
): value is z.infer<Schema> => {
    return schema.safeParse(value).success
}

export const resolveSchema = <Schema extends z.ZodSchema>(
    schema: Schema,
    value: unknown,
    suppressError = true,
): z.infer<Schema> | undefined => {
    if (tg_ZodSchema(schema, value)) {
        return schema.parse(value)
    } else {
        const result = schema.safeParse(value)
        if (!result.success && suppressError === false) {
            console.error(JSON.stringify(result.error.format(), undefined, 4))
        }
        return undefined
    }
}
export const resolveSchemaError = <Schema extends z.ZodSchema>(
    schema: Schema,
    value: unknown,
): z.ZodFormattedError<any> | undefined => {
    if (!tg_ZodSchema(schema, value)) {
        const result = schema.safeParse(value)
        if (!result.success) {
            return result.error.format()
        }
    }
    return undefined
}
