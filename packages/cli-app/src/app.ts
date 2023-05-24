import clear from 'clear'
import yargs from 'yargs'
import { z } from 'zod'
import { npm, stringUtils, tg } from '@snailicide/g-library'
import { doPrintHeader, getHeader } from './header.js'
import { resolveSchema } from './schema.js'
import { getZodType } from './helpers.js'

export const appOptionsSchema = z.object({
    name: z
        .string()
        .transform((value) => stringUtils.hyphenate(value).toLowerCase()),
    description: z.string(),
    version: z
        .string()
        .default('0.0.0')
        .refine((value) => npm.validSemVer.test(value), {
            message: 'Version must be a valid semver',
        }),
    alias: z.record(z.string()).default({}),
    title_color: z
        .object({
            fg: z.string().default('#d104ff'), //TODO: validate with chroma
            bg: z.string().default('#12043A'), //TODO: validate with chroma
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
    print: z.boolean().default(true).describe('Print header'),
})
export type AppOptions = z.infer<typeof appOptionsSchema>
export type unResolvedAppOptions = z.input<typeof appOptionsSchema>
export type ResolvedAppOptions = z.output<typeof appOptionsSchema>
export type AppAliasOption<Schema extends z.AnyZodObject | z.ZodEffects<any>> =
    {
        help?: string
        version?: string
    } & {
        [Key in keyof z.infer<Schema>]?: string
    }
export const initApp = <Schema extends z.ZodTypeAny>(
    schema: Schema,
    initFunction: (value: z.infer<Schema>) => void,
    unresolved_options: unResolvedAppOptions
) => {
    const resolved_app_options = resolveSchema<typeof appOptionsSchema>(
        appOptionsSchema,
        unresolved_options
    )
    if (
        tg.isNotUndefined<z.output<typeof appOptionsSchema>>(
            resolved_app_options
        )
    ) {
        const app_options = resolved_app_options
        if (app_options.clear) clear()
        /* * Print the header if print ==true  * */
        if (app_options.print) {
            doPrintHeader(getHeader(app_options))
        }
        //hack idk
        const getTypedSchema = <T extends z.ZodTypeAny>(schema: T): T => schema

        /* * Write commander options from zod descriptions * */
        const option_schema: Schema = getTypedSchema<Schema>(schema)
        const iterateOptions = option_schema._def.schema
            ? option_schema._def.schema._def.shape()
            : option_schema._def.shape()

        const OPTIONS_OBJ = Array.from(Object.entries(iterateOptions)).reduce(
            (accum, [key, value]) => {
                return {
                    ...accum,
                    [key]: {
                        type: getZodType(value as z.ZodTypeAny),
                        // , required: (value as z.ZodTypeAny).isOptional()
                        describe: (value as z.ZodTypeAny).description
                            ? (value as z.ZodTypeAny).description
                            : stringUtils.capitalizeWords(key),
                    },
                }
            },
            {}
        )
        let array_keys: string[] = []
        Object.entries(iterateOptions).forEach(([key, value]) => {
            const schema: Record<string, any> = <Record<string, any>>value
            if (schema && schema['_def'] && schema['_def']['typeName']) {
                if (schema['_def']['typeName'] === 'ZodArray') {
                    array_keys = [...array_keys, key]
                } else if (
                    schema['_def']['typeName'] === 'ZodDefault' &&
                    schema['_def']['innerType']['_def']['typeName'] ===
                        'ZodArray'
                ) {
                    array_keys = [...array_keys, key]
                }
            }
        }, {})

        const getArgsInstance = (value = process.argv) =>
            yargs(value)
                .scriptName(app_options.name)
                .version(app_options.version)
                .array(array_keys)
                .option(OPTIONS_OBJ)
                //.showHelp()
                .alias(app_options.alias)

        const yargsInstance = getArgsInstance()
        const getArgsObject = (value = process.argv) => yargsInstance.argv
        const new_option_schema = getTypedSchema<typeof schema>(schema)
        const pendingArgs = resolveSchema(new_option_schema, getArgsObject())
        if (pendingArgs !== undefined) {
            const resolvedArgs: z.output<typeof new_option_schema> = pendingArgs
            //todo: debug needs to be parsed seperately.
            if (resolvedArgs.debug === true) {
                console.error('DEBUG:: RAW ARGS: ', getArgsObject())
                console.error(
                    'DEBUG:: RESOLVED ARGS:: ',
                    resolveSchema(option_schema, getArgsObject())
                )
            }
            return initFunction(resolvedArgs)
        } else {
            yargsInstance.showHelp()
        }
    }
}
export default initApp
