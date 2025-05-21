import { rollup } from '@snailicide/build-config'
import { RollupOptions } from 'rollup'

import pkg from './package.json' assert { type: 'json' }

const PRINT_EXPORTS: boolean = false

const directory_paths = {
    output_dir: './dist/',
    source_dir: './src/',
}

const CONFIG_OBJ = [
    ...rollup.getConfigEntries(
        directory_paths,
        [
            {
                export_key: '*',
                export_types: ['default', 'import', 'require', 'types'],
                library_name: 'gLibrary',
            },
            {
                export_key: 'node',
                export_types: ['default', 'import', 'require', 'types'],
                library_name: 'gLibrary:Node',
            },
        ],
        rollup.DEFAULT_PLUGINS_BUNDLED,
        pkg,
    ),
    ...rollup.getConfigEntries(
        directory_paths,
        [
            {
                export_key: '*',
                export_types: [
                    'browser_import',
                    'browser_default',
                    'browser_umd',
                    'browser_types',
                ],
                library_name: 'gLibrary',
                out_file_name_override: 'cdn-index',
                overrides: {
                    minify: true,
                },
            },
        ],
        rollup.CDN_PLUGINS_BUNDLED,
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
const CONFIG: Array<RollupOptions> = rollup.getRollupConfig(CONFIG_OBJ)
rollup.getPackageExports(CONFIG_OBJ, PRINT_EXPORTS)

export default CONFIG
