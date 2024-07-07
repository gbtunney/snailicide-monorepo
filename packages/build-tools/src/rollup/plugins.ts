import commonjsPlugin from '@rollup/plugin-commonjs'
import { nodeResolve as nodeResolvePlugin } from '@rollup/plugin-node-resolve'
import { Plugin } from 'rollup'
import tsPlugin from 'rollup-plugin-ts'
type CommonJSOptions = Parameters<typeof commonjsPlugin>[0]

import jsonPlugin from '@rollup/plugin-json'
import terserPlugin from '@rollup/plugin-terser'
import { nodeExternals as nodeExternalsPlugin } from 'rollup-plugin-node-externals'
import nodePolyfillsPlugin from 'rollup-plugin-polyfill-node'

type PluginConfig<Type = typeof PLUGINS_CONFIG> = {
    [Property in keyof Type]: Type[Property] extends Plugin
        ? Plugin<Type[Property]>
        : never
}
export type PluginConfigExplicit = {
    typescriptTS: Plugin<typeof tsPlugin>
    json: Plugin<typeof jsonPlugin>
    nodePolyfills: Plugin<typeof nodePolyfillsPlugin>
    nodeResolve: Plugin<typeof nodeResolvePlugin>
    nodeExternals: Plugin<typeof nodeExternalsPlugin>
    commonJS: Plugin<typeof commonjsPlugin>
    terser: Plugin<typeof terserPlugin>
}
export const PLUGINS_CONFIG = {
    typescriptTS: tsPlugin,
    json: jsonPlugin,
    nodePolyfills: nodePolyfillsPlugin,
    nodeResolve: nodeResolvePlugin,
    nodeExternals: nodeExternalsPlugin,
    commonJS: commonjsPlugin,
    terser: terserPlugin,
} as const

type PluginsConfigWDefaults<Type = typeof PLUGINS_CONFIG> = {
    [Property in keyof Type]: Type[Property] extends Plugin<Type[Property]>
        ? {
              plugin: Plugin<Type[Property]>
              // default?:   Parameters<Type[Property]>[0]
          }
        : never
}

type PluginsDefaultConfig<Type = typeof PLUGINS_CONFIG> = {
    [Property in keyof Type]?: Property extends PluginKey
        ? ConfigOptions<Property>
        : never //Type[Property] extends ConfigOptions<Property>? ConfigOptions<Property> :never: never
}

const DEFAULT_CONFIG: PluginsDefaultConfig = {
    typescriptTS: {
        tsconfig: (resolvedConfig) => ({
            ...resolvedConfig,
            declaration: true,
            allowJs: false,
            sourceMap: true,
        }),
    },
    commonJS: { requireReturnsDefault: 'auto' },
    nodeResolve: { preferBuiltins: true },
    terser: {},
    json: {},
    nodePolyfills: {},
    nodeExternals: {},
}

export type PluginKey = keyof typeof PLUGINS_CONFIG
export type ConfigPlugin<Key extends PluginKey> = (typeof PLUGINS_CONFIG)[Key]
export type ConfigOptions<Key extends PluginKey> = Parameters<
    ConfigPlugin<Key>
>[0]
export type ConfigReturn<Key extends PluginKey> = ReturnType<ConfigPlugin<Key>>

export const PRECONFIGURED_PLUGINS = {
    typescriptTS: PLUGINS_CONFIG.typescriptTS(DEFAULT_CONFIG.typescriptTS),
    json: PLUGINS_CONFIG.json(DEFAULT_CONFIG.json),
    nodePolyfills: PLUGINS_CONFIG.nodePolyfills(DEFAULT_CONFIG.nodePolyfills),
    nodeExternals: PLUGINS_CONFIG.nodeExternals(DEFAULT_CONFIG.nodeExternals),
    nodeResolve: PLUGINS_CONFIG.nodeResolve(DEFAULT_CONFIG.nodeResolve),
    commonJS: PLUGINS_CONFIG.commonJS(DEFAULT_CONFIG.commonJS),
    terser: PLUGINS_CONFIG.terser(DEFAULT_CONFIG.terser),
}
export const getPluginFunc = <Key extends PluginKey>(
    key: Key,
    config: PluginConfig = PLUGINS_CONFIG,
): ConfigPlugin<Key> | undefined => {
    const guardFunc = <T extends ConfigPlugin<Key>>(
        __plugin: unknown,
    ): __plugin is ConfigPlugin<Key> => {
        return __plugin !== undefined
    }
    if (guardFunc(config[key])) {
        const result: ConfigPlugin<Key> = config[key]
        return result
    }
    return undefined
}
const getPluginDefaultOptions = <Key extends PluginKey>(
    key: Key,
    config: PluginsDefaultConfig = DEFAULT_CONFIG,
): ConfigOptions<Key> | undefined => {
    const defaultGuardFunc = <T extends ConfigOptions<Key>>(
        __options: unknown,
    ): __options is ConfigOptions<Key> => {
        return __options !== undefined
    }
    if (defaultGuardFunc(config[key])) {
        const result: ConfigOptions<Key> = config[key]
        return result
    }
    return undefined
}

//THIS IS A WRAPPER THAT CHECKS THE TYPE.
export const getPluginConfiguration = <Key extends PluginKey>(
    key: Key,
    options: ConfigOptions<Key> | 'use_default' = 'use_default',
):
    | {
          plugin: ConfigPlugin<Key>
          options: ConfigOptions<Key>
          plugin_configured: Plugin //todo: make dynamic
      }
    | undefined => {
    const guardReturnFunc = <T extends ConfigReturn<Key>>(
        __plugin_return: unknown,
    ): __plugin_return is ConfigReturn<Key> => {
        return __plugin_return !== undefined
    }

    const _options =
        options === 'use_default' ? getPluginDefaultOptions(key) : options

    const plugin_configured = PRECONFIGURED_PLUGINS[key] //TODO: give it a type ConfigReturn
    if (_options !== undefined) {
        const __options: ConfigOptions<Key> = _options
        const _pluginResult = getPluginFunc(key)
        if (_pluginResult !== undefined) {
            const plugin: ConfigPlugin<Key> = _pluginResult

            const RESULT_OBJECT: {
                plugin: ConfigPlugin<Key>
                options: ConfigOptions<Key>
                plugin_configured: Plugin
            } = {
                plugin,
                plugin_configured,
                options: __options,
            }
            return RESULT_OBJECT
        }
    }
    return undefined
}
const getConfiguredPlugin = <Key extends PluginKey>(
    key: Key,
    options: ConfigOptions<Key> | 'use_default' = 'use_default',
): ConfigReturn<Key> | undefined => {
    const guardReturnFunc = <T extends ConfigReturn<Key>>(
        __plugin_return: unknown,
    ): __plugin_return is ConfigReturn<Key> => {
        return __plugin_return !== undefined
    }
    const _pluginResult = getPluginFunc<Key>(key)
    if (_pluginResult !== undefined) {
        const plugin: ConfigPlugin<Key> = _pluginResult
        //const result = plugin( _options)
    }
    return undefined
}
