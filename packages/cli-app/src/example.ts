import { unResolvedAppOptions, initApp } from './app.js'
import { BaseArgs, base_schema } from './schema.js'

const initFunc = (args: BaseArgs) => {
    if (args.verbose === true) {
        console.warn('RESOLVED APP ARGS: ', args)
    }
}
const OPTIONS: unResolvedAppOptions = {
    name: 'Example App',
    description: 'This is an example to demonstrate use',
}
const initialize = () => {
    initApp(base_schema, initFunc, OPTIONS)
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
