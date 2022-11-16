import esbuild from 'esbuild'
import copyStaticFiles from 'esbuild-copy-static-files'
import shell from 'shelljs'

import type { JSONExportConfig, BuildConfig, EntryConfig } from './src/index.js'
import { Prettier, EsLint, Jest, nodeUtils } from './src/index.js'

const jsonExportConfig: JSONExportConfig = [
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

const buildCONFIG: BuildConfig = {
    outdir: 'dist',
    staticfilesout: '.',
    staticfiles: './static',
    // deleteOutDir:true,
    exportESM: true,
    exportCJS: true,
    exportMJS: true,
    logLevel: 'info',
    watch: false,
}

const ENTRY_CONFIG: EntryConfig = {
    entryPoints: ['src/eslint/index.ts'],
    //  entryPoints: ["src/.eslintrc.ts", "src/prettier.config.ts","src/jest.config.ts"],
    outdir: buildCONFIG.outdir,
}

export const buildAll = () => {
    const CONFIG_COPY = {
        src: buildCONFIG.staticfiles,
        dest: buildCONFIG.staticfilesout
            ? buildCONFIG.staticfilesout
            : buildCONFIG.outdir,
        dereference: true,
        errorOnExist: false,
        preserveTimestamps: true,
        recursive: true,
    }
    /* * remove / make new outdir build directory if FLAGGED using deleteOutDir * */
    if (buildCONFIG.deleteOutDir) {
        shell.rm('-rf', buildCONFIG.outdir)
        shell.mkdir(buildCONFIG.outdir)
    }
    /* *export config as JSON if FLAGGED using jsonExportConfig * */
    if (jsonExportConfig && jsonExportConfig.length > 0) {
        nodeUtils.exportJSON(jsonExportConfig, buildCONFIG.outdir)
    }

    /* * Copy static files * */
    if (buildCONFIG.staticfiles && buildCONFIG.outdir) {
        esbuild.build({
            entryPoints: ['./index.js'],
            plugins: [copyStaticFiles(CONFIG_COPY)],
        })
    }
}
export default buildAll()
export {}
