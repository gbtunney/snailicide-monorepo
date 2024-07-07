import { unflatten } from 'flat'
import path from 'path'
import { omit } from 'ramda'
import { InternalModuleFormat, OutputOptions, RollupOptions } from 'rollup'
import { merge as deepmerge } from 'ts-deepmerge'
import { JsonValue } from 'type-fest'

import { isNPMPackage, parseNPMPackage } from '../npm/npm.package.js'
import { BasePackage } from './../npm/index.js'
import {
    addMinFileExtension,
    createOutputOptions,
    getExportKey,
    getOutfileName,
} from './functions.js'
import { getPluginConfiguration, PLUGINS_CONFIG } from './plugins.js'
export {
    getPluginConfiguration,
    PRECONFIGURED_PLUGINS,
    PLUGINS_CONFIG,
} from './plugins.js'
export type { ConfigPlugin, ConfigOptions } from './plugins.js'

/** Comment with library information to be appended in the generated bundles. */
export const get_banner = (
    library_name: string,
    package_json: BasePackage,
    show_error: boolean | 'safe' = true,
): string | undefined => {
    if (isNPMPackage(package_json)) {
        return `/*
 * ${package_json.name} v${package_json.version}
 * Module: ${library_name}
 * (c) ${new Date().getFullYear()} - ${package_json.author.name}
 * Description: ${package_json.description},
 * Github: ${package_json.repository.url}
 * Released under the ${package_json.license} License.
 * Build: ${new Date().toLocaleString()}
 */`
    } else {
        parseNPMPackage(package_json, undefined, show_error)
        return undefined
    }
}

type KeyData = {
    extension: string
    internal_format: InternalModuleFormat
    module_format: string
}

export type ExportType =
    | 'types'
    | 'require'
    | 'import'
    | 'default'
    | 'browser_default'
    | 'browser_types'
    | 'browser_import'
    | 'browser_umd'

export const export_key_lookup: Record<ExportType, KeyData> = {
    require: {
        extension: 'cjs',
        internal_format: 'cjs',
        module_format: 'commonjs',
    },
    import: {
        extension: 'mjs',
        internal_format: 'es',
        module_format: 'module',
    },
    default: {
        extension: 'js',
        internal_format: 'es',
        module_format: 'esm',
    },
    types: {
        extension: '.d.ts',
        internal_format: 'es',
        module_format: 'typescript',
    },
    browser_default: {
        extension: '-iife.js',
        internal_format: 'iife',
        module_format: 'iife',
    },
    browser_types: {
        extension: '.d.ts',
        internal_format: 'es',
        module_format: 'typescript',
    },
    browser_import: {
        extension: '.js',
        internal_format: 'es',
        module_format: 'esm',
    },
    browser_umd: {
        extension: '-umd.js',
        internal_format: 'umd',
        module_format: 'umd',
    },
}

export type EntryConfig = {
    export_key: '.' | '*' | 'main' | string
    in_file_name_override?: string | undefined
    out_file_name_override?:
        | string
        | undefined /** No extension?? overrides the export key in naming the file and the key? */
    export_types: ExportType[]
    source_dir: string
    output_dir: string
    library_name: string
    //overridess
    overrides?: Partial<OutputOptions> & { minify?: boolean }
}

export const getOutputObj = (
    entry: EntryConfig,
    //  package_json :PackageJson,
): {
    exportObj: Record<string, Record<string, string>>
    config: RollupOptions
} => {
    const {
        export_key,
        source_dir,
        output_dir,
        out_file_name_override,
        in_file_name_override,
    }: Pick<
        EntryConfig,
        | 'export_key'
        | 'source_dir'
        | 'output_dir'
        | 'out_file_name_override'
        | 'in_file_name_override'
    > = entry

    const filename = getOutfileName(export_key, out_file_name_override)
    const source_file = path.resolve(
        `${source_dir}/${in_file_name_override !== undefined ? in_file_name_override : getOutfileName(export_key, undefined)}.ts`,
    )
    const overrides: Partial<OutputOptions> & { minify?: boolean } =
        entry.overrides !== undefined ? entry.overrides : {}

    //expand output objects by export type
    type ExpandedExportType = {
        export_type: ExportType
        file: string
        format: InternalModuleFormat
        export_key: string
    }
    //return minimal objects so we can get an export map later
    const expandedExportTypes: ExpandedExportType[] = entry.export_types.map(
        (export_type) => {
            const _extension = export_key_lookup[export_type].extension
            const extension =
                _extension.indexOf('.') === -1 ? `.${_extension}` : _extension
            const file = path.resolve(`${output_dir}/${filename}${extension}`)
            const format: InternalModuleFormat =
                export_key_lookup[export_type].internal_format
            const export_key = entry.export_key
            return {
                export_type,
                file,
                format,
                export_key,
            }
        },
    )

    const export_object = {
        [getExportKey(export_key)]: expandedExportTypes.reduce<
            Record<string, string>
        >((acc, value: ExpandedExportType) => {
            return {
                ...acc,
                [value.export_type]: `./${path.relative('.', value.file)}`, //processTranscriptionSlice(value)
            }
        }, {}),
    }

    const config = {
        input: source_file,
        output: expandedExportTypes.reduce<OutputOptions[]>((acc, value) => {
            const _overrides = omit(['minify'], overrides)

            const mainOutputObject = createOutputOptions({
                ..._overrides,
                name: entry.library_name,
                file: value.file,
                format: value.format,
            })
            const newOutputArray = [
                ...(overrides.minify !== undefined && overrides.minify === true
                    ? /** Add minify options here */
                      [
                          createOutputOptions({
                              ...mainOutputObject,
                              file: addMinFileExtension(value.file),
                              sourcemap: false,
                              //i am assuming right now not configuring plugins idk can switch to deep merge ??
                              plugins: [],
                          }),
                      ]
                    : []),
                mainOutputObject,
            ]
            return [
                ...acc,
                ...(new RegExp(/types/, 'g').test(value.export_type) === false
                    ? newOutputArray
                    : []),
            ]
        }, []),
    }
    return { exportObj: unflatten(export_object, { delimiter: '_' }), config }
}

