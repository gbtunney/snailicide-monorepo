import type { ActionType, NodePlopAPI, PlopGeneratorConfig } from 'plop'
import yargs from 'yargs'

/** Ass oppesed to library todi: change to enum */
const boolBaseTemplate = true
const GENERATED_DIRECTORY = 'generated'
const TEMPLATE_BASE_DIRECTORY = './templates'
const TEMPLATE_DIRECTORY = boolBaseTemplate
    ? `${TEMPLATE_BASE_DIRECTORY}/base`
    : `${TEMPLATE_BASE_DIRECTORY}/library`

import { z } from 'zod'
import * as process from 'process'

import { packagePrompts } from './src/package-prompts.js'
import { getUnscopedPackageName } from './src/package-template-helpers.js'
import {
    EnumDescriptionPresets,
    fileArgsSchema,
    packageSchema,
} from './src/package-types.js'

export const PACKAGE_GENERATOR: PlopGeneratorConfig = {
    actions: (_data): Array<ActionType> => {
        if (_data !== undefined) {
            const { packageName = undefined, target } = _data
            const packageUnscoped = getUnscopedPackageName(packageName)
            const folderPath =
                packageUnscoped !== undefined ? packageUnscoped : packageName
            const year = new Date().getFullYear()

            //SCHEMA |!!
            const ParsedDataObject = { ..._data, year }
            const destination = `./${GENERATED_DIRECTORY}/${folderPath}`

            console.log(
                'DATAAA',
                _data,
                'after',
                packageSchema.safeParse(ParsedDataObject),
            )

            const actions: Array<ActionType> = [
                {
                    data: packageSchema.parse(ParsedDataObject),
                    destination,
                    templateFiles: [`${TEMPLATE_DIRECTORY}/*`],
                    type: 'addMany',
                },
                //for eslint
                {
                    data: packageSchema.parse(ParsedDataObject),
                    destination,
                    templateFiles: [`${TEMPLATE_DIRECTORY}/.*`],
                    type: 'addMany',
                },
            ]

            return actions
        }
        return []
    },
    description: 'Make New package',
    prompts: packagePrompts,
}
export default function (plop: NodePlopAPI) {
    const args: z.infer<typeof fileArgsSchema> = fileArgsSchema.parse(
        yargs(process.argv).argv,
    )
    // console.log('the args are ', args,plop,PACKAGE_GENERATOR)
    const enummm = z
        .nativeEnum(EnumDescriptionPresets)
        .safeParse(EnumDescriptionPresets['react'])
    //console.error("EEENUMM" ,enummm, EnumDescriptionPresets["react"])
    //plop.setPrompt('filePath', inquireFilePath)
    plop.setGenerator('package', PACKAGE_GENERATOR)
}
