import { Options as SingleYarg, PositionalOptionsType } from 'yargs'
import yargsInteractive from 'yargs-interactive'
import { z } from 'zod'
import {
    formatValue,
    getDefaultValue,
    getValueSchema,
    isOptionalType,
    prettify,
    wrapAnyZodSchema,
    wrapSchema,
    ZodObjectSchema,
} from './helpers.js'

import { getLogger } from './logger.js'
import { CLIAppMeta, updateMetaForSchema } from './meta.js'

import {
    convertZodTypeToYargs,
    getArraySchemaString,
    getEnumValuesString,
    wrapString,
} from './string-utils.js'

type YargsTypes = 'array' | 'count' | PositionalOptionsType | undefined
type YargAppOption = Pick<SingleYarg, 'describe' | 'default' | 'type'>
type YargAppOptions = Record<string, SingleYarg> // Pick<Options, 'describe' | 'default' | 'type'>

export const getYargsInteractive = (): yargsInteractive.Interactive => {
    return yargsInteractive()
}

export const getYargs = (): yargsInteractive.Interactive => {
    return yargsInteractive()
}

/** Convert a zod schema to a yargs options object */
export const getYargAppOptionObject = <
    AppOptionsSchema extends ZodObjectSchema,
>(
    optionsSchema: AppOptionsSchema,
): YargAppOptions => {
    const LOGGER = getLogger()

    const option_schema: AppOptionsSchema =
        wrapSchema<AppOptionsSchema>(optionsSchema)

    const keyList: Array<string> = Object.keys(option_schema.shape)
    const rawEntries = Array.from(
        Object.entries(option_schema.shape) as Array<[string, z.ZodType]>,
    )

    LOGGER.info(`------KEY LIST IS" , ${keyList.join(', ')}`)

    const result: YargAppOptions = rawEntries.reduce(
        (accum, [_key, value]: [string, z.ZodType]) => {
            const wrapperSchema = wrapAnyZodSchema<z.ZodType>(value)

            const outerSchema = getValueSchema(wrapperSchema)
            const innerSchema = getValueSchema(outerSchema)

            if (innerSchema.type === 'default') {
                console.log(
                    'THE INNER SCHEMA IS DEFAULT  outer is ',
                    innerSchema.type,
                )
            }
            const innerContainerSchema = getValueSchema(value, true)
            /* Set ids to the hash key and get meta*/
            const optionMeta: CLIAppMeta | undefined = updateMetaForSchema(
                wrapperSchema,
                { id: _key },
            )

            // ...existing code...
            LOGGER.info(
                prettify`Schema: KEY:[${_key}] WRAPPER:[${wrapperSchema.type}]\n\tOUTER: ${outerSchema.type} INNER:[${innerSchema.type}] CONTAINER:[${innerContainerSchema.type}] \nREQUIRED: [${!isOptionalType(wrapperSchema)}] DEFAULT: [${getDefaultValue(wrapperSchema)}]`,
            )

            if (!optionMeta?.description) {
                LOGGER.warn(prettify`\nNO Description META FOR ${_key}`)
            }

            const resultYargsConfig: SingleYarg = {
                alias: optionMeta?.alias,
                array: outerSchema.type === 'array',
                default: getDefaultValue(wrapperSchema),
                demandOption: !isOptionalType(wrapperSchema),
                description: prettify`${formatValue(optionMeta?.description)} ${wrapString(getEnumValuesString(innerSchema))}${wrapString(getArraySchemaString(innerSchema))}`,
                hidden: optionMeta?.hidden,
                type: convertZodTypeToYargs(innerSchema.type) as YargsTypes,
            }

            return {
                ...accum,
                [_key]: resultYargsConfig,
            }
        },
        {},
    )
    return result
}
