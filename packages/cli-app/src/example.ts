import * as RA from 'ramda-adjunct'
import yargsInteractive from 'yargs-interactive'
import { z } from 'zod'
import { AppConfig } from './app-config.js'
import { mergeSchemas } from './helpers.js'
import { getLogger } from './logger.js'
import {
    AppConfigIn,
    commonFlagsSchema,
    initApp,
    InitSuccessCallback,
} from './index.js'
/** Define custom schema, wrapper is required to avoid typescript error */
const transformTest: z.ZodType<Array<string>, Array<string>> = z.transform<
    Array<string>,
    Array<string>
>((val: Array<string>): Array<string> => {
    if (val.length === 1 && val[0]?.includes(',')) {
        return val[0].split(',').map((v) => v.trim())
    }
    return RA.ensureArray(val)
})

const transformTest2: z.ZodType<number, Array<string>> = z.transform<
    Array<string>,
    number
>((val: Array<string>) => {
    return RA.ensureArray(val).length
})
const custom_schema = z.object({
    enumtest: z
        .enum(['one', 'two', 'three'])
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
    //.describe('test array'),
    junk: z.number().meta({
        description: 'TEST VAR',
    }),

    numarray: z
        .array(z.number())
        .default([])
        .meta({ alias: ['ii', 'num'], description: 'anothwr array ' }),

    testarr: z
        .array(z.number())
        .default([])
        .meta({
            alias: ['z', 'zzz'],
            description: 'this is test array 1',
        }),
    testarr4: z
        .array(z.string())
        .default(['ff']) /*.pipe( transformTest )*/
        .meta({
            description: 'GBT TEST HI',
        }),
})
//custom_schema.extend(commonFlagsSchema)
//commonFlagsSchema.extend(custom_schema)
//type MergeSchema <A extends z.ZodObject,B extends z.ZodObject =  Merge<A,B>

//const my_merged_schema =commonFlagsSchema.extend(custom_schema.shape) //.extend(custom_schema) //MergedSchemas<typeof commonFlagsSchema,typeof custom_schema>

const my_merged_schema = mergeSchemas(commonFlagsSchema, custom_schema)

/** Set the init function which will be called after app is initialized with typed arguments. */
const initFunc: InitSuccessCallback<typeof my_merged_schema> = async (
    args: z.infer<typeof my_merged_schema>,
    config: AppConfig,
): Promise<void> => {
    getLogger().debug(
        `Resolved APP ARGS: ${JSON.stringify(args, undefined, 4)}`,
    )
    const test: Partial<z.infer<typeof my_merged_schema>> = args

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
            getLogger().info(result.errorlist)
            return undefined
        })

    getLogger().debug(JSON.stringify(args, undefined, 4))

    const teee: z.infer<typeof my_merged_schema> = {
        ...args,
    }
    getLogger().info(JSON.stringify(args))
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
}
/** Initialize App */
const initialize = async (): Promise<'SUCCESS' | 'ERROR'> => {
    console.log('INITIALIZING APP')
    const instance_yargs = await initApp<typeof my_merged_schema>(
        my_merged_schema,
        exampleAppConfigOptions,
        initFunc,
    )
    //console.log('YARGS INSTANCE: ', instance_yargs)
    if (instance_yargs === undefined) {
        //  process.exit(1)
        return 'ERROR'
    }
    // process.exit(0)
    return 'SUCCESS'
}

export default initialize()
