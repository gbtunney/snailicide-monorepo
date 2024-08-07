import { colorUtils, stringUtils } from '@snailicide/g-library'
import { zod } from '@snailicide/g-library/node'
import { Merge } from 'type-fest'
import { z } from 'zod'
import { tgZodSchema, wrapSchema, ZodObjectSchema } from './helpers.js'

const default_aliases: {
    help: string
    version: string
} = {
    help: 'h',
    version: 'v',
}
/**
 * This type is used to autocomplete the yargs aliases property. This creates
 * shorthand values for option flags.
 */
export type AppFlagAliases<Schema extends ZodObjectSchema> = {
    [Key in keyof z.infer<Schema>]?: string
}

export type AppHidden<Schema extends ZodObjectSchema> = Array<
    keyof z.infer<Schema>
>
export type AppConfigOut = z.infer<typeof appConfigSchema>
export type AppConfig = AppConfigOut

export type AppConfigIn<Schema extends ZodObjectSchema> = z.input<
    z.ZodType<
        AppConfig,
        z.ZodTypeDef,
        Merge<
            z.input<AppConfigSchema>,
            {
                hidden?: AppHidden<Schema>
                flag_aliases?: AppFlagAliases<Schema>
            }
        >
    >
>
/**
 * This is the schema used to configure the Cli Application, these should NOT
 * used in cli arguments when running the client cli app
 */
export const appConfigSchema = z.object({
    clear: z
        .boolean()
        .default(true)
        .describe('Clear the terminal screen if possible.'),
    description: z.string().optional(),
    examples: z
        .array(zod.tuple([zod.string(), zod.string()]))
        .default([])
        .describe('Examples for app cli help'),
    //todo: allow figlet options?
    figlet: z
        .boolean()
        .default(true)
        .describe('Get title using lg ascii text w/FIGfont spec'),
    flag_aliases: z
        .record(z.string())
        .default(default_aliases)
        .transform((value) => {
            return { ...value, ...default_aliases }
        }),
    hidden: z
        .array(z.string())
        .default([])
        .describe('hide a key from the help menu'),
    name: z
        .string()
        .transform((value) => stringUtils.hyphenate(value).toLowerCase()),
    print: z.boolean().default(true).describe('Print the header'),
    title_color: z
        .object({
            bg: zod
                .string()
                .default('#12043A')
                .refine(
                    (value: string) => colorUtils.isValidColor(value),
                    'Must be a valid chroma.ts color string',
                ),
            fg: zod
                .string()
                .default('#d104ff')
                .refine(
                    (value: string) => colorUtils.isValidColor(value),
                    'Must be a valid chroma.ts color string',
                ),
        })
        .default({
            bg: '#12043A',
            fg: '#d104ff',
        })
        .describe(
            'Color for the title text and background. Please use a valid string chroma.ts color value.',
        ),
    version: zod
        .string()
        .default('0.0.0')
        .refine((value) => stringUtils.isValidSemVer(value), {
            message: 'Version must be a valid semver',
        }),
})

export type AppConfigSchema = typeof appConfigSchema

export const resolveAppConfigSchema = <
    AppOptionsSchema extends ZodObjectSchema,
>(
    value: AppConfigIn<AppOptionsSchema>,
    schema: AppConfigSchema, //note : the default parameter errors like: schema:  AppConfigSchema=appConfigSchema
    suppressError: boolean = true,
): z.infer<AppConfigSchema> | undefined => {
    if (tgZodSchema(schema, value)) {
        return schema.parse(value)
    } else {
        const result = schema.safeParse(value)
        if (!result.success && !suppressError) {
            console.error(JSON.stringify(result.error.format(), undefined, 4))
        }
        return undefined
    }
}
const packageSchema = wrapSchema<typeof appConfigSchema>(appConfigSchema).pick({
    description: true,
    name: true,
    version: true,
})

export const parsePackageJson = (
    pkg: unknown,
): z.infer<typeof packageSchema> | undefined => {
    if (packageSchema.safeParse(pkg).success) {
        return packageSchema.parse(pkg)
    } else {
        console.error(
            'Invalid package.json',
            packageSchema.safeParse(pkg).error,
        )
        return undefined
    }
}
