import { z } from 'zod'

import {
    AppConfigIn,
    commonFlagsSchema,
    initApp,
    InitSuccessCallback,
    WrappedSchema,
    wrapSchema,
} from './index.js'

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
const typedMergedSchema: MergedSchema =
    wrapSchema<typeof my_merged_schema>(my_merged_schema)

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

const testme: AppConfigIn<MergedSchema> = {
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

const initialize = async (): Promise<'SUCCESS' | 'ERROR'> => {
    const instance_yargs = await initApp<MergedSchema>(
        my_merged_schema,
        testme,
        initFunc,
    )
    if (instance_yargs !== undefined) {
        // instance_yargs.showHelp()
        return 'ERROR'
    }
    return 'SUCCESS'
}
export default initialize()
