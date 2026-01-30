import { merge as deepmerge } from 'ts-deepmerge'

import { getBaseConfig } from './base.config.js'
import {
    DEFAULT_OPTS,
    loadJSONSchema,
    logger,
    MarkdownlintOpts,
    MarkdownlintOptsOutput,
    markdownlintOptsSchema,
    type MarkdownlintProcessedResult,
    type MarkdownlintRuleConfiguration,
    MarkdownlintRuleOpts,
    MarkdownlintRuleOptsOutput,
    markdownlintRuleOptsSchema,
    MDLINT_CLI2_RULES_JSON_SCHEMA,
    parseOptionsSchema,
} from './schema.js'
import { getAjvValidator, type ValidationErrorObject } from './validator.js'
/*
export type MarkdownlintConfiguration = Omit<MarkdownlintCli2ConfigurationSchema,'config'> & {config: MarkdownlintRuleConfiguration }
export type MarkdownlintRuleConfigurationInput = Omit<OmitIndexSignature<MarkdownlintConfigurationSchema>,"">//  ;(workingSchema as any).additionalProperties = allowAdditionalProperties

export type MarkdownlintRuleConfiguration = Omit<OmitIndexSignature<MarkdownlintConfigurationSchema>,"$schema">& {
  // Force presence of default for “strict” usage
  default: boolean
}*/

// OmitIndexSignature<Omit<MarkdownlintConfigurationSchema, '$schema'|'default'>>

/**
 * Unused. Strict rule settings only (no cli2 extras, no category shortcut flags). Aliases like "heading-increment" are
 * omitted; add includeAliases if needed later.
 */
export type MarkdownlintRuleConfigurationNoAliases = Omit<
    MarkdownlintRuleConfiguration,
    | '$schema'
    | 'headings'
    | 'bullet'
    | 'ul'
    | 'indentation'
    | 'whitespace'
    | 'hard_tab'
    | 'links'
    | 'blank_lines'
    | 'line_length'
    | 'code'
    | 'atx'
    | 'spaces'
    | 'atx_closed'
    | 'blockquote'
    | 'ol'
    | 'html'
    | 'url'
    | 'hr'
    | 'emphasis'
    | 'language'
    | 'spelling'
    | 'accessibility'
    | 'images'
    | 'table'
> & {
    /** Force presence of default for “strict” usage */
    default: boolean
}

export const validateRuleConfiguration = async (
    rules: MarkdownlintRuleConfiguration,
    opts: MarkdownlintOpts = DEFAULT_OPTS,
): Promise<
    Omit<MarkdownlintProcessedResult<MarkdownlintRuleConfiguration>, 'config'>
> => {
    const {
        ajvOptions,
        strictValidation,
        throwOnError,
    }: MarkdownlintOptsOutput = parseOptionsSchema(markdownlintOptsSchema, opts)

    const schemaJson = await loadJSONSchema(MDLINT_CLI2_RULES_JSON_SCHEMA)
    const validateFn = getAjvValidator(schemaJson, strictValidation, ajvOptions)
    const _valid: boolean = validateFn(rules)
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
            logger().error(
                `markdownlint configuration failed validation:\n${msg}`,
            )
        }
    }

    return {
        errors,
        valid: _valid,
    }
}

export const processRuleConfiguration = async (
    rules: MarkdownlintRuleConfiguration,
    opts: MarkdownlintOpts = DEFAULT_OPTS,
): Promise<MarkdownlintProcessedResult<MarkdownlintRuleConfiguration>> => {
    const {
        ajvOptions,
        strictValidation,
        throwOnError,
        useBaseConfig,
        useDefault,
    }: MarkdownlintOptsOutput = parseOptionsSchema(markdownlintOptsSchema, opts)

    const _normalized_rules_config: MarkdownlintRuleConfiguration =
        getMergedRuleConfiguration(rules, { useBaseConfig, useDefault })
    const validation_results = await validateRuleConfiguration(
        _normalized_rules_config,
        { ajvOptions, strictValidation, throwOnError },
    )
    return {
        config: _normalized_rules_config,
        ...validation_results,
    }
}

export const getRuleConfiguration = async (
    rules: MarkdownlintRuleConfiguration,
    opts: MarkdownlintOpts = DEFAULT_OPTS,
): Promise<MarkdownlintRuleConfiguration | undefined> => {
    const { throwOnError = false }: MarkdownlintOptsOutput = parseOptionsSchema(
        markdownlintOptsSchema,
        opts,
    )
    const _result = await processRuleConfiguration(rules, opts)
    if (!_result.valid && throwOnError)
        throw new Error('Configuration is invalid')
    if (!_result.valid && !throwOnError)
        logger().error('Configuration is invalid')

    if (_result.valid) {
        return _result.config
    }
    return undefined
}

export const getMergedRuleConfiguration = (
    rules: MarkdownlintRuleConfiguration,
    opts: MarkdownlintRuleOpts = {},
): MarkdownlintRuleConfiguration => {
    const { useBaseConfig, useDefault }: MarkdownlintRuleOptsOutput =
        parseOptionsSchema(markdownlintRuleOptsSchema, opts)

    const baseConfig = getBaseConfig()

    const withDefault: MarkdownlintRuleConfiguration = Object.assign(rules, {
        default: useDefault,
    })
    const merged: MarkdownlintRuleConfiguration = !useBaseConfig
        ? withDefault
        : (deepmerge(baseConfig, withDefault) as MarkdownlintRuleConfiguration)
    return merged
}

export type { MarkdownlintRuleConfiguration } from './schema.js'
