import { RollupOptions } from 'rollup'

import pkg from './package.json' assert { type: 'json' }
import { rollup } from './types/index.js'

const PRINT_EXPORTS: boolean = true

const CONFIG_OBJ = rollup.getConfigEntries(
    {
        source_dir: './src/',
        output_dir: './dist/',
    },
    [
        {
            export_types: ['default', 'import', 'require', 'types'],
            export_key: '*',
            library_name: 'gBuildTools',
        },
    ],
    rollup.DEFAULT_PLUGINS_BUNDLED,
    pkg,
)

const CONFIG: RollupOptions[] = rollup.getRollupConfig(CONFIG_OBJ)
rollup.getPackageExports(CONFIG_OBJ, PRINT_EXPORTS)

export default CONFIG
