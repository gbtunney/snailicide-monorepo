/**
 * A Node.js command line interface and style checker / lint tool for Markdown files.
 *
 * @see [igorshubovych/markdownlint-cli:](https://github.com/igorshubovych/markdownlint-cli)
 * @see [davidAnson/markdownlint](https://github.com/DavidAnson/markdownlint)
 * todo: format front-matter?
 * @todo Validate the schema ! function! important!
 */
import type { Configuration } from 'markdownlint'
import { JsonObject } from 'type-fest'
import { importJSON } from './../utilities.js'
import { getMarkdownlintRuleConfiguration, MarkdownLintConfig } from './config.js'
import { isPlainObject, safeDeserializeJSON } from '../utilities.js'
import { configMD, getConfigMD } from './validator.js'

export type { MarkdownLintConfig } from './config.js'

export const markdownlintConfig: (options: MarkdownLintConfig) => MarkdownLintConfig = (
  options: MarkdownLintConfig,
): MarkdownLintConfig => getMarkdownlintRuleConfiguration(options)

export interface MarkdownlintAPI {
  config: (opts?: MarkdownLintConfig<'loose'>) => MarkdownLintConfig<'loose'>
  validate: typeof getConfigMD
  build: (options: MarkdownLintConfig) => MarkdownLintConfig
}

export const markdownlint: MarkdownlintAPI = {
  config: configMD,
  validate: getConfigMD,
  build: markdownlintConfig,
}

export const markdownLintConfigJson: (
  options?: Omit<MarkdownLintConfig, 'default'>,
  useDefault?: boolean,
  useBaseConfig?: boolean,
) => JsonObject = (
  options: Omit<MarkdownLintConfig, 'default'> = {},
  useDefault: boolean = true,
  useBaseConfig: boolean = true,
): JsonObject => {
  const _options = getMarkdownlintRuleConfiguration(
    options as MarkdownLintConfig<'loose'>,
    false,
    useBaseConfig,
    useDefault,
  )
  if (_options && isPlainObject<JsonObject>(_options)) {
    const result = safeDeserializeJSON<JsonObject>(_options)
    return result ?? {}
  }
  return {}
}

