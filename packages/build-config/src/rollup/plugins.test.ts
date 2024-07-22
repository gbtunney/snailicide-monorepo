import { nodeExternals as nodeExternalsPlugin } from 'rollup-plugin-node-externals'
import { describe, expect, test } from 'vitest'

import {
    ConfigOptions,
    ConfigPlugin,
    getPluginConfiguration,
} from './plugins.js'

describe('PLUGIN CONFIG TEST', () => {
    test('plugin nightmare crap:', () => {
        const PLUGIN_TEST: ConfigPlugin<'nodeExternals'> = nodeExternalsPlugin
        const PLUGIN_OPTIONS_TEST: ConfigOptions<'commonJS'> = {
            // requireReturnsDefault: 'ffffffff',
        }

        const typescriptPlugin = getPluginConfiguration<'typescriptTS'>(
            'typescriptTS',
            {
                browserslist: false,
                tsconfig: (resolvedConfig) => ({
                    ...resolvedConfig,
                    allowJs: false,
                    declaration: false,
                    sourceMap: false,
                }),
            },
        )

        if (typescriptPlugin !== undefined) {
            const testOptions: ConfigOptions<'commonJS'> =
                typescriptPlugin.options
            typescriptPlugin.plugin()
            typescriptPlugin.plugin(typescriptPlugin.options)
        }
        const RESOLVED_PLUGINS_LIST = [
            typescriptPlugin?.plugin_configured,
            getPluginConfiguration('json')?.plugin_configured,
            // getPluginConfiguration('nodePolyfills')?.plugin_configured,
            //  getPluginConfiguration('nodeExternals')?.plugin_configured,
            // getPluginConfiguration('nodeResolve' , {preferBuiltins:false})?.plugin_configured,
            getPluginConfiguration('commonJS')?.plugin_configured,
        ]
        expect(RESOLVED_PLUGINS_LIST).toBeInstanceOf(Array)
        /*
        const RESOLVED_PLUGINS_LIST = [
            ts({
                browserslist: false,
                tsconfig: (resolvedConfig) => {
                    //  console.log("THE RESOLVRDF CONGIG ", resolvedConfig);
                    return {
                        ...resolvedConfig,
                        declaration: true,
                        allowJs: false,
                        sourceMap: true,
                    }
                } /!* Plugin options *!/,
        }),
        json(),
            nodePolyfills(),
            nodeExternals({}),
            //TODO: FIX SO things are being bundled properly?
            nodeResolve({preferBuiltins: true}), // so Rollup can find `ms`
            commonjs({requireReturnsDefault: 'auto'}), // <---- this solves default issue), // so Rollup can convert `ms` to an ES modulefilesize(),
        ]*/
    })
})