type OutputObjReturnType = {
    exportObj: Record<string, Record<string, string>>
    config: Omit<RollupOptions, 'plugins'>
}
export const getConfigEntries = (
    directoryObj: Pick<EntryConfig, 'source_dir' | 'output_dir'>,
    entries: Omit<EntryConfig, 'source_dir' | 'output_dir'>[],
    plugins: RollupOptions['plugins'] = [],
    package_json: BasePackage,
): (OutputObjReturnType & {
    plugins: RollupOptions['plugins']
})[] => {
    return entries.map((entry) => {
        const _banner = get_banner(entry.library_name, package_json)

        const banner: string = _banner !== undefined ? _banner : ''
        const inneroverrides =
            entry.overrides !== undefined && banner !== undefined
                ? {
                      ...entry.overrides,
                      banner,
                  }
                : { banner }
        const result: OutputObjReturnType & {
            plugins: RollupOptions['plugins']
        } = {
            ...getOutputObj({
                ...entry,
                ...directoryObj,
                overrides: inneroverrides,
            }),
            plugins,
        }
        return result
    })
}

export const getRollupConfig = (
    args: (OutputObjReturnType & {
        plugins: RollupOptions['plugins']
    })[],
): RollupOptions[] => {
    const _CONFIG: RollupOptions[] = args.map((item): RollupOptions => {
        const { plugins, config } = item
        return {
            ...config,
            plugins,
        }
    })

    return _CONFIG
}

export const getPackageExports = (
    args: (OutputObjReturnType & {
        plugins: RollupOptions['plugins']
    })[],
): JsonValue | undefined => {
    const export_result = args.reduce<Record<string, {}>>((acc, value) => {
        const obj = value.exportObj
        return deepmerge(acc, value.exportObj)
    }, {})
    try {
        const json_value: JsonValue = JSON.parse(JSON.stringify(export_result))
        return json_value
    } catch (e) {
        console.error(e)
        return undefined
    }
}

export const DEFAULT_PLUGINS_BUNDLED = [
    getPluginConfiguration('typescriptTS')?.plugin_configured,
    getPluginConfiguration('json')?.plugin_configured,
    getPluginConfiguration('nodePolyfills')?.plugin_configured,
    getPluginConfiguration('nodeExternals')?.plugin_configured,
    getPluginConfiguration('nodeResolve')?.plugin_configured,
    getPluginConfiguration('commonJS')?.plugin_configured,
]
/*

const CDN_PLUGINS_LIST = [
    ts({
        tsconfig: (resolvedConfig) => ({
            ...resolvedConfig,
            declaration: true,
            allowJs: false,
            sourceMap: true,
        }) /!* Plugin options *!/,
    }),
    json(),
    //nodePolyfills(),
    // nodeExternals({ }),
    nodeResolve({ browser: true }), // so Rollup can find `ms`
    commonjs({ requireReturnsDefault: 'auto' }), // <---- this solves default issue), // so Rollup can convert `ms` to an ES modulefilesize(),
]
*/

export const CDN_PLUGINS_BUNDLED = [
    getPluginConfiguration('typescriptTS')?.plugin_configured,
    getPluginConfiguration('json')?.plugin_configured,
    //  getPluginConfiguration('nodePolyfills')?.plugin_configured,
    /* getPluginConfiguration('nodeExternals')?.plugin({
         deps: false,
     }),*/
    getPluginConfiguration('nodeResolve')?.plugin({ browser: true }),
    getPluginConfiguration('commonJS')?.plugin_configured,
]

/* getPluginConfiguration('typescriptTS')?.plugin_configured,
    getPluginConfiguration('json')?.plugin_configured,
    getPluginConfiguration('nodePolyfills')?.plugin_configured,
    getPluginConfiguration('nodeExternals')?.plugin_configured,
    getPluginConfiguration('nodeResolve')?.plugin_configured,
    getPluginConfiguration('commonJS')?.plugin_configured,
*/
export const rollup = {
    getPluginConfiguration,
    getOutputObj,
    getPackageExports,
    getConfigEntries,
    getRollupConfig,
    get_banner,
    DEFAULT_PLUGINS_BUNDLED,
    CDN_PLUGINS_BUNDLED,
    PLUGINS_CONFIG,
}
export default rollup
