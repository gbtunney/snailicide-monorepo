import typescript2 from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import filesize from 'rollup-plugin-filesize'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import terser from '@rollup/plugin-terser'
import { RollupOptions, OutputOptions } from 'rollup'

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
        // exports: 'named',
        //sourcemap: true,
        ...options,
    }
}
const config: RollupOptions =
    // browser-friendly UMD build
    {
        input: 'src/index.ts',

        output: [
            createOutputOptions({
                file: pkg.main,
                format: 'esm',
                sourcemap: true,
                plugins: [
                    //  nodePolyfills(),
                    // nodeResolve({ preferBuiltins: true }),
                    //  commonjs(),
                ],
            }),
        ],
        plugins: [
            typescript2({
                useTsconfigDeclarationDir: true,
                tsconfig: './tsconfig.json',
            }),
            json(),
            // nodePolyfills(),
            nodeResolve({ preferBuiltins: true }), // so Rollup can find `ms`
            commonjs(), // so Rollup can convert `ms` to an ES module
            filesize(),
        ],
    }

// CommonJS (for Node) and ES module (for bundlers) build.
// (We could have three entries in the configuration array
// instead of two, but it's quicker to generate multiple
// builds from a single configuration where possible, using
// an array for the `output` option, where we can specify
// `file` and `format` for each target)
/* {
        input: 'src/main.js',
        external: ['ms'],
        output: []
    }*/

export default config
