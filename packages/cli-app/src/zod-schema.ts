import { stringUtils, tg } from '@snailicide/g-library'
import { Options } from 'yargs'
import { z } from 'zod'
import { getZodType, wrapSchema, ZodObjectSchema } from './helpers.js'

export const getIterableTopLevelRawShape = <
    AppOptionsSchema extends ZodObjectSchema,
>(
    optionsSchema: AppOptionsSchema,
): z.ZodRawShape => {
    const option_schema: AppOptionsSchema =
        wrapSchema<AppOptionsSchema>(optionsSchema)

    const iterateOptions: z.ZodRawShape =
        option_schema instanceof z.ZodObject
            ? option_schema._def.shape() //.keyof().options
            : option_schema instanceof z.ZodEffects
              ? option_schema._def.schema._def.shape() //.innerType().shape() //.innerType().keyof().options
              : []
    return iterateOptions
}

export const getIterableTopLevelDefault = <
    AppOptionsSchema extends ZodObjectSchema,
>(
    optionsSchema: AppOptionsSchema,
): z.ZodRawShape => {
    const option_schema: AppOptionsSchema =
        wrapSchema<AppOptionsSchema>(optionsSchema)

    const iterateOptions: z.ZodRawShape =
        option_schema instanceof z.ZodObject
            ? option_schema._def.shape() //.keyof().options
            : option_schema instanceof z.ZodEffects
              ? option_schema._def.schema._def.shape() //.innerType().shape() //.innerType().keyof().options
              : []
    return Object.fromEntries(
        Object.entries(iterateOptions).map(([key, value]) => {
            if (value instanceof z.ZodDefault)
                return [key, value._def.defaultValue()]
            return [key, undefined]
        }),
    )

    return iterateOptions
}

export const getArrayKeys = <AppOptionsSchema extends ZodObjectSchema>(
    iterableOptions: z.ZodRawShape,
): Array<string> => {
    let array_keys: Array<string> = []
    Object.entries(iterableOptions).forEach(([key, value]) => {
        const schema: Record<string, any> = <Record<string, any>>value
        if (schema && schema['_def'] && schema['_def']['typeName']) {
            if (schema['_def']['typeName'] === 'ZodArray') {
                array_keys = [...array_keys, key]
            } else if (
                schema['_def']['typeName'] === 'ZodDefault' &&
                schema['_def']['innerType']['_def']['typeName'] === 'ZodArray'
            ) {
                array_keys = [...array_keys, key]
            }
        }
    }, {})
    return array_keys
}

const getDescription = (key: string, value: z.ZodTypeAny): string => {
    const __desc = value.description
    const desc: string =
        tg.isString(__desc) && __desc.length > 0
            ? __desc
            : stringUtils.capitalizeWords(key)

    const req: string = !value.isOptional() ? '[required]' : ''
    return `${desc} ${req}`
}
type YargAppOption = Pick<Options, 'describe' | 'default' | 'type'>

export const getYargAppOptionObject = <
    AppOptionsSchema extends ZodObjectSchema,
>(
    iterableOptions: z.ZodRawShape,
): Record<string, YargAppOption> => {
    const OPTIONS_OBJ: Record<string, YargAppOption> = Array.from(
        Object.entries(iterableOptions),
    ).reduce((accum, [key, value]) => {
        return {
            ...accum,
            [key]: {
                default:
                    value instanceof z.ZodDefault
                        ? value._def.defaultValue()
                        : undefined,
                // NOTE: this works in the help but makes yargs throw error required:!(value as z.ZodTypeAny).isOptional(),
                describe: getDescription(key, value),
                type: getZodType(value),
            },
        }
    }, {})
    return OPTIONS_OBJ
}
