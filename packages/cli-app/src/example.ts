import { fmt, logger } from '@snailicide/build-config'
import yargsInteractive from 'yargs-interactive'
import { z } from 'zod'
import { AppConfig } from './app-config.js'
import { mergeSchemas } from './helpers.js'
import {
    AppConfigIn,
    commonFlagsSchema,
    initApp,
    InitSuccessCallback,
} from './index.js'

//todo: fix log levels
const LOGGER = logger.get({
    colors: {},
    level: 'debug',
    name: 'example',
    time_stamp: true,
})
/** Define custom schema, wrapper is required to avoid typescript error */

const custom_schema = z.object({
    enumtest: z
        //.enum({'one':4444, 'two':555, 'three' :33333})
        .enum(['one', 'two', 'three'] as const)
        .default('one')
        .optional()
        .meta({ description: '<<<test me enum' }),
    gillian: z
        .string()
        .default('hello')
        .meta({
            alias: ['g', 'gbt'],
            description: 'this is gillian',
        }),
    /** Control interactive prompt behavior */
    interactive: z
        .boolean()
        .default(true)
        .meta({ alias: ['i'], description: 'Run without interactive prompts' }),

    //.describe('test array'),
    junk: z.number().default(1).meta({
        description: 'TEST VAR',
    }),

    numarray: z
        .array(z.number())
        .default([])
        .meta({ alias: ['ii', 'num'], description: 'anothwr array ' }),
    testarr: z.array(z.number()).default([]).meta({
        description: 'this is test array 1',
    }),
    testarr4: z

        .array(z.string())
        .nonempty()
        .meta({
            alias: ['z', 'zzz'],
            description: 'GBT TEST HI',
        }),
})

const my_merged_schema = mergeSchemas(commonFlagsSchema, custom_schema)

/** Set the init function which will be called after app is initialized with typed arguments. */
const initFunc: InitSuccessCallback<typeof my_merged_schema> = async (
    args: z.infer<typeof my_merged_schema>,
    config: AppConfig,
): Promise<void> => {
    logger
        .get()
        .debug(`Resolved APP ARGS:`, fmt`!!!!!!!Resolved APP ARGS: ${args}`)
    if (!args.interactive) {
        logger.get().info('Non-interactive mode: skipping prompts')
    } else {
        //this is for example
        const options: yargsInteractive.Option = {
            errorlist: {
                choices: Object.keys(args), //['HELP', 'SHOW ERROR','DONE'],
                describe: 'List test',
                type: 'list',
            },
            interactive: { default: true },
        }
        await yargsInteractive()
            .interactive(options)
            .then((result) => {
                logger.get().info(result.errorlist)
                return undefined
            })
    }

    logger.get().info(JSON.stringify(args))
    //return void
    return
}
/** Example app configuration options */
const exampleAppConfigOptions: AppConfigIn = {
    description: 'This is an example to demonstrate use',
    //code editor error
    examples: [
        ['$0 --config "~/config.json"', 'Use custom config'],
        ['$0 --safe', 'Start in safe mode'],
    ],
    name: 'Example App',

    version: '0.0.0',
}
/** Initialize App */
const initialize = async (): Promise<'SUCCESS' | 'ERROR'> => {
    const instance_yargs = await initApp<typeof my_merged_schema>(
        my_merged_schema,
        exampleAppConfigOptions,
        initFunc,
    )
    //console.log('YARGS INSTANCE: ', instance_yargs)
    if (instance_yargs === undefined) {
        process.exit(1)
        return 'ERROR'
    }
    process.exit(0)
    return 'SUCCESS'
}

export default initialize()
