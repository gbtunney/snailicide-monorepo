import { RollupOptions } from 'rollup'
import shell from 'shelljs'
import _package from './package.json' assert { type: 'json' }
import { exportJSON, Prettier, rollup } from './types/index.js'
import { tsConfigBase } from './types/tsconfig/index.js'

const LIBRARY_NAME: string = 'GBBuildConfig'
const PRINT_EXPORTS: boolean = false

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

const DIRECTORY_PATHS = {
    output_dir: './dist/',
    source_dir: './src/',
} as const

const rollUp = (): Array<RollupOptions> => {
    ;(() => shell.mkdir('-p', './dist'))()
    /* *export config as JSON if FLAGGED using jsonExportConfig * */
    if (JSON_EXPORTS && JSON_EXPORTS.length > 0) {
        exportJSON(JSON_EXPORTS, '.')
    }

    const CONFIG_OBJ = rollup.getConfigEntries(
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
    )
    rollup.getPackageExports(CONFIG_OBJ, PRINT_EXPORTS)

    return rollup.getRollupConfig(CONFIG_OBJ)
}

export default rollUp()
