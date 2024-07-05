import type { ActionType, NodePlopAPI, PlopGeneratorConfig } from 'plop'
import yargs from 'yargs'

const boolBaseTemplate = true //ass oppesed to library todi: change to enum
const GENERATED_DIRECTORY = 'generated'
const TEMPLATE_BASE_DIRECTORY = './templates'
const TEMPLATE_DIRECTORY = boolBaseTemplate
    ? `${TEMPLATE_BASE_DIRECTORY}/base`
    : `${TEMPLATE_BASE_DIRECTORY}/library`

// @ts-expect-error ddd
import * as process from 'process'
import { z } from 'zod'

import { packagePrompts } from './src/package-prompts.js'
import { getUnscopedPackageName } from './src/package-template-helpers.js'
import {
    EnumDescriptionPresets,
    fileArgsSchema,
    packageSchema,
} from './src/package-types.js'

export const PACKAGE_GENERATOR: PlopGeneratorConfig = {
    description: 'Make New package',
    prompts: packagePrompts,
    actions: (_data): ActionType[] => {
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

            const actions: ActionType[] = [
                {
                    type: 'addMany',
                    destination,
                    data: packageSchema.parse(ParsedDataObject),
                    templateFiles: [`${TEMPLATE_DIRECTORY}/*`],
                },
                //for eslint
                {
                    type: 'addMany',
                    destination,
                    data: packageSchema.parse(ParsedDataObject),
                    templateFiles: [`${TEMPLATE_DIRECTORY}/.*`],
                },
            ]

            return actions
        }
        return []
    },
}
/**
 *
 */
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
