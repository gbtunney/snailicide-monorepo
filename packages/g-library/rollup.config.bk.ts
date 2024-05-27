import typescript2 from 'rollup-plugin-typescript2'
import {
    nodeResolve,
    RollupNodeResolveOptions,
} from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { nodeExternals } from 'rollup-plugin-node-externals'
import filesize from 'rollup-plugin-filesize'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import terser from '@rollup/plugin-terser'
import { RollupOptions, OutputOptions } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'rollup-plugin-dts'
const dts_config = [
    // your default rollup config for transpilation and bundling
    // ...
    {
        // path to your declaration files root
        input: './dist/dts/index.d.ts',
        output: [{ file: 'dist/index.d.ts', format: 'es' }],
        plugins: [dts()],
    },
]
import pkg from './package.json' assert { type: 'json' }

/** Comment with library information to be appended in the generated bundles. */
const get_banner = (export_name: string, package_json: typeof pkg = pkg) => {
    return `/*
 * ${package_json.name} v${package_json.version}
 * Module: ${export_nameexport_name}
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
    return {
        name: 'GLibrary',
        exports: named,
        sourcemap: true,
        ...options,
    }
}
const config: RollupOptions = {
    input: 'src/index.ts',
    output: [
        /* * ESM - MAIN  * */
        createOutputOptions({
            file: pkg.main,
            format: 'esm',
        }),
        /* * ESM - MINIFIED  * */
        createOutputOptions({
            file: pkg.main.replace('.js', '.min.js'),
            format: 'esm',
            sourcemap: false,
            plugins: [terser()],
        }),
        createOutputOptions({
            file: pkg.main.replace('.js', '-iife.js'),
            format: 'iife',
            sourcemap: true,
        }),
        /* * IIFE for CDN - MINIFIED  * */
        createOutputOptions({
            file: pkg.main.replace('.js', '-iife.min.js'),
            format: 'iife',
            sourcemap: false,
            plugins: [terser()],
        }),
    ],
    plugins: [
        typescript2({
            useTsconfigDeclarationDir: true,
            tsconfig: './tsconfig.json',
        }),
        json(),
        //  nodePolyfills(),
        // nodeExternals(),
        //TODO: FIX SO things are being bundled properly?
        nodeResolve({ preferBuiltins: true }), // so Rollup can find `ms`
        // commonjs(), // so Rollup can convert `ms` to an ES modulefilesize(),
        filesize,
    ],
}

const master_output_configs = {}

const fileName = 'dist/batcher.js'
const batch_config: RollupOptions = {
    input: 'src/batchTranscriber/index.ts',
    output: [
        /* * ESM - MAIN  * */
        createOutputOptions({
            file: fileName,
            format: 'esm',
        }),
        /* * ESM - MINIFIED  * */
        createOutputOptions({
            file: fileName.replace('.js', '.min.js'),
            format: 'esm',
            sourcemap: false,
            plugins: [terser()],
        }),
        createOutputOptions({
            file: fileName.replace('.js', '-iife.js'),
            format: 'iife',
            sourcemap: true,
        }),
        /* * IIFE for CDN - MINIFIED  * */
        createOutputOptions({
            file: fileName.replace('.js', '-iife.min.js'),
            format: 'iife',
            sourcemap: false,
            plugins: [terser()],
        }),
    ],
    plugins: [
        typescript2({
            useTsconfigDeclarationDir: true,
            tsconfig: './tsconfig.json',
        }),
        json(),
        //  nodePolyfills(),
        // nodeExternals(),
        //TODO: FIX SO things are being bundled properly?
        nodeResolve({ preferBuiltins: true }), // so Rollup can find `ms`
        // commonjs(), // so Rollup can convert `ms` to an ES modulefilesize(),
        commonjs({
            // include: /node_modules/,
            requireReturnsDefault: 'auto', // <---- this solves default issue
        }),
        filesize,
    ],
}

export default [config, batch_config]
