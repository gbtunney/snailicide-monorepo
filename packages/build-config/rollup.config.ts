import { RollupOptions } from 'rollup'
import shell from 'shelljs'
import type { Jsonify, JsonObject } from 'type-fest'
import _package from './package.json' assert { type: 'json' }
import { exportJSONFile } from './types/export.json.file.js'
import { Prettier, rollup } from './types/index.js'
import {
    markdownLintConfigJson,
    MarkdownlintConfiguration,
} from './types/markdownlint/index.js'
import { tsConfigBase } from './types/tsconfig/index.js'

const LIBRARY_NAME: string = 'GBBuildConfig'
const PRINT_EXPORTS: boolean = false

const _prettierConfig = JSON.parse(JSON.stringify(Prettier.config))
const prettierConfig: Jsonify<typeof _prettierConfig> = _prettierConfig

const MARKDOWN_LINT_OPTIONS: MarkdownlintConfiguration = { config: {} }
const _mdConfig = await markdownLintConfigJson(MARKDOWN_LINT_OPTIONS)
const mdConfig: JsonObject = _mdConfig !== undefined ? _mdConfig : {}

/** As const */
const JSON_EXPORTS = [
    {
        data: prettierConfig,
        filename: 'dist/.prettierrc.json',
    },
    {
        data: tsConfigBase,
        filename: './tsconfig-base.json',
    },
    {
        data: mdConfig,
        filename: 'dist/.markdownlint.json',
    },
]
const DIRECTORY_PATHS = {
    output_dir: './dist/',
    source_dir: './src/',
} as const

const rollUp = (): Array<RollupOptions> => {
    ;(() => shell.mkdir('-p', './dist'))()
    // export config as JSON if FLAGGED using jsonExportConfig
    exportJSONFile(JSON_EXPORTS, '.')

    const CONFIG_OBJ = rollup.getConfigEntries(
        DIRECTORY_PATHS,
        [
            {
                export_key: '*',
                export_types: ['default', 'import', 'require', 'types'],
                library_name: LIBRARY_NAME,
            },
        ],
        rollup.getPluginsConfiguration(),
        _package,
    )
    rollup.getPackageExports(CONFIG_OBJ, PRINT_EXPORTS)
    return rollup.getRollupConfig(CONFIG_OBJ)
}

export default rollUp()
