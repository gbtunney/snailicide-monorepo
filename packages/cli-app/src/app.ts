import { stringUtils, tg } from '@snailicide/g-library'
import chalk from 'chalk'
import clear from 'clear'
import yargs from 'yargs'
import { z } from 'zod'
import * as process from 'process'

import { doPrintHeader, getHeader } from './header.js'
import { getZodType, removeAnsi } from './helpers.js'
import {
    app_schema,
    resolveSchema,
    resolveSchemaError,
    unResolvedAppOptions,
} from './schema.js'

export type InitFunction<Schema = z.ZodSchema> = (
    value: Schema extends z.ZodSchema ? z.infer<Schema> : never,
    help: string | undefined,
) => void
export const initApp = async <Schema extends z.ZodTypeAny>(
    schema: Schema,
    initFunction: InitFunction<Schema>, // ( value: z.infer<Schema> ,help?: string)=> void,
    unresolved_options: unResolvedAppOptions,
    argstr = process.argv,
) => {
    const resolved_app_options = resolveSchema<typeof app_schema>(
        app_schema,
        unresolved_options,
    )
    if (tg.isNotUndefined<z.output<typeof app_schema>>(resolved_app_options)) {
        const app_options = resolved_app_options
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
                        // ,TODO: figure this out , all are required w infer required: (value as z.ZodTypeAny).isOptional()
                        describe: (value as z.ZodTypeAny).description
                            ? (value as z.ZodTypeAny).description
                            : stringUtils.capitalizeWords(key),
                        type: getZodType(value as z.ZodTypeAny),
                    },
                }
            },
            {},
        )
        /* * PARSE ARRAY KEYS WIP * */
        let array_keys: Array<string> = []
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

        /* * TODO: This function is too long * */

        /* * populate description and header * */
        const desc = app_options.description
            ? app_options.description
            : schema.description
              ? schema.description
              : app_options.name
        const header: string = app_options.print
            ? doPrintHeader(getHeader(app_options))
            : `\nWelcome to ${app_options.name}\n${
                  getHeader(app_options).divider
              }`
        const getArgsInstance = (value = process.argv) =>
            yargs(value)
                .scriptName(app_options.name)
                .version(app_options.version)
                .array(array_keys)
                .option(OPTIONS_OBJ)
                .usage(desc)
                .usage(chalk.bgHex('#727272')('$ $0 [args]'))
                .alias(app_options.alias)
                .example(app_options.examples)

        if (app_options.clear) clear()
        /* * Print the header if print ==true  * */
        console.log(header)

        const yargsInstance = getArgsInstance(argstr)
        const raw_arguments = yargsInstance.argv
        app_options.hidden.forEach((_key) => {
            yargsInstance.hide(_key)
        })
        const new_option_schema = getTypedSchema<typeof schema>(schema)
        const pendingArgs = resolveSchema(new_option_schema, raw_arguments)

        if (pendingArgs !== undefined) {
            const resolvedArgs: z.output<typeof new_option_schema> = pendingArgs
            if (resolvedArgs.debug) {
                console.log('DEBUG:: RAW ARGS: ', raw_arguments)
                console.log('DEBUG:: RESOLVED ARGUMENTS:: ', resolvedArgs)
            }
            const _help: string = await yargsInstance.getHelp()
            initFunction(resolvedArgs, removeAnsi(_help))
            return yargsInstance
        } else {
            yargsInstance.showHelp()
            const error = resolveSchemaError(new_option_schema, raw_arguments)
            /* * TODO: maybe pull debug schema from base schema * */
            const debug_bool = resolveSchema(
                z.object({ debug: z.boolean().default(false) }),
                raw_arguments,
            )
            if (debug_bool?.debug === true) {
                console.error('DEBUG:: RAW ARGS: ', raw_arguments)
            }
            if (tg.isNotUndefined(error)) {
                console.error('\n', JSON.stringify(error, undefined, 4))
            }
            return undefined
        }
    }
    return undefined
}
export default initApp
