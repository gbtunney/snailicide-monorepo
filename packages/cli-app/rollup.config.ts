import { rollup } from '@snailicide/build-tools'
import { RollupOptions } from 'rollup'

import pkg from './package.json' assert { type: 'json' }

const PRINT_EXPORTS: boolean = true

const directory_paths = {
    source_dir: './src/',
    output_dir: './dist/',
}

const CONFIG_OBJ = [
    ...rollup.getConfigEntries(
        directory_paths,
        [
            {
                export_types: ['default', 'import', 'require', 'types'],
                export_key: '*',
                library_name: 'gCliApp',
            },
        ],
        /* [

           typescript({ compilerOptions: { jsx: 'preserve' } }),
           rollup.getPluginConfiguration("json")?.plugin_configured,
           rollup.getPluginConfiguration('commonJS')?.plugin_configured,
        //


      ],*/
        [...rollup.DEFAULT_PLUGINS_BUNDLED],
        pkg,
    ),
]

/*  export_types: [
                'browser_import',
                'browser_default',
                'browser_umd',
                'browser_types',
            ],
            out_file_name_override: 'cdn-index',
            export_key: '*',
            library_name: 'gLibrary',
            overrides: {
                minify: true,
            },*/
const CONFIG: RollupOptions[] = rollup.getRollupConfig(CONFIG_OBJ)
rollup.getPackageExports(CONFIG_OBJ, PRINT_EXPORTS)

export default CONFIG
