import { RollupOptions } from 'rollup'

import pkg from './package.json' assert { type: 'json' }
import { EntryConfig, rollup } from './types/index.js'

const PRINT_EXPORTS: boolean = true

const getDirectoryObj = {
    source_dir: './src/',
    output_dir: './dist/',
}
const my_config: Omit<EntryConfig, 'source_dir' | 'output_dir'> = {
    export_types: ['default', 'import', 'require', 'types'],
    export_key: '*',
    library_name: 'gBuildTools',
}

const CONFIG_OBJ = rollup.getConfigEntries(
    getDirectoryObj,
    [my_config],
    rollup.DEFAULT_PLUGINS_BUNDLED,
    pkg,
)

const CONFIG: RollupOptions[] = rollup.getRollupConfig(CONFIG_OBJ)

rollup.getPackageExports(CONFIG_OBJ, PRINT_EXPORTS)

export default CONFIG
