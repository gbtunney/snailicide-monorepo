import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeExternals } from 'rollup-plugin-node-externals'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import { OutputOptions } from 'rollup'
import ts from 'rollup-plugin-ts'
import shell from 'shelljs'

import { exportJSON, Prettier, EsLint } from './types/index.js'

/** Comment with library information to be appended in the generated bundles. */
const banner = `/*
 * @snailicide/build-config
 * (c) 2022 - Gillian Tunney
 * Released under the MIT License.
 */`

/**
 * Creates an output options object for Rollup.js.
 *
 * @param options
 * @returns
 */
function createOutputOptions(options: OutputOptions) {
    return {
        banner,
        name: 'snailicideBuildConfig',
        exports: 'named',
        sourcemap: true,
        ...options,
    }
}

const jsonExportConfig = [
    {
        data: Prettier.config,
        filename: '.prettierrc.json',
    },
    {
        data: EsLint.typeScriptOptions,
        filename: '.eslintrc.json',
    },
]

const copyTSConfig = () => {
    shell.mkdir('-p', './dist')
    shell.cp('./src/tsconfig/tsconfig-base.json', '.')
}

/** @type {import('rollup').RollupOptions} */
const rollUp = () => {
    copyTSConfig()
    /* *export config as JSON if FLAGGED using jsonExportConfig * */
    if (jsonExportConfig && jsonExportConfig.length > 0) {
        exportJSON(jsonExportConfig, './dist')
    }

    const options = {
        input: './src/index.ts',
        output: [
            createOutputOptions({
                file: './dist/index.js',
                format: 'esm',
            }),
            createOutputOptions({
                file: './dist/index.cjs',
                format: 'commonjs',
            }),
            createOutputOptions({
                file: './dist/index.mjs',
                format: 'esm',
            }),
        ],
        plugins: [
            commonjs(),
            nodePolyfills(),
            nodeExternals(),

            ts({
                tsconfig: (resolvedConfig) => ({
                    ...resolvedConfig,
                    declaration: true,
                    allowJs: false,
                    sourceMap: false,
                }),
            }),
            json(),

            // nodeResolve({ preferBuiltins: true }),
        ],
    }
    return options
}

export default rollUp()
