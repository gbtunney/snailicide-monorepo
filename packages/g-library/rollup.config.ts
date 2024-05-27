import typescript2 from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeExternals } from 'rollup-plugin-node-externals'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import terser from '@rollup/plugin-terser'
import ts from 'rollup-plugin-ts'

import { Plugin, RollupOptions, OutputOptions } from 'rollup'
import pkg from './package.json' assert { type: 'json' }

/** Comment with library information to be appended in the generated bundles. */
const banner = `/*
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} - ${pkg.author.name}
 * Released under the ${pkg.license} License.
 * Build: ${new Date().toLocaleString()}
 */`

const createOutputOptions = (
    options: Partial<OutputOptions>,
): OutputOptions => {
    return {
        banner,
        name: 'GLibrary',
        exports: 'named',
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
        /* * MJS * */
        createOutputOptions({
            file: pkg.module,
            format: 'esm',
        }),
        /* * CJS * */
        createOutputOptions({
            file: pkg.commonjs,
            format: 'commonjs',
        }),
        /* * IIFE CDN * */
        createOutputOptions({
            file: pkg.cdn.replace('.js', `-${pkg.version}.js`),
            format: 'iife',
            // plugins: [terser()],
        }),
        /* * UMD * */
        createOutputOptions({
            file: pkg['umd:main'],
            format: 'umd',
        }),
    ],
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
        // nodePolyfills(),
        // nodeExternals({/*exclude:['type-fest','ramda']*/}),
        //TODO: FIX SO things are being bundled properly?
        nodeResolve({}), // so Rollup can find `ms`
        commonjs({ requireReturnsDefault: 'auto' }), // <---- this solves default issue), // so Rollup can convert `ms` to an ES modulefilesize(),
    ],
}
export default [config]
