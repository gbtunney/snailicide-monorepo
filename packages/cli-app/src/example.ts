import { z } from 'zod'

import { initApp } from './app.js'
import {
    AppAliasOption,
    base_schema,
    BaseArgs,
    unResolvedAppOptions,
} from './schema.js'

const initFunc = (args: BaseArgs, help: undefined | string) => {
    if (args.verbose) {
        // console.log('VERBOSE FLAG ::RESOLVED APP ARGS::initFunc: ', args, 'done')
    }
    console.log(help, '\n', 'SUCCESS!! :: all args parsed')
}

const myschema = base_schema
    .merge(
        z.object({
            testarr: z.number().array().default([]).describe('test array'),
            testarr2: z.string().array().default([]).describe('test array'),
        }),
    )
    .transform((value) => {
        return value
    })
    .describe('this is a sample app that is made of fun')

const alias: AppAliasOption<typeof myschema> = {
    help: 'h',
    rootDir: 'r',
    testarr2: 'o',
    version: 'v',
}
const OPTIONS: unResolvedAppOptions = {
    alias: alias,
    description: 'This is an example to demonstrate use',
    //code editor error
    examples: [
        ['$0 --config "~/config.json"', 'Use custom config'],
        ['$0 --safe', 'Start in safe mode'],
    ],
    hidden: ['testarr'],
    name: 'Example App',
}

const initialize = async () => {
    const instance_yargs = await initApp(myschema, initFunc, OPTIONS)
    if (instance_yargs !== undefined) {
        // instance_yargs.showHelp()
    }
}
export default initialize()
