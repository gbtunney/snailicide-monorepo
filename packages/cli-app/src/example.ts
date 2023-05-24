import { unResolvedAppOptions, initApp, AppAliasOption } from './app.js'
import { BaseArgs, base_schema } from './schema.js'
import { z } from 'zod'

const initFunc = (args: BaseArgs) => {
    if (args.verbose === true) {
        console.warn('RESOLVED APP ARGS: ', args)
    }
}

const myschema = base_schema
    .merge(
        z.object({
            testarr: z.number().array().describe('test array'),
            testarr2: z.string().array().default([]).describe('test array'),
        })
    )
    .transform((value) => {
        return value
    })

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
}

const initialize = () => {
    initApp(myschema, initFunc, OPTIONS)
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
