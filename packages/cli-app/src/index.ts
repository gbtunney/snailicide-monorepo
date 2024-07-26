export default { app, schema }
export * as app from './app.js'
export { initApp } from './app.js'

import * as app from './app.js'
import * as schema from './schema.js'

export * as schema from './schema.js'
export type {
    AppAliasOption,
    AppOptions,
    ResolvedAppOptions,
    unResolvedAppOptions,
} from './schema.js'
export type { BaseArgs } from './schema.js'
