import { zod } from '@snailicide/g-library/node'
import { z } from 'zod'
import { tgZodSchema, ZodObjectSchema } from './helpers.js'

export const commonFlagsSchema = zod.object({
    debug: zod.boolean().default(false).describe('Debug output'),
    outDir: zod.fsPath().describe('<dir> Output directory'),
    rootDir: zod
        .fsPathTypeExists('directory')
        .default('.')
        .describe('<dir> Set Root Directory'),
    verbose: zod.boolean().default(false).describe('Verbose Logging'),
})
export type CommonFlagsSchema = typeof commonFlagsSchema
export type CommonFlagsOutput = z.infer<typeof commonFlagsSchema>
export type CommonFlagsInput = z.input<typeof commonFlagsSchema>

const tg_AppOptionsValid = <
    AppOptionsSchema extends ZodObjectSchema = z.AnyZodObject,
>(
    schema: AppOptionsSchema,
    value: unknown,
): value is z.infer<AppOptionsSchema> => tgZodSchema(schema, value)

export const resolveAppOptionsSchema = <
    AppOptionsSchema extends ZodObjectSchema = z.AnyZodObject,
>(
    schema: AppOptionsSchema,
    value: unknown,
    suppressError: boolean = true,
): z.infer<AppOptionsSchema> | undefined => {
    if (tg_AppOptionsValid(schema, value)) {
        return schema.parse(value)
    } else {
        const result = schema.safeParse(value)
        if (!result.success && !suppressError) {
            console.error(JSON.stringify(result.error.format(), undefined, 4))
        }
        return undefined
    }
}
