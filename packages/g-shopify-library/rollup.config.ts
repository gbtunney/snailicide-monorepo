import { rollup } from '@snailicide/build-config'
import { RollupOptions } from 'rollup'

import pkg from './package.json' assert { type: 'json' }

const LIBRARY_NAME: string = 'GShopifyLibrary'
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
                library_name: LIBRARY_NAME,
            },
        ],
        rollup.DEFAULT_PLUGINS_BUNDLED,
        pkg,
    ),
]

const CONFIG: Array<RollupOptions> = rollup.getRollupConfig(CONFIG_OBJ)
rollup.getPackageExports(CONFIG_OBJ, PRINT_EXPORTS)

export default CONFIG
