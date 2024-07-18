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
                library_name: 'gShopifyLibrary',
            },
        ],
        rollup.DEFAULT_PLUGINS_BUNDLED,
        /*[
            rollup.getPluginConfiguration("typescriptTS")?.plugin_configured,
            rollup.getPluginConfiguration("json")?.plugin_configured,
            rollup.getPluginConfiguration('commonJS')?.plugin_configured,
            rollup.getPluginConfiguration('nodePolyfills')?.plugin_configured,
            rollup.getPluginConfiguration('nodeExternals')?.plugin({
                    builtins:false,
                    deps:true,
                }
            ),rollup.getPluginConfiguration('nodeResolve')?.plugin_configured,
            //  rollup.getPluginConfiguration('nodeResolve')?.plugin_configured,
        ],*/
        pkg,
    ),
]

const CONFIG: RollupOptions[] = rollup.getRollupConfig(CONFIG_OBJ)
rollup.getPackageExports(CONFIG_OBJ, PRINT_EXPORTS)

export default CONFIG
