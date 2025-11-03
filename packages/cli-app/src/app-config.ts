import { colorUtils, stringUtils } from '@snailicide/g-library'
import { Merge } from 'type-fest'
import { z } from 'zod'
import { tgZodSchema, wrapSchema, ZodObjectSchema } from './helpers.js'
import { getLogger, LEVEL_NAMES } from './logger.js'
export type DefaultAliases = {
    help?: string
    version?: string
}

// ...existing code...

const default_aliases: DefaultAliases = {
    help: 'h',
    version: 'v',
}
/** This type is used to autocomplete the yargs aliases property. This creates shorthand values for option flags. */
export type AppFlagAliases<Schema extends ZodObjectSchema> = DefaultAliases & {
    [Key in keyof z.infer<Schema>]?: string
}

export type AppHidden<Schema extends ZodObjectSchema> = Array<
    keyof z.infer<Schema>
>
export type AppConfigOut = z.infer<typeof appConfigSchema>
export type AppConfig = AppConfigOut

export type AppConfigIn<
    Schema extends ZodObjectSchema = typeof appConfigSchema,
> = z.input<
    z.ZodType<
        AppConfig,
        //  z.ZodTypeDef,
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
 * This is the schema used to configure the Cli Application, these should NOT used in cli arguments when running the
 * client cli app
 */
export const appConfigSchema = z.object({
    clear: z
        .boolean()
        .default(true)
        .meta({ description: 'Clear the terminal screen if possible.' }),
    description: z.string().optional(),
    /** Examples of usage */
    examples: z
        .array(z.tuple([z.string(), z.string()]))
        .default([])
        .meta({ description: 'Examples for app cli help' }),
    //todo: allow figlet options?
    /** Use figlet to make large ascii title */
    figlet: z
        .boolean()
        .default(true)
        .meta({ description: 'Get title using lg ascii text w/FIGfont spec' }),
    /**
     * Shorthand Option Aliases (--help , -h )
     *
     * @exqmple
     * ```sh
     *    pnpm test:example -h
     *  # are equivalent
     * pnpm  test:example --help
     * ```
     */
    flag_aliases: z
        .record(z.string(), z.string())
        .default(default_aliases)
        .transform((value) => {
            // defaults first, user overrides win
            return { ...default_aliases, ...value }
        }),

    log_level: z.enum(LEVEL_NAMES).default('info'),
    /** Hide an option from the help screen */
    /* hidden: z
        .array(z.string())
        .default([])
        .meta({ description: 'hide a key from the help menu' }),*/
    name: z
        .string()
        .transform((value: string): string =>
            stringUtils.hyphenate(value).toLowerCase(),
        ),
    print: z.boolean().default(true).meta({ description: 'Print the header' }),
    /** Clears the terminal window */
    skip_interactive: z.boolean().default(false),
    title_color: z
        .object({
            bg: z
                .string()
                .default('#12043A')
                .refine(
                    (value: string) => colorUtils.isValidColor(value),
                    'Must be a valid chroma.ts color string',
                ),
            fg: z
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
        .meta({
            description:
                'Color for the title text and background. Please use a valid string chroma.ts color value.',
        }),
    version: z
        .string()
        .default('0.0.0')
        .refine((value) => stringUtils.isValidSemVer(value), {
            message: 'Version must be a valid semver',
        })
        .meta({ alias: ['v', 'version'] }),
})

export type AppConfigSchema = typeof appConfigSchema

export const resolveAppConfigSchema = <
    AppOptionsSchema extends ZodObjectSchema,
>(
    value: AppConfigIn<AppOptionsSchema>,
    schema: AppConfigSchema, //note : the default parameter errors like: schema:  AppConfigSchema=appConfigSchema
): z.infer<AppConfigSchema> | undefined => {
    if (tgZodSchema(schema, value)) {
        return schema.parse(value)
    } else {
        const result = schema.safeParse(value)
        if (!result.success) {
            getLogger().error(z.prettifyError(result.error))
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
    const _parseResult = packageSchema.safeParse(pkg)
    if (_parseResult.success) {
        return _parseResult.data
    }
    getLogger().error(z.prettifyError(_parseResult.error))

    return undefined
}
