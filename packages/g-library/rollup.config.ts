import { RollupOptions, OutputOptions, InternalModuleFormat } from 'rollup'
import ts from 'rollup-plugin-ts'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeExternals } from 'rollup-plugin-node-externals'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import terser from '@rollup/plugin-terser'
import path from 'path'
import { unflatten } from 'flat'
import { omit } from 'ramda'
import { merge as deepmerge } from 'ts-deepmerge'
import pkg from './package.json' assert { type: 'json' }

//TODO: MOVE THIS TO BUILD-CONFIG
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
    | 'types'
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
const getOutfileName = (
    _export_key: string,
    _out_file_name_override: undefined | string = undefined,
) => {
    return _out_file_name_override !== undefined
        ? _out_file_name_override
        : getExportKey(_export_key) === '.'
          ? 'index'
          : getExportKey(_export_key)
}
const getExportKey = (_export_key: string) => {
    return _export_key === '.' || _export_key === '*' || _export_key === 'main'
        ? '.'
        : _export_key.charAt(0) !== '.'
          ? `./${_export_key}`
          : _export_key
}
const addMinFileExtension = (_value: string, insert_value: string = '.min') => {
    const insert = (
        value: string,
        replace_value: string = '',
        index: number = 0,
    ) => {
        return index > 0
            ? `${value.substring(0, index)}${replace_value}${value.substring(index, value.length)}`
            : value
    }
    const myMatch: null | RegExpMatchArray = _value.match(
        new RegExp(/\.[a-z]{2,7}$/),
    )
    if (myMatch !== null && myMatch.index !== undefined) {
        return insert(_value, insert_value, myMatch.index)
    }
    return 'ERROR'
}
type EntryConfig = {
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

const getOutputObj = (
    entry: EntryConfig,
    package_json = pkg,
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
                              plugins: [terser()],
                          }),
                      ]
                    : []),
                mainOutputObject,
            ]
            return [
                ...acc,
                ...(value.export_type !== 'types' ? newOutputArray : []),
            ]
        }, []),
    }
    return { exportObj: unflatten(export_object, { delimiter: '_' }), config }
}

//TODO?change thhis for concise
//const inputConfig :EntryConfig =

const CDN_PLUGINS_LIST = [
    ts({
        browserslist: false,
        tsconfig: (resolvedConfig) => ({
            ...resolvedConfig,
            declaration: true,
            allowJs: false,
            sourceMap: true,
        }) /* Plugin options */,
    }),
    json(),
    //nodePolyfills(),
    // nodeExternals({ }),
    nodeResolve({ browser: true }), // so Rollup can find `ms`
    commonjs({ requireReturnsDefault: 'auto' }), // <---- this solves default issue), // so Rollup can convert `ms` to an ES modulefilesize(),
]

const RESOLVED_PLUGINS_LIST = [
    ts({
        browserslist: false,
        tsconfig: (resolvedConfig) => {
            //  console.log("THE RESOLVRDF CONGIG ", resolvedConfig);
            return {
                ...resolvedConfig,
                declaration: true,
                allowJs: false,
                sourceMap: true,
            }
        } /* Plugin options */,
    }),
    json(),
    nodePolyfills(),
    nodeExternals({}),
    //TODO: FIX SO things are being bundled properly?
    nodeResolve({ preferBuiltins: true }), // so Rollup can find `ms`
    commonjs({ requireReturnsDefault: 'auto' }), // <---- this solves default issue), // so Rollup can convert `ms` to an ES modulefilesize(),
]
const getDirectoryObj = {
    source_dir: './src/',
    output_dir: './dist/',
}

const outputObjectsArr = [
    {
        ...getOutputObj({
            source_dir: './src/',
            output_dir: './dist/',
            export_types: ['default', 'import', 'require', 'types'],
            export_key: '*',
            library_name: 'gLibrary',
        }),
        plugins: RESOLVED_PLUGINS_LIST,
    },
    {
        ...getOutputObj({
            ...getDirectoryObj,
            export_types: ['default', 'import', 'require', 'types'],
            export_key: 'node',
            library_name: 'gLibraryNode',
        }),
        plugins: RESOLVED_PLUGINS_LIST,
    },
    {
        ...getOutputObj({
            ...getDirectoryObj,
            export_types: [
                'browser_import',
                'browser_default',
                'browser_umd',
                'types',
            ],
            out_file_name_override: 'cdn-index',
            export_key: '*',
            library_name: 'gLibrary',
            overrides: {
                minify: true,
            },
        }),
        plugins: CDN_PLUGINS_LIST,
    },
]
const CONFIG: RollupOptions[] = outputObjectsArr.map((item): RollupOptions => {
    const { plugins, config } = item
    return {
        ...config,
        plugins,
    }
})

const result = outputObjectsArr.reduce<Record<string, {}>>((acc, value) => {
    const obj = value.exportObj
    return deepmerge(acc, value.exportObj)
}, {})
console.log('IMPORTS OBJECT', JSON.stringify(result))
export default CONFIG
