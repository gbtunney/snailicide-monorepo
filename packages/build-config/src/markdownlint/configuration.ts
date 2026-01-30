import RefParser from '@apidevtools/json-schema-ref-parser'
import { type JSONSchemaType } from 'ajv'
import { getMergedRuleConfiguration } from './rules.js'
import {
    DEFAULT_OPTS,
    loadJSONSchema,
    logger,
    type MarkdownlintConfiguration,
    type MarkdownlintOpts,
    type MarkdownlintOptsOutput,
    markdownlintOptsSchema,
    MarkdownlintProcessedResult,
    MDLINT_CLI2_JSON_SCHEMA,
    parseOptionsSchema,
} from './schema.js'
import { getAjvValidator, type ValidationErrorObject } from './validator.js'

export const validateFullConfiguration = async (
    config: MarkdownlintConfiguration,
    opts: MarkdownlintOpts = DEFAULT_OPTS,
): Promise<Omit<MarkdownlintProcessedResult, 'config'>> => {
    const {
        ajvOptions,
        strictValidation,
        throwOnError,
    }: MarkdownlintOptsOutput = parseOptionsSchema(markdownlintOptsSchema, opts)

    const LOGGER = logger()

    const _schemaJson = await loadJSONSchema(MDLINT_CLI2_JSON_SCHEMA)
    const schemaJson = await RefParser.dereference(_schemaJson)
    const validateFn = getAjvValidator(
        schemaJson as JSONSchemaType<unknown>,
        strictValidation,
        ajvOptions,
    )
    const _valid: boolean = validateFn(config)
    const errors: Array<ValidationErrorObject> = validateFn.errors ?? []

    if (!_valid) {
        const msg = errors
            .map(
                (e) =>
                    `${e.instancePath || '/'} ${e.message ?? e.keyword}${
                        Object.keys(e.params || {}).length
                            ? ' ' + JSON.stringify(e.params)
                            : ''
                    }`,
            )
            .join('\n')

        if (throwOnError) {
            throw new Error(
                `markdownlint configuration failed validation:\n${msg}`,
            )
        } else {
            LOGGER.error(
                `markdownlint configuration failed validation:\n${msg}`,
            )
        }
    }

    return {
        errors,
        valid: _valid,
    }
}

export const processConfiguration = async (
    config: MarkdownlintConfiguration,
    opts: MarkdownlintOpts = DEFAULT_OPTS,
): Promise<MarkdownlintProcessedResult> => {
    const {
        ajvOptions,
        strictValidation,
        throwOnError,
        useBaseConfig,
        useDefault,
    }: MarkdownlintOptsOutput = parseOptionsSchema(markdownlintOptsSchema, opts)

    const _normalized_config: MarkdownlintConfiguration = {
        ...config,
        config: getMergedRuleConfiguration(config.config, {
            useBaseConfig,
            useDefault,
        }),
    }
    const validation_results = await validateFullConfiguration(
        _normalized_config,
        { ajvOptions, strictValidation, throwOnError },
    )
    return {
        config: _normalized_config,
        ...validation_results,
    }
}

export const getConfiguration = async (
    config: MarkdownlintConfiguration,
    opts: MarkdownlintOpts = DEFAULT_OPTS,
): Promise<MarkdownlintConfiguration | undefined> => {
    const { throwOnError = false }: MarkdownlintOptsOutput = parseOptionsSchema(
        markdownlintOptsSchema,
        opts,
    )
    const _result = await processConfiguration(config, opts)
    if (!_result.valid && throwOnError)
        throw new Error('Configuration is invalid')
    else if (!_result.valid && !throwOnError)
        logger().error('Configuration is invalid')
    else if (_result.valid) {
        return _result.config
    }
    return undefined
}
