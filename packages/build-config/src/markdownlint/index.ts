/**
 * A Node.js command line interface and style checker / lint tool for Markdown files.
 *
 * @see [igorshubovych/markdownlint-cli:](https://github.com/igorshubovych/markdownlint-cli)
 * @see [davidAnson/markdownlint](https://github.com/DavidAnson/markdownlint)
 * todo: format front-matter?
 * @todo Validate the schema ! function! important!
 */
import { JsonObject } from 'type-fest'

import { getBaseConfig } from './base.config.js'
import {
    getConfiguration,
    processConfiguration,
    validateFullConfiguration,
} from './configuration.js'
import {
    getRuleConfiguration,
    processRuleConfiguration,
    validateRuleConfiguration,
} from './rules.js'
import {
    DEFAULT_OPTS,
    type MarkdownlintConfiguration,
    MarkdownlintOpts,
} from './schema.js'
import { isPlainObject, safeDeserializeJSON } from '../utilities.js'

export type MarkdownlintAPI = {
    rules: {
        config: typeof getRuleConfiguration
        get: typeof getRuleConfiguration
        validate: typeof validateRuleConfiguration
        build: typeof processRuleConfiguration
        baseConfig: typeof getBaseConfig
    }
    config: {
        get: typeof getConfiguration
        validate: typeof validateFullConfiguration
        build: typeof processConfiguration
    }
}

export const markdownlint: MarkdownlintAPI = {
    config: {
        build: processConfiguration,
        get: getConfiguration,
        validate: validateFullConfiguration,
    },
    rules: {
        baseConfig: getBaseConfig,
        build: processRuleConfiguration,
        config: getRuleConfiguration,
        get: getRuleConfiguration,
        validate: validateRuleConfiguration,
    },
}

export const markdownLintConfigJson = async (
    config: MarkdownlintConfiguration,
    opts: MarkdownlintOpts = DEFAULT_OPTS,
): Promise<JsonObject> => {
    const _result = await processConfiguration(config, opts)

    if (_result.valid && isPlainObject<JsonObject>(_result.config)) {
        const result = safeDeserializeJSON<JsonObject>(_result.config)
        return result ?? {}
    }
    return {}
}

export type {
    MarkdownlintCli2ConfigurationSchema,
    MarkdownlintConfigurationSchema,
} from './markdownlint.config.js'
export type {
    MarkdownlintConfiguration,
    MarkdownlintOpts,
    MarkdownlintProcessedResult,
    MarkdownlintRuleConfiguration,
} from './schema.js'
