import { zod } from '@snailicide/g-library'
import { z } from 'zod'

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

export type BaseArgs = z.infer<typeof base_schema>

export const tg_ZodSchema = <Schema extends z.ZodSchema<any>>(
    schema: Schema,
    value: unknown
): value is z.infer<Schema> => {
    return schema.safeParse(value).success
}

export const resolveSchema = <Schema extends z.ZodSchema>(
    schema: Schema,
    value: unknown
): z.infer<Schema> | undefined => {
    if (tg_ZodSchema(schema, value)) {
        return schema.parse(value)
    } else {
        const result = schema.safeParse(value)
        if (!result.success) {
            console.error(JSON.stringify(result.error.errors, undefined, 4))
        }
        return undefined
    }
}
