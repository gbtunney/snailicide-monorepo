import { rollup } from '@snailicide/build-tools'
import { RollupOptions } from 'rollup'

import pkg from './package.json' assert { type: 'json' }

const LIBRARY_NAME: string = 'GShopifyLibrary'
const PRINT_EXPORTS: boolean = false

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
                library_name: LIBRARY_NAME,
            },
        ],
        rollup.DEFAULT_PLUGINS_BUNDLED,
        pkg,
    ),
]

const CONFIG: RollupOptions[] = rollup.getRollupConfig(CONFIG_OBJ)
rollup.getPackageExports(CONFIG_OBJ, PRINT_EXPORTS)

export default CONFIG
