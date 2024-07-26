/**
 * Typedoc default configurations
 *
 * @module typedoc
 */

import { configMarkdown } from './markdown.js'
import { config } from './standard.js'

export const typedoc = {
    config,
    configMarkdown,
}
export default typedoc
export type { TypedocMarkdownConfig } from './markdown.js'

export type { TypedocConfig } from './standard.js'
