import clear from 'clear'
import { OptionValues, program } from 'commander'
import yargs from 'yargs'
import { z } from 'zod'
import { npm, stringUtils } from '@snailicide/g-library'
import { doPrintHeader, getHeader } from './header.js'
import { resolveSchema } from './schema.js'

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
export type UnResolvedAppOptions = z.input<typeof appOptionsSchema>
export type ResolvedAppOptions = z.output<typeof appOptionsSchema>

export const initApp = <Schema extends z.ZodTypeAny>(
    schema: Schema,
    initFunction: (value: z.infer<Schema>) => void,
    unresolved_options: UnResolvedAppOptions
) => {
    const resolved_app_options = resolveSchema(
        appOptionsSchema,
        unresolved_options
    )
    if (resolved_app_options !== undefined) {
        const app_options = resolved_app_options
        if (app_options.clear) clear()
        /* * Print the header if print ==true  * */
        if (app_options.print) {
            doPrintHeader(getHeader(app_options))
        }
        program
            .name(app_options.name)
            .version(app_options.version, '-v,--version', '--version')
            .description(app_options.description)
        //hack idk
        const getTypedSchema = <T extends z.ZodTypeAny>(schema: T): T => schema
        /* * Write commander options from zod descriptions * */
        const option_schema = getTypedSchema<typeof schema>(schema)
        Object.entries(option_schema._def.schema._def.shape()).forEach(
            ([key, _schema]) => {
                const schema: Record<string, any> = <Record<string, any>>_schema
                const description =
                    schema && schema['description']
                        ? schema['description']
                        : stringUtils.capitalizeWords(key)
                program.option(`--${key}`, description)
            }
        )
        /* * END Write commander options * */
        program.parse(process.argv)
        const options: OptionValues = program.opts()

        const getArgsObject = (value = process.argv) => yargs(value).argv

        const new_option_schema = getTypedSchema<typeof schema>(schema)

        const pendingArgs = resolveSchema(new_option_schema, getArgsObject())

        if (pendingArgs !== undefined) {
            const resolvedArgs: z.output<typeof new_option_schema> = pendingArgs
            if (resolvedArgs.debug === true) {
                console.error('DEBUG:: RAW ARGS: ', getArgsObject())
                console.error(
                    'DEBUG:: RESOLVED ARGS:: ',
                    resolveSchema(option_schema, getArgsObject(), true)
                )
            }
            initFunction(resolvedArgs)
        }
    }
}
/*
if (options['help']) {
    program.outputHelp()
} else {
    const getArgsObject = (value = process.argv) => yargs(value).argv
    const resolvedArgs = resolveOptions(getArgsObject())
    if (resolvedArgs !== undefined) {
    }
}
*/
