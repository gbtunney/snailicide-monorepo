import { rollup } from '@snailicide/build-tools'
import { RollupOptions } from 'rollup'
import shell from 'shelljs'

import _package from './package.json' assert { type: 'json' }
import { exportJSON, Prettier } from './types/index.js'
import { tsConfigBase } from './types/tsconfig/index.js'

const JSON_EXPORTS = [
    {
        data: Prettier.config,
        filename: './dist/.prettierrc.json',
    },
    {
        data: tsConfigBase,
        filename: './tsconfig-base.json',
    },
] as const

const LIBRARY_NAME: string = 'GShopifyLibrary'
const PRINT_EXPORTS: boolean = false

const DIRECTORY_PATHS = {
    output_dir: './dist/',
    source_dir: './src/',
} as const

const rollUp = () => {
    copyTSConfig()
    /* *export config as JSON if FLAGGED using jsonExportConfig * */
    if (JSON_EXPORTS && JSON_EXPORTS.length > 0) {
        exportJSON(JSON_EXPORTS, '.')
    }
    const CONFIG_OBJ = [
        ...rollup.getConfigEntries(
            DIRECTORY_PATHS,
            [
                {
                    export_key: '*',
                    export_types: ['default', 'import', 'require', 'types'],
                    library_name: LIBRARY_NAME,
                },
            ],
            rollup.DEFAULT_PLUGINS_BUNDLED,
            _package,
        ),
    ]
    rollup.getPackageExports(CONFIG_OBJ, PRINT_EXPORTS)

    const CONFIG: Array<RollupOptions> = rollup.getRollupConfig(CONFIG_OBJ)

    return CONFIG
}
const copyTSConfig = () => {
    shell.mkdir('-p', './dist')
}
export default rollUp()
