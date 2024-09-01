/**
 * A Node.js command line interface and style checker / lint tool for Markdown
 * files.
 *
 * @see [igorshubovych/markdownlint-cli:](https://github.com/igorshubovych/markdownlint-cli)
 * @see [davidAnson/markdownlint](https://github.com/DavidAnson/markdownlint)
 * todo: format front-matter?
 */
import type { Configuration } from 'markdownlint'
import { JsonObject } from 'type-fest'

import type { UndefinedOnPartialDeep } from 'type-fest'
import { getRules } from './config.js'
import { isPlainObject, safeDeserializeJSON } from '../utilities.js'

export type MarkdownLintConfig = UndefinedOnPartialDeep<Configuration>
export const markdownlintConfig = (
    options: MarkdownLintConfig,
): MarkdownLintConfig => getRules(options)

/** @internal */
export const markdownlint = {
    config: markdownlintConfig,
}

export const markdownLintConfigJson = (
    _options: MarkdownLintConfig,
): JsonObject | undefined => {
    const options: MarkdownLintConfig = getRules(_options)
    if (options !== undefined && isPlainObject(options)) {
        const __obj: JsonObject | undefined =
            safeDeserializeJSON<MarkdownLintConfig>(options)
        return __obj !== undefined ? __obj : {}
    }
    return undefined
}
