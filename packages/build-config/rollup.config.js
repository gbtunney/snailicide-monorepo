// @ts-check

import typescript2 from 'rollup-plugin-typescript2'
import shell from 'shelljs'
import { Prettier, EsLint, Jest, nodeUtils } from './dist/index.js'

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
function createOutputOptions(options) {
    return {
        banner,
        name: 'snailicideGLibrary',
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
    {
        data: Jest,
        filename: 'jest.config.json',
    },
]

const copyTSConfig = () => {
    //shell.cp('-R', 'stuff/', 'out/Release');
    shell.cp('./src/tsconfig/tsconfig-base.json', '.')
}

/** @type {import('rollup').RollupOptions} */
const rollUp = () => {
    copyTSConfig()
    /* *export config as JSON if FLAGGED using jsonExportConfig * */
    if (jsonExportConfig && jsonExportConfig.length > 0) {
        nodeUtils.exportJSON(jsonExportConfig, './dist')
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
            createOutputOptions({
                file: './dist/index.esm.js',
                format: 'esm',
            }),
        ],
        plugins: [
            typescript2({
                clean: true,
                useTsconfigDeclarationDir: true,
                tsconfig: './src/tsconfig.json',
            }),
        ],
    }
    return options
}

export default rollUp()
