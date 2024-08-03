import { stringUtils, tg } from '@snailicide/g-library'
import chalk from 'chalk'
import clear from 'clear'
import yargs from 'yargs'
import type { Argv } from 'yargs'
import yargsInteractive from 'yargs-interactive'
import { z } from 'zod'
import * as process from 'process'

import {
    AppConfig,
    AppConfigIn,
    appConfigSchema,
    resolveAppConfigSchema,
} from './app-config.js'
import { resolveAppOptionsSchema } from './app-options.js'
import { doPrintHeader, getHeader } from './header.js'
import {
    getZodType,
    removeAnsi,
    swapKeysAndValues,
    wrapSchema,
} from './helpers.js'

//change to zodobject
// Schema extends z.AnyZodObject,
export type InitSuccessCallback<
    AppOptionsSchema extends
        | z.AnyZodObject
        | z.ZodEffects<z.AnyZodObject> = z.AnyZodObject,
> = (resolvedFlags: z.infer<AppOptionsSchema>, help: string | undefined) => void

export const initApp = async <
    AppOptionsSchema extends z.AnyZodObject | z.ZodEffects<z.AnyZodObject>,
>(
    optionsSchema: AppOptionsSchema,
    config: AppConfigIn<AppOptionsSchema>,
    initFunction: InitSuccessCallback<AppOptionsSchema>, // ( value: z.infer<Schema> ,help?: string)=> void,
    skip_interactive: boolean = false,
    _yargs: Array<string> = process.argv,
): Promise<Argv | undefined> => {
    const resolved_app_config: AppConfig | undefined = resolveAppConfigSchema(
        config,
        appConfigSchema,
    )

    if (tg.isNotUndefined<AppConfig>(resolved_app_config)) {
        const app_config: AppConfig = resolved_app_config

        ///Thius is the  APP options parsing.
        // const getTypedSchema = <T extends (z.AnyZodObject | z.ZodEffects<z.AnyZodObject>)>(schema: T): T => schema

        /* * Write commander options from zod descriptions * */
        const option_schema: AppOptionsSchema =
            wrapSchema<AppOptionsSchema>(optionsSchema)

        const iterateOptions =
            option_schema instanceof z.ZodObject
                ? option_schema._def.shape() //.keyof().options
                : option_schema instanceof z.ZodEffects
                  ? option_schema._def.schema._def.shape() //.innerType().shape() //.innerType().keyof().options
                  : []

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

        /* * TODO: PARSE ARRAY KEYS WIP * */
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

        const wrapped_app_options = wrapSchema<AppOptionsSchema>(optionsSchema)

        /* * populate description and header * */
        const desc: string = app_config.description
            ? app_config.description
            : wrapped_app_options.description
              ? wrapped_app_options.description
              : app_config.name
        const header: string = app_config.print
            ? doPrintHeader(getHeader(app_config))
            : `\nWelcome to ${app_config.name}\n${
                  getHeader(app_config).divider
              }`
        const getArgsInstance = (
            value = process.argv,
        ): Argv<Record<string, unknown>> => {
            const yargs_instance: Argv<Record<string, unknown>> = yargs(value)
            yargs_instance
                .scriptName(app_config.name)
                .version(app_config.version)
                .array(array_keys)
                .option(OPTIONS_OBJ)
                .usage(desc)
                .usage(chalk.bgHex('#727272')('$ $0 [args]'))
                .alias(swapKeysAndValues(app_config.flag_aliases))
                .example(app_config.examples)
            return yargs_instance
        }
        if (app_config.clear) clear()
        /* * Print the header if print ==true  * */
        console.log(header)

        const yargsInstance = getArgsInstance(_yargs)
        const raw_arguments = yargsInstance.argv
        app_config.hidden.forEach((_key) => {
            yargsInstance.hide(_key)
        })
        const new_option_schema = wrapSchema<AppOptionsSchema>(optionsSchema)
        const pendingArgs = resolveAppOptionsSchema<typeof new_option_schema>(
            new_option_schema,
            raw_arguments,
            true,
        )
        const argSuccess = new_option_schema.safeParse(raw_arguments)
        if (pendingArgs !== undefined) {
            const resolvedArgs: z.output<typeof new_option_schema> = pendingArgs
            if (resolvedArgs['debug']) {
                console.log('DEBUG:: RAW ARGS: ', raw_arguments)
                console.log('DEBUG:: RESOLVED ARGUMENTS:: ', resolvedArgs)
            }
            const _help: string = await yargsInstance.getHelp()
            initFunction(resolvedArgs, removeAnsi(_help))
            return yargsInstance
        } else {
            const interactive_bool = resolveAppOptionsSchema(
                z.object({ interactive: z.boolean().default(true) }),
                raw_arguments,
            )
            if (skip_interactive) return undefined
            else {
                if (interactive_bool !== undefined) {
                    const options: yargsInteractive.Option = {
                        errorlist: {
                            choices: ['HELP', 'SHOW ERROR'],
                            describe: 'List test',
                            type: 'list',
                        },
                        interactive: { default: interactive_bool.interactive },
                    }
                    await yargsInteractive()
                        .interactive(options)
                        .then((result) => {
                            if (result.errorlist === 'SHOW ERROR') {
                                if (!argSuccess.success) {
                                    console.log('ERROR ARGS', raw_arguments)
                                    console.log('ERROR', argSuccess.error)
                                    return undefined
                                }
                            } else if (result.errorlist === 'HELP') {
                                yargsInstance.showHelp()
                                return undefined
                            }
                            return undefined
                        })
                }
            }
        }
    }
    return undefined
}
export default initApp
