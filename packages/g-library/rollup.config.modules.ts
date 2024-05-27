import typescript2 from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { nodeExternals } from 'rollup-plugin-node-externals'
import filesize from 'rollup-plugin-filesize'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import terser from '@rollup/plugin-terser'
import { RollupOptions, OutputOptions } from 'rollup'
import commonjs from '@rollup/plugin-commonjs'

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
        name: 'GLibraryString',
        exports: 'named',
        sourcemap: true,
        ...options,
    }
}
const config: RollupOptions[] = [
    {
        input: 'src/index-browser.ts',
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
            //nodePolyfills(),
            // nodeExternals(),
            nodeResolve({ browser: true }), //makes the esm file bundle properly
            commonjs({
                // include: /node_modules/,
                requireReturnsDefault: 'auto', // <---- this solves default issue
            }),
            filesize,
        ],
    },
]

export default config
