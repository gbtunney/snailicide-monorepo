import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import { OutputOptions,RollupOptions } from 'rollup'
import filesize from 'rollup-plugin-filesize'
import { nodeExternals } from 'rollup-plugin-node-externals'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import typescript2 from 'rollup-plugin-typescript2'

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
            file: pkg.main.replace('.js', '.mjs'),
            format: 'esm',
        }),
        /* * CJS * */
        createOutputOptions({
            file: pkg.main.replace('.js', '.cjs'),
            format: 'commonjs',
        }),
    ],
    plugins: [
        typescript2({
            useTsconfigDeclarationDir: true,
            tsconfig: './tsconfig.json',
        }),
        json(),
        nodePolyfills(),
        nodeExternals(),
        //TODO: FIX SO things are being bundled properly?
        nodeResolve({ preferBuiltins: true }), // so Rollup can find `ms`
        commonjs(), // so Rollup can convert `ms` to an ES modulefilesize(),
        filesize(),
    ],
}

export default config
