import { z } from 'zod'
import { initApp } from './app.js'
import {
    BaseArgs,
    base_schema,
    unResolvedAppOptions,
    AppAliasOption,
} from './schema.js'

const initFunc = (args: BaseArgs, help: undefined | string) => {
    if (args.verbose === true) {
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
    testarr2: 'o',
    version: 'v',
    help: 'h',
    rootDir: 'r',
}
const OPTIONS: unResolvedAppOptions = {
    name: 'Example App',
    description: 'This is an example to demonstrate use',
    alias: alias, //code editor error
    examples: [
        ['$0 --config "~/config.json"', 'Use custom config'],
        ['$0 --safe', 'Start in safe mode'],
    ],
    hidden: ['testarr'],
}

const initialize = async () => {
    const instance_yargs = await initApp(myschema, initFunc, OPTIONS)
    if (instance_yargs !== undefined) {
        // instance_yargs.showHelp()
    }
}
export default initialize()
