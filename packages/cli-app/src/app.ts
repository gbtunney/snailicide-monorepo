import { fmt, formatValue, getLogger } from '@snailicide/build-config'
import chalk from 'chalk'
import yargs from 'yargs'
import type { Argv, Options } from 'yargs'
import yargsInteractive from 'yargs-interactive'
import { z } from 'zod'
import * as process from 'process'
import { AppConfig, AppConfigIn, appConfigSchema } from './app-config.js'
import { doPrintHeader, getHeader } from './header.js'
import { wrapSchema, ZodObjectSchema } from './helpers.js'
import { prettyErrorLog , removeAnsi } from './string-utils.js'
import { getYargAppOptionObject } from './zod-schema.js'

/**
 * A callback type that is invoked upon successful initialization of the application.
 *
 * @template AppOptionsSchema - The schema for app options, either a ZodObject or a ZodEffects schema.
 * @param {z.infer<AppOptionsSchema>} resolvedFlags - The resolved and validated flags based on the provided schema.
 * @param {string | undefined} help - The help string, if available, otherwise undefined.
 */
export type InitSuccessCallback<
    AppOptionsSchema extends ZodObjectSchema = z.ZodObject,
> = (
    args: z.infer<AppOptionsSchema>,
    config: AppConfig, // or: z.infer<typeof appConfigSchema>
    help: string | undefined,
) => void | Promise<void>

/**
 * Initializes the application with the provided configuration and options schema.
 *
 * @template AppOptionsSchema - The schema for the application options.
 * @param {AppOptionsSchema} optionsSchema - The schema for validating the application options.
 * @param {AppConfigIn<AppOptionsSchema>} config - The configuration object for the application.
 * @param {InitSuccessCallback<AppOptionsSchema>} initFunction - The callback func ccalled successful init
 * @param {boolean} [skip_interactive] - Flag to skip interactive prompts. Default is `false`
 * @param {string[]} [_yargs] - The command-line arguments to be parsed. Default is `process.argv`
 * @returns {Promise<Argv | undefined>} - Returns a Yargs instance or undefined if initialization fails.
 */
export const initApp = async <AppOptionsSchema extends ZodObjectSchema>(
    optionsSchema: AppOptionsSchema,
    config: AppConfigIn,
    initFunction: InitSuccessCallback<AppOptionsSchema>,
    skip_interactive: boolean = false,
    _yargs: Array<string> = process.argv,
): Promise<Argv | undefined> => {
    const _appConfigResult = appConfigSchema.safeParse(config)

    if (_appConfigResult.success) {
        /* RESOLBED APP CONFIG */
        const app_config: AppConfig = _appConfigResult.data
        /** .child({ module: 'initApp' }) */
        const LOGGER = getLogger().child('app_init')
        ///LOGGER.setLevel('debug')

        const option_schema: z.ZodObject =
            wrapSchema<z.ZodObject>(optionsSchema)

        const yargsAppOptionsConfig: Record<string, Options> =
            getYargAppOptionObject(option_schema)

        const wrapped_app_options = wrapSchema<AppOptionsSchema>(optionsSchema)

        /* * populate description and header * */
        const desc: string = app_config.description
            ? app_config.description
            : wrapped_app_options.description
              ? wrapped_app_options.description
              : app_config.name
        const header: string = app_config.print
            ? doPrintHeader(getHeader(app_config))
            : fmt`\nWelcome to ${app_config.name} ${
                  getHeader(app_config).divider
              }`

        const getPlainArgsInstance = (
            value = process.argv,
        ): Argv<Record<string, unknown>> => {
            return yargs(value)
        }
        /** Function to Write commander like options from zod descriptions */
        const getArgsInstance = (
            value = process.argv,
        ): Argv<Record<string, unknown>> => {
            const yargs_instance: Argv<Record<string, unknown>> = yargs(value)
            yargs_instance
                .scriptName(app_config.name)
                .version(app_config.version)
                .options(yargsAppOptionsConfig)
                .usage(desc)
                .usage(chalk.bgHex('#727272')('$ $0 [args]'))
                .example(app_config.examples)
            return yargs_instance
        }

        // if (app_config.clear) clear()
        /* * Print the header if print ==true  * */
        console.log(header)
        const raw_arguments = getPlainArgsInstance(_yargs).argv
        //const argSuccess2 = optionsSchema.parse(raw_arguments)
        const argSuccess = optionsSchema.safeParse(raw_arguments)

        const yargsInstance = getArgsInstance(_yargs)

        /* i dont know what anything does after this */

        if (argSuccess.success) {
            const resolvedArgs: z.output<AppOptionsSchema> = argSuccess.data
            LOGGER.debug(fmt`RESOLVED ARGUMENTS::${resolvedArgs}`)
            const _help: string = await yargsInstance.getHelp()
            await initFunction(resolvedArgs, app_config, removeAnsi(_help))

            return yargsInstance

            /* IF WE ARE IN ERROR MODE , arggs did not parse */
        } else {
            const argParseError = argSuccess.error
            LOGGER.error(
                prettyErrorLog(
                    argParseError,
                    'Invalid command line arguments',
                    undefined,
                ),
            )
            /*  const interactive_bool = resolveAppOptionsSchema(
                z.object({ interactive: z.boolean().default(true) }),
                raw_arguments,
            )*/
            const interactive_bool = !_appConfigResult.data.skip_interactive

            if (!interactive_bool) return undefined
            else {
                const options: yargsInteractive.Option = {
                    errorlist: {
                        choices: ['HELP', 'SHOW ERROR', 'DONE'],
                        describe: 'List test',
                        type: 'list',
                    },
                    interactive: { default: true },
                }
                await yargsInteractive()
                    .interactive(options)
                    .then((result) => {
                        if (result.errorlist === 'SHOW ERROR') {
                            if (!argSuccess.success) {
                                LOGGER.error(
                                    prettyErrorLog(
                                        argSuccess.error,
                                        'Invalid command line arguments',
                                    ),
                                )
                                LOGGER.error(
                                    `Raw Yargs: \n ${formatValue(raw_arguments)}`,
                                )
                                return undefined
                            }
                        } else if (result.errorlist === 'HELP') {
                            yargsInstance.showHelp()
                        } else if (result.errorlist === 'DONE') {
                            console.log('Done')
                        }
                        return undefined
                    })
            }
        }
    } else
        getLogger().fatal(
            prettyErrorLog(
                _appConfigResult.error,
                'Invalid app configuration',
                'magenta',
            ),
        )
    return undefined
}
export const initializeApp = initApp

export default initApp
