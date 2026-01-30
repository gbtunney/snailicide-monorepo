import RefParser from '@apidevtools/json-schema-ref-parser'
import { JSONSchema4 } from 'json-schema'
import {
    compile as compileToTS,
    Options as CompileToTSOpts,
} from 'json-schema-to-typescript'
import { Merge } from 'type-fest'
import fs from 'fs'
import { getFilePath } from './../utilities.js'
import { loadJSONSchema, logger, MDLINT_CLI2_JSON_SCHEMA } from './schema.js'

type AdditionalPropsMode =
    | boolean // true = keep, false = remove
    | 'remove' // remove index signature
    | 'loose' // allow boolean | string | object | null
    | 'strict' // only boolean
type ExportOptions = Merge<
    CompileToTSOpts,
    { additionalProperties?: AdditionalPropsMode }
>
export const exportMDLintJSONSchemaTypes = async (
    _output_file_name: string = './markdownlint.config.ts',
    _schema_file_name: typeof MDLINT_CLI2_JSON_SCHEMA = MDLINT_CLI2_JSON_SCHEMA,
    opts: Partial<ExportOptions> = {
        additionalProperties: 'remove',
        bannerComment:
            '/* THIS FILE IS AUTO-GENERATED — DO NOT EDIT */\n' +
            '/* Generated from markdownlint-cli2 via json-schema-to-typescript */', // default = remove
    },
): Promise<string> => {
    const output_path: string = getFilePath(import.meta, _output_file_name)

    const { additionalProperties: apMode, ...jsttOpts } = opts

    const LOGGER = logger()
    LOGGER.info('Exporting config types →', output_path)

    // 1. Load wrapper schema (cli2)
    const rawSchema: JSONSchema4 = (await loadJSONSchema(
        _schema_file_name,
    )) as JSONSchema4

    // 2. Dereference $ref → get the REAL markdownlint rule schema
    const derefSchema: any = await RefParser.dereference(rawSchema)

    LOGGER.info('Dereferenced schema loaded.')

    // 3. The real markdownlint rule schema is here:
    const ruleSchema = derefSchema.properties?.config
    if (!ruleSchema) {
        throw new Error(
            'Could not locate markdownlint rule schema (properties.config)',
        )
    }

    // ---- PATCH additionalProperties BEHAVIOR ----
    const mode = opts.additionalProperties ?? false

    if (mode === false || mode === 'remove') {
        LOGGER.info('Removing additionalProperties → no index signature.')
        delete ruleSchema.additionalProperties
    }

    if (mode === true) {
        LOGGER.info('Keeping additionalProperties exactly as-is.')
        // do nothing
    }

    if (mode === 'strict') {
        LOGGER.info('Setting strict boolean additionalProperties.')
        ruleSchema.additionalProperties = { type: 'boolean' }
    }

    if (mode === 'loose') {
        LOGGER.info('Setting loose index signature.')
        ruleSchema.additionalProperties = {
            oneOf: [
                { type: 'boolean' },
                { type: 'string' },
                { type: 'object' },
                { type: 'null' },
            ],
        }
    }

    // ---------------------------------------------

    // 4. Generate Typescript
    const ts_file = await compileToTS(
        derefSchema,
        'MarkdownlintCli2ConfigurationSchema',
        jsttOpts,
    )

    // 5. Write file
    if (fs.existsSync(output_path)) {
        LOGGER.info(` Overwriting existing generated types at ${output_path}`)
    }
    fs.writeFileSync(output_path, ts_file)
    LOGGER.info(`Generated Markdownlint Cli2 types written to  ${output_path}`)
    return output_path
}

exportMDLintJSONSchemaTypes().then((fileName: string) => {
    console.log(`Exported MarkdownlintConfig Types to ${fileName}`)
}, console.error)
