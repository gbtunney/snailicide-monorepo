import { tg } from '@snailicide/g-library'
import chalk from 'chalk'
import clear from 'clear'
import yargs from 'yargs'
import type { Argv, Options } from 'yargs'
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
    removeAnsi,
    swapKeysAndValues,
    wrapSchema,
    ZodObjectSchema,
} from './helpers.js'
import {
    getArrayKeys,
    getIterableTopLevelDefault,
    getIterableTopLevelRawShape,
    getYargAppOptionObject,
} from './zod-schema.js'

/**
 * A callback type that is invoked upon successful initialization of the
 * application.
 *
 * @template AppOptionsSchema - The schema for the application options, which
 *   can be either a Zod object schema or a Zod effects schema.
 * @param {z.infer<AppOptionsSchema>} resolvedFlags - The resolved and validated
 *   flags based on the provided schema.
 * @param {string | undefined} help - The help string, if available, otherwise
 *   undefined.
 */
export type InitSuccessCallback<
    AppOptionsSchema extends
        | z.AnyZodObject
        | z.ZodEffects<z.AnyZodObject> = z.AnyZodObject,
> = (resolvedFlags: z.infer<AppOptionsSchema>, help: string | undefined) => void

/**
 * Initializes the application with the provided configuration and options
 * schema.
 *
 * @template AppOptionsSchema - The schema for the application options.
 * @param {AppOptionsSchema} optionsSchema - The schema for validating the
 *   application options.
 * @param {AppConfigIn<AppOptionsSchema>} config - The configuration object for
 *   the application.
 * @param {InitSuccessCallback<AppOptionsSchema>} initFunction - The callback
 *   function to be called upon successful initialization.
 * @param {boolean} [skip_interactive=false] - Flag to skip interactive prompts.
 *   Default is `false`
 * @param {string[]} [_yargs=process.argv] - The command-line arguments to be
 *   parsed. Default is `process.argv`
 * @returns {Promise<Argv | undefined>} - Returns a Yargs instance or undefined
 *   if initialization fails.
 */
export const initApp = async <AppOptionsSchema extends ZodObjectSchema>(
    optionsSchema: AppOptionsSchema,
    config: AppConfigIn<AppOptionsSchema>,
    initFunction: InitSuccessCallback<AppOptionsSchema>,
    skip_interactive: boolean = false,
    _yargs: Array<string> = process.argv,
): Promise<Argv | undefined> => {
    const resolved_app_config: AppConfig | undefined = resolveAppConfigSchema(
        config,
        appConfigSchema,
    )

    if (tg.isNotUndefined<AppConfig>(resolved_app_config)) {
        const app_config: AppConfig = resolved_app_config
        const option_schema: AppOptionsSchema =
            wrapSchema<AppOptionsSchema>(optionsSchema)

        //options data made to fit with yargs
        const rawShape = getIterableTopLevelRawShape(option_schema)
        const arrayKeys = getArrayKeys(rawShape)
        const yargsAppOptionsConfig: Record<string, Options> =
            getYargAppOptionObject(rawShape)

        console.log('APP DEFAULTS', getIterableTopLevelDefault(option_schema))

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

        /* * Write commander like options from zod descriptions * */
        const getArgsInstance = (
            value = process.argv,
        ): Argv<Record<string, unknown>> => {
            const yargs_instance: Argv<Record<string, unknown>> = yargs(value)
            yargs_instance
                .scriptName(app_config.name)
                .version(app_config.version)
                .array(arrayKeys)
                .option(yargsAppOptionsConfig)
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
export const initializeApp = initApp

export default initApp
