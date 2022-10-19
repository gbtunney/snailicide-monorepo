// @ts-check

import { terser } from 'rollup-plugin-terser'
import typescript2 from 'rollup-plugin-typescript2'

/** Comment with library information to be appended in the generated bundles. */
const banner = `/*
 * @snailicide/g-library v0.0.1
 * (c) 2022 - Gillian Tunney
 * Released under the MIT License.
 */`

/**
 * Creates an output options object for Rollup.js.
 *
 * @param options
 * @returns
 */
function createOutputOptions(options) {
    return {
        banner,
        name: 'snailicideGLibrary',
        exports: 'named',
        sourcemap: true,
        ...options,
    }
}

/** @type {import('rollup').RollupOptions} */
const options = {
    input: './src/index.ts',
    output: [
        createOutputOptions({
            file: './dist/index.js',
            format: 'commonjs',
        }),
        createOutputOptions({
            file: './dist/index.cjs',
            format: 'commonjs',
        }),
        createOutputOptions({
            file: './dist/index.mjs',
            format: 'esm',
        }),
        createOutputOptions({
            file: './dist/index.esm.js',
            format: 'esm',
        }),
        createOutputOptions({
            file: './dist/index.umd.js',
            format: 'umd',
        }),
        createOutputOptions({
            file: './dist/index.umd.min.js',
            format: 'umd',
            plugins: [terser()],
        }),
    ],
    plugins: [
        typescript2({
            clean: true,
            useTsconfigDeclarationDir: true,
            tsconfig: './tsconfig',
        }),
    ],
}

export default options
