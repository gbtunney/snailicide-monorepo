import {
    type ErrorObject as ValidationErrorObject,
    type JSONSchemaType,
    type Options as _AjvOptions,
} from 'ajv'

import { JsonObject, OmitIndexSignature, SetRequired } from 'type-fest'
import { z } from 'zod'
import fs from 'fs'
import path from 'path'
import { getLogger, Logger } from './../logger/index.js'
import { importJSON } from './../utilities.js'
import type {
    MarkdownlintCli2ConfigurationSchema,
    MarkdownlintConfigurationSchema,
} from './markdownlint.config.js'
import { isPlainObject } from '../utilities.js'

export type MarkdownlintConfiguration = OmitIndexSignature<
    SetRequired<MarkdownlintCli2ConfigurationSchema, 'config'>
>
export type MarkdownlintRuleConfiguration = MarkdownlintConfigurationSchema
export type MarkdownlintProcessedResult<
    Schema extends
        | MarkdownlintConfiguration
        | MarkdownlintRuleConfiguration = MarkdownlintConfiguration,
> = {
    config: Schema
    valid: boolean
    errors: Array<ValidationErrorObject>
}
// PATHS
export const MDLINT_CLI2_PATH = `./node_modules/markdownlint-cli2/schema/`
export const MDLINT_CLI2_JSON_SCHEMA = 'markdownlint-cli2-config-schema.json'
export const MDLINT_CLI2_RULES_JSON_SCHEMA = 'markdownlint-config-schema.json'

type AjvOptions = Omit<_AjvOptions, 'strict'>
export const DEFAULT_OPTS = { ajvOptions: {} } as const
const ajvOptsDefault: AjvOptions = {
    allErrors: true,
    allowUnionTypes: true,
    strictTuples: false,
}
const adjOptionsSchema: z.ZodType<AjvOptions, AjvOptions> = z
    .custom<AjvOptions>()
    .transform((val: AjvOptions) => {
        return { ...ajvOptsDefault, ...val }
    })

//.default( { allErrors: true, allowUnionTypes: true })
export const markdownlintOptsSchema = z.object({
    ajvOptions: adjOptionsSchema.default(ajvOptsDefault),
    strictValidation: z.boolean().default(true),
    throwOnError: z.boolean().default(true),

    useBaseConfig: z.boolean().default(true),
    /* rules */
    useDefault: z.boolean().default(true),
})

export type MarkdownlintOpts = z.input<typeof markdownlintOptsSchema>
export type MarkdownlintOptsOutput = z.infer<typeof markdownlintOptsSchema>

export const markdownlintRuleOptsSchema = markdownlintOptsSchema.pick({
    useBaseConfig: true,
    useDefault: true,
})
export type MarkdownlintRuleOptsOutput = z.infer<
    typeof markdownlintRuleOptsSchema
>
export type MarkdownlintRuleOpts = z.input<typeof markdownlintRuleOptsSchema>

export const loadJSONSchema = async <
    SchemaType extends JSONSchemaType<unknown> = JSONSchemaType<unknown>,
>(
    schemaFileName:
        | typeof MDLINT_CLI2_JSON_SCHEMA
        | typeof MDLINT_CLI2_RULES_JSON_SCHEMA,
): Promise<SchemaType> => {
    const _path = path.resolve(`${MDLINT_CLI2_PATH}/${schemaFileName}`)
    if (!fs.existsSync(_path))
        throw new Error(
            `markdownlint cli schema JSON does not exist at path: ${_path}`,
        )
    const schemaJson = await importJSON(_path)

    const _resultbool: boolean =
        schemaJson === undefined || isPlainObject<JsonObject>(schemaJson)
    if (!_resultbool)
        throw new Error(`Failed to load markdownlint schema JSON at ${_path}`)
    return schemaJson as SchemaType
}

export const parseOptionsSchema = <Schema extends z.ZodObject>(
    schema: Schema,
    opts: z.input<Schema>,
): z.infer<Schema> => {
    const _parseOptsResult = schema.safeParse(opts)
    if (!_parseOptsResult.success) {
        console.log(z.prettifyError(_parseOptsResult.error))
        throw new Error(
            'Invalid options provided for markdownlint configuration validation: ',
        )
    }
    return _parseOptsResult.data
}

export const logger = (): Logger => {
    return getLogger({ name: 'MDLint' })
}
