import { z } from 'zod'
import { initApp } from './app.js'
import {
    BaseArgs,
    base_schema,
    unResolvedAppOptions,
    AppAliasOption,
} from './schema.js'

const initFunc = (args: BaseArgs, help: undefined | string) => {
    if (args.debug === true) {
        console.log('RESOLVED APP ARGS::initFunc: ', args, 'done')
    }
    console.log(help)
}

const myschema = base_schema
    .merge(
        z.object({
            testarr: z.number().array().default([]).describe('test array'),
            testarr2: z.string().array().default([]).describe('test array'),
        })
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
}

const initialize = async () => {
    const instance_yargs = initApp(myschema, initFunc, OPTIONS)
}
export default initialize()
//import {zod} from "../../g-library/types/zod/index";
//import {node} from "../../g-library/types/node/index";

/*
.transform((value) => {
    const outDir =
        value.outDir !== undefined
            ? zod.filePath.parse(
                node.getFullPath(value.outDir, value.rootDir)
            )
            : value.outDir
    return { ...value, outDir }
})*/
