import typescript2 from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { nodeExternals } from 'rollup-plugin-node-externals'
import filesize from 'rollup-plugin-filesize'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import terser from '@rollup/plugin-terser'
import { RollupOptions, OutputOptions } from 'rollup'

import pkg from './package.json' assert { type: 'json' }

/** Comment with library information to be appended in the generated bundles. */
const bannerbk = `/*
 * ${pkg.name} v${pkg.version}
 * (c) ${new Date().getFullYear()} - ${pkg.author.name}
 * Released under the ${pkg.license} License.
 * Build: ${new Date().toLocaleString()}
 */`

const banner = '/*return*/'

const createOutputOptions = (
    options: Partial<OutputOptions>,
): OutputOptions => {
    return {
        name: 'GLibrary',
        exports: 'named',
        sourcemap: true,
        ...options,
    }
}
const config: RollupOptions = {
    input: 'src/string/index.ts',
    output: [
        /* /!* * ESM - MAIN  * *!/
        createOutputOptions({
            file: pkg.main,
            format: 'esm',
        }),
        /!* * ESM - MINIFIED  * *!/
        createOutputOptions({
            file: pkg.main.replace('.js', '.min.js'),
            format: 'esm',
            sourcemap: false,
            plugins: [terser()],
        }),
        /!* * MJS * *!/
        createOutputOptions({
            file: pkg.module,
            format: 'esm',
        }),
        /!* * CJS * *!/
        createOutputOptions({
            file: pkg.commonjs,
            format: 'commonjs',
        }),*/
        /* * IIFE CDN * */
        createOutputOptions({
            file: './dist/string-node/index.esm.js', //pkg.main.replace('.js', '-iife.js'),
            format: 'esm',
            sourcemap: true,
        }),
        createOutputOptions({
            file: './dist/string-node/index.iife.js', //pkg.main.replace('.js', '-iife.js'),
            format: 'iife',
            sourcemap: true,
        }),
        /* * IIFE for CDN - MINIFIED  * */
        createOutputOptions({
            file: './dist/string-node/index.iife.min.js',
            format: 'iife',
            sourcemap: false,
            plugins: [terser()],
        }),
    ],
    plugins: [
        typescript2({
            useTsconfigDeclarationDir: false,
            tsconfig: './tsconfig.json',
        }),
        json(),
        //  nodePolyfills(),
        // nodeExternals(),
        //TODO: FIX SO things are being bundled properly?
        nodeResolve({ preferBuiltins: false }), // so Rollup can find `ms`
        // commonjs(), // so Rollup can convert `ms` to an ES modulefilesize(),
        filesize(),
    ],
}

export default config
