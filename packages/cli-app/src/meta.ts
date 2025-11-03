import { zodHelpers } from '@snailicide/g-library'
import type { Logger } from 'winston'
import { z } from 'zod'
import { appConfigSchema } from './app-config.js'
import { wrapAnyZodSchema } from './helpers.js'

const metaSchema = z.object({
    alias: zodHelpers.ensureArray(z.string()).default([]),
    deprecated: z.boolean().default(false), // z.array(z.string() ).default([]),
    description: z.string().default('i am'),
    hidden: z.boolean().default(false),
    id: z.string().optional(),
})

type MetaInput = z.input<typeof metaSchema>
type MetaOutput = z.output<typeof metaSchema>

export type MetaSchema = typeof metaSchema
export type CLIAppMeta = MetaOutput

/* eslint-disable @typescript-eslint/consistent-type-definitions, @typescript-eslint/no-empty-object-type */
declare module 'zod' {
    interface GlobalMeta extends MetaInput {}
}

const parseMeta = <Schema extends MetaSchema = MetaSchema>(
    data: unknown,
    schema: Schema,
): z.output<Schema> | undefined => {
    const _parsed = schema.safeParse(data)
    return _parsed.success ? _parsed.data : undefined
}

export const getMetaForSchema = <Schema extends z.ZodType>(
    _schema: z.ZodType,
): CLIAppMeta | undefined => {
    const optionMeta = z.globalRegistry.get(_schema)
    return parseMeta(optionMeta, metaSchema)
}

export const updateMetaForSchema = <Schema extends z.ZodType>(
    _schema: z.ZodType,
    _data: Partial<MetaInput>,
): CLIAppMeta | undefined => {
    const optionMeta = getMetaForSchema(_schema)
    //return parseMeta<MetaSchema>(optionMeta,metaSchema)
    z.globalRegistry.add(_schema, { ...optionMeta, _data })
    /* Get Updated */
    return getMetaForSchema(_schema)
}

export type AppConfigMeta = {
    logger: Logger | string
}

export const initAppRegistry = (): void => {
    const _schema = wrapAnyZodSchema<z.ZodObject>(appConfigSchema)
    //const myRegistry = z.registry<AppConfigMeta,z.ZodString >
    const myRegistry = z.registry<AppConfigMeta, typeof appConfigSchema>()
}
