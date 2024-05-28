import {
    Plugin,
    RollupOptions,
    OutputOptions,
    InternalModuleFormat,
} from 'rollup'
import ts from 'rollup-plugin-ts'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeExternals } from 'rollup-plugin-node-externals'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import terser from '@rollup/plugin-terser'
import path from 'path'

import pkg from './package.json' assert { type: 'json' }

/** Comment with library information to be appended in the generated bundles. */
const get_banner = (library_name: string, package_json: typeof pkg = pkg) => {
    return `/*
 * ${package_json.name} v${package_json.version}
 * Module: ${library_name}
 * (c) ${new Date().getFullYear()} - ${package_json.author.name}
 * Description: ${package_json.description},
 * Github: ${package_json.repository.url}
 * Released under the ${package_json.license} License.
 * Build: ${new Date().toLocaleString()}
 */`
}

const createOutputOptions = (
    options: Partial<OutputOptions>,
): OutputOptions => {
    return { name: 'gLibrary', exports: 'named', sourcemap: true, ...options }
}
type KeyData = {
    extension: string
    internal_format: InternalModuleFormat
    module_format: string
}

type ExportType =
    | 'require'
    | 'import'
    | 'default'
    | 'browser_default'
    | 'browser_import'
    | 'browser_umd'
const export_key_lookup: Record<ExportType, KeyData> = {
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
    /* types: {
        extension: 'd.ts',
        internal_format: "ts",
        module_format: "typescript"
    },*/
    browser_default: {
        extension: '-iife.js',
        internal_format: 'iife',
        module_format: 'iife',
    },
    browser_import: {
        extension: '.js',
        internal_format: 'es',
        module_format: 'esm',
    },
    browser_umd: {
        extension: 'umd.js',
        internal_format: 'umd',
        module_format: 'umd',
    },
}

type EntryConfig = {
    export_key: '*' | 'main' | string
    export_types: ExportType[]
    source_dir: string
    output_dir: string
    library_name: string
    //overridess
    overrides?: Partial<OutputOptions>
    //minify: true,
}

const getOutputObj = (
    entry: EntryConfig,
    package_json = pkg,
): {
    exportObj: Record<string, Record<string, string>>
    config: RollupOptions
} => {
    const { export_key, source_dir, output_dir } = entry
    const filename =
        export_key === '*' || export_key === 'main' ? 'index' : export_key
    const source_file = path.resolve(`${source_dir}/${filename}.ts`)
    const overrides = entry.overrides !== undefined ? entry.overrides : {}

    //expand output objects by export type
    type ExpandedExportType = {
        export_type: ExportType
        file: string
        format: InternalModuleFormat
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
            return {
                export_type,
                file,
                format,
            }
        },
    )

    ///Record<export_key, Record<export_types, file>     >
    const export_object = {
        [export_key]: expandedExportTypes.reduce<Record<string, string>>(
            (acc, value: ExpandedExportType) => {
                type Dummy = Record<ExportType, string>
                return {
                    ...acc,
                    [value.export_type]: path.relative('.', value.file), //processTranscriptionSlice(value)
                }
            },
            {},
        ),
    }
    const config = {
        input: source_file,
        output: expandedExportTypes.map((value) => {
            return createOutputOptions({
                ...overrides,
                name: entry.library_name,
                file: value.file,
                format: value.format,
            })
        }),
    }
    return { exportObj: export_object, config }
}

//TODO?change thhis for concise
//const inputConfig :EntryConfig =

const inner_index_config = getOutputObj({
    source_dir: './src/',
    output_dir: './dist/',
    export_types: ['default', 'import', 'require'],
    export_key: '*',
    library_name: 'gLibrary',
})
console.log('EXPORTS OBBJECT', inner_index_config.exportObj)

const index_config: RollupOptions = {
    ...inner_index_config.config,
    plugins: [
        ts({
            browserslist: false,
            tsconfig: (resolvedConfig) => ({
                ...resolvedConfig,
                declaration: true,
                allowJs: false,
            }) /* Plugin options */,
        }),
        json(),
        nodePolyfills(),
        nodeExternals({}),
        //TODO: FIX SO things are being bundled properly?
        nodeResolve({ preferBuiltins: true }), // so Rollup can find `ms`
        commonjs({ requireReturnsDefault: 'auto' }), // <---- this solves default issue), // so Rollup can convert `ms` to an ES modulefilesize(),
    ],
}

const node_config_obj = getOutputObj({
    source_dir: './src/',
    output_dir: './dist/',
    export_types: ['default', 'import', 'require'],
    export_key: 'node',
    library_name: 'gLibraryNode',
})
console.log('NODE EXPORTS OBBJECT', node_config_obj.exportObj)

const node_config: RollupOptions = {
    ...node_config_obj.config,
    plugins: [
        ts({
            browserslist: false,
            tsconfig: (resolvedConfig) => ({
                ...resolvedConfig,
                declaration: true,
                allowJs: false,
            }) /* Plugin options */,
        }),
        json(),
        nodePolyfills(),
        nodeExternals({}),
        //TODO: FIX SO things are being bundled properly?
        nodeResolve({ preferBuiltins: true }), // so Rollup can find `ms`
        commonjs({ requireReturnsDefault: 'auto' }), // <---- this solves default issue), // so Rollup can convert `ms` to an ES modulefilesize(),
    ],
}

///web obj
const inner_cdn_config = getOutputObj({
    source_dir: './src/',
    output_dir: './dist/cdn',
    export_types: [
        'browser_import',
        'browser_default',
        'default',
        'browser_umd',
    ],
    export_key: '*',
    library_name: 'gLibrary',
})
console.log('CDN OBBJECT', inner_cdn_config.exportObj)

const cdn_config: RollupOptions = {
    ...inner_cdn_config.config,
    plugins: [
        ts({
            browserslist: false,
            tsconfig: (resolvedConfig) => ({
                ...resolvedConfig,
                declaration: true,
                allowJs: false,
            }) /* Plugin options */,
        }),
        json(),
        //nodePolyfills(),
        // nodeExternals({ }),
        nodeResolve({ browser: true }), // so Rollup can find `ms`
        commonjs({ requireReturnsDefault: 'auto' }), // <---- this solves default issue), // so Rollup can convert `ms` to an ES modulefilesize(),
    ],
}
export default [index_config, node_config, cdn_config]
