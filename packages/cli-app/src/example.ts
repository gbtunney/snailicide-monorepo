import { z } from 'zod'

import {
    AppConfigIn,
    commonFlagsSchema,
    initApp,
    InitSuccessCallback,
    WrappedSchema,
    wrapSchema,
} from './index.js'

/** Define custom schema, wrapper is required to avoid typescript error */
const custom_schema = z.object({
    testarr: z.number().array().default([]).describe('test array'),
    testarr2: z.string().array().default([]).describe('test array'),
})
const my_merged_schema = wrapSchema<typeof commonFlagsSchema>(commonFlagsSchema)
    .merge(custom_schema)
    .transform((value) => {
        return value
    })
    .describe('this is a sample app that is made of fun')

type MergedSchema = WrappedSchema<typeof my_merged_schema>

/**
 * Set the init function which will be called after app is intialized with typed
 * arguments.
 */
const initFunc: InitSuccessCallback<MergedSchema> = <
    Schema extends
        | z.AnyZodObject
        | z.ZodEffects<z.AnyZodObject> = typeof commonFlagsSchema,
>(
    args: z.infer<Schema>,
) => {
    if (args['testarr']) {
        console.warn('RESOLVED APP ARGS: ', args)
    }
    console.log(JSON.stringify(args))
    return true
}

/** Example app configuration options */
const exampleAppConfigOptions: AppConfigIn<MergedSchema> = {
    description: 'This is an example to demonstrate use',
    //code editor error
    examples: [
        ['$0 --config "~/config.json"', 'Use custom config'],
        ['$0 --safe', 'Start in safe mode'],
    ],
    flag_aliases: {
        outDir: 'o',
        rootDir: 'r',
        // help: 'h',
        //version: 'v',
    },
    hidden: ['debug', 'testarr2'],
    name: 'Example App',
}

/** Initialize App */
const initialize = async (): Promise<'SUCCESS' | 'ERROR'> => {
    const instance_yargs = await initApp<MergedSchema>(
        my_merged_schema,
        exampleAppConfigOptions,
        initFunc,
    )
    if (instance_yargs === undefined) {
        process.exit(1)
        return 'ERROR'
    }
    process.exit(0)
    return 'SUCCESS'
}

export default initialize()
