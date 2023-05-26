export * as app from './app.js'
export { initApp } from './app.js'
export * as schema from './schema.js'

import * as app from './app.js'
import * as schema from './schema.js'

export default { app, schema }
export type {
    AppOptions,
    AppAliasOption,
    unResolvedAppOptions,
    ResolvedAppOptions,
} from './schema.js'
export type { BaseArgs } from './schema.js'
