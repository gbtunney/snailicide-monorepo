/* * A COLLECTIOB of esbuild utilities * */
import type { BuildOptions } from 'esbuild'

type JSONExportEntry<T = unknown> = {
    data: T
    filename: string
}
export type JSONExportConfig = JSONExportEntry[]

export type BuildConfig = Required<
    Pick<BuildOptions, 'outdir' | 'logLevel' | 'watch'>
> & {
    baseDirectory?: string
    staticfiles?: string
    deleteOutDir?: boolean
    exportESM?: boolean
    exportMJS?: boolean
    exportCJS?: boolean
}

export type EntryConfig = BuildOptions

export { nodeUtils } from './nodeutils.js'
