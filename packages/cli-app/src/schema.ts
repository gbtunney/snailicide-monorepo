import { zod, node } from '@snailicide/g-library'
import { z } from 'zod'

export const base_schema = zod
    .object({
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
    .transform((value) => {
        const outDir =
            value.outDir !== undefined
                ? zod.filePath.parse(
                      node.getFullPath(value.outDir, value.rootDir)
                  )
                : value.outDir
        return { ...value, outDir }
    })
    .describe('An example CLI for making svgs')

export type BaseArgs = z.infer<typeof base_schema>

export const tg_ZodSchema = <Schema extends z.ZodSchema<any>>(
    schema: Schema,
    value: unknown
): value is z.infer<Schema> => {
    return schema.safeParse(value).success
}

export const resolveSchema = <Schema extends z.ZodSchema>(
    schema: Schema,
    value: unknown,
    debug = false
): z.infer<Schema> | undefined => {
    if (tg_ZodSchema(schema, value)) {
        return schema.parse(value)
    } else {
        if (debug) schema.parse(value)
        return undefined
    }
}
