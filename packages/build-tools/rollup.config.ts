import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import { OutputOptions, Plugin, RollupOptions } from 'rollup'
import filesize from 'rollup-plugin-filesize'
import { nodeExternals } from 'rollup-plugin-node-externals'
import nodePolyfills from 'rollup-plugin-polyfill-node'

import pkg from './package.json' assert { type: 'json' }
import { rollup } from './types/index.js'

const Filesize: Plugin<typeof filesize> = filesize
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
        commonjs({
            transformMixedEsModules: true,
            dynamicRequireTargets: [
                // include using a glob pattern (either a string or an array of strings)
                '**/node_modules/.pnpm/terser*/*.js',
                'node_modules/terser/lib/*.js',

                // exclude files that are known to not be required dynamically, this allows for better optimizations
                //'!node_modules/logform/index.js',
                //  '!node_modules/logform/format.js',
                // '!node_modules/logform/levels.js',
                // '!node_modules/logform/browser.js'
            ],
        }), // so Rollup can convert `ms` to an ES modulefilesize(),

        json(),

        //TODO: FIX SO things are being bundled properly?
        nodeResolve({ preferBuiltins: true }), // so Rollup can find `ms`

        nodePolyfills(),
        nodeExternals(),
        rollup.PLUGINS_CONFIG.typescriptTS(
            rollup.getPluginConfiguration('typescriptTS')?.options,
        ),
        Filesize,
    ],
}

export default config
