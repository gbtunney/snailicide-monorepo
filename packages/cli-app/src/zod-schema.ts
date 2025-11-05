import type { ArrayValues, Primitive } from 'type-fest'
import { Choices, Options as SingleYarg } from 'yargs'
import yargsInteractive from 'yargs-interactive'
import { util, z } from 'zod'
import {
    fmt,
    formatValue,
    getDefaultValue,
    getValueSchema,
    isOptionalType,
    wrapAnyZodSchema,
    wrapSchema,
    ZodObjectSchema,
} from './helpers.js'
import { getLogger } from './logger.js'
import { CLIAppMeta, updateMetaForSchema } from './meta.js'

import { wrapString } from './string-utils.js'

type YargsType = SingleYarg['type']
type YargAppOption = Pick<SingleYarg, 'describe' | 'default' | 'type'>
type YargAppOptions = Record<string, SingleYarg> // Pick<Options, 'describe' | 'default' | 'type'>
type YargsEnumOptions = ArrayValues<Choices>
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

    LOGGER.info(fmt`------KEY LIST IS" , ${keyList.join(', ')}`)

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
                fmt`\n\tKEY:[${_key}] WRAPPER:${wrapperSchema.type}\n\tOUTER: ${outerSchema.type} INNER:${innerSchema.type} CONTAINER:${innerContainerSchema.type} \n\tREQUIRED: [${!isOptionalType(wrapperSchema)}] DEFAULT: ${getDefaultValue(wrapperSchema)}`,
            )

            if (!optionMeta?.description) {
                LOGGER.warn(fmt`\nNO Description META FOR ${_key}`)
            }

            LOGGER.debug(getEnumValues(innerSchema))

            const resultYargsConfig: SingleYarg = {
                alias: optionMeta?.alias,
                array: outerSchema.type === 'array',
                choices: getEnumValues(innerSchema),
                default: getDefaultValue(wrapperSchema),
                demandOption: !isOptionalType(wrapperSchema),
                description: fmt`${formatValue(optionMeta?.description)}${wrapString(getArraySchemaString(innerSchema))}`,
                hidden: optionMeta?.hidden,
                type: convertZodToYargsType(innerSchema),
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

/** Convert zod types to yargs types */
export const isZodYargsFriendly = (type: z.ZodType): boolean => {
    ///TODO: add a count type ? more exhaustive list?
    const _inner = type.type
    return (
        /* Positional Arguments for Yargs*/
        _inner === 'string' ||
        _inner === 'boolean' ||
        _inner === 'number' ||
        /* Other types of arguments */
        _inner === 'array' ||
        _inner === 'object'
    )
}

export const convertZodToYargsType = (
    type: z.ZodType,
    defaultType: YargsType = 'boolean',
): YargsType => {
    ///TODO: add a count type ? more exhaustive list?
    const _inner = type.type

    if (!isZodYargsFriendly(type)) {
        getLogger().warn('YARGS unfriendly type encountered::: ', _inner)
    }

    const enumValues = getEnumValues(type)

    if (enumValues !== undefined) {
        /** GetEnumValues( type ) */
        const _enumValues: Array<util.EnumValue> = enumValues

        return getEnumType(_enumValues) as YargsType
    }
    //this returns the default type
    return isZodYargsFriendly(type) ? (_inner as YargsType) : defaultType
}

/** Get array schema for help table */
export const getArraySchemaString = (_schema: z.ZodType): string => {
    const innerSchema = getValueSchema(_schema, true)

    return _schema.type === 'array' ? `${innerSchema.type}[]` : ''
}

/** Get enum values for help table */
export const getEnumValues = <
    Schema extends z.ZodType,
    Values extends Primitive = Primitive,
>(
    schema: Schema,
): Array<util.EnumValue> | undefined => {
    if (schema instanceof z.ZodEnum && schema.type === 'enum') {
        const _options: ReadonlyArray<util.EnumValue> = schema.options

        console.error('THIS IS AN ENUM', _options)

        const result: Array<util.EnumValue> = _options.map(
            (value: util.EnumValue): util.EnumValue => {
                return value
            },
        )
        return result
    }
    return undefined
}
export const getEnumType = (
    values: Array<util.EnumValue>,
): YargsEnumOptions => {
    return values.length > 0 ? typeof values[0] : 'string'
}
