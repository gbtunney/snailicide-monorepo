import commonjsPlugin from '@rollup/plugin-commonjs'
import jsonPlugin from '@rollup/plugin-json'
import { nodeResolve as nodeResolvePlugin } from '@rollup/plugin-node-resolve'
import terserPlugin from '@rollup/plugin-terser'
import { Plugin } from 'rollup'
import { nodeExternals as nodeExternalsPlugin } from 'rollup-plugin-node-externals'
import nodePolyfillsPlugin from 'rollup-plugin-polyfill-node'
import tsPlugin from 'rollup-plugin-ts'

type CommonJSOptions = Parameters<typeof commonjsPlugin>[0]

type PluginConfig<Type = typeof PLUGINS_CONFIG> = {
    [Property in keyof Type]: Type[Property] extends Plugin
        ? Plugin<Type[Property]>
        : never
}
export interface PluginConfigExplicit {
    typescriptTS: Plugin<typeof tsPlugin>
    json: Plugin<typeof jsonPlugin>
    nodePolyfills: Plugin<typeof nodePolyfillsPlugin>
    nodeResolve: Plugin<typeof nodeResolvePlugin>
    nodeExternals: Plugin<typeof nodeExternalsPlugin>
    commonJS: Plugin<typeof commonjsPlugin>
    terser: Plugin<typeof terserPlugin>
}
export const PLUGINS_CONFIG = {
    commonJS: commonjsPlugin,
    json: jsonPlugin,
    nodeExternals: nodeExternalsPlugin,
    nodePolyfills: nodePolyfillsPlugin,
    nodeResolve: nodeResolvePlugin,
    terser: terserPlugin,
    typescriptTS: tsPlugin,
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
        : never
}

const DEFAULT_CONFIG: PluginsDefaultConfig = {
    commonJS: { requireReturnsDefault: 'auto' },
    json: {},
    nodeExternals: {},
    nodePolyfills: {},
    nodeResolve: { preferBuiltins: true },
    terser: {},
    typescriptTS: {
        tsconfig: (resolvedConfig) => ({
            ...resolvedConfig,
            allowJs: false,
            declaration: true,
            sourceMap: true,
        }),
    },
}

export type PluginKey = keyof typeof PLUGINS_CONFIG
export type ConfigPlugin<Key extends PluginKey> = (typeof PLUGINS_CONFIG)[Key]
export type ConfigOptions<Key extends PluginKey> = Parameters<
    ConfigPlugin<Key>
>[0]
export type ConfigReturn<Key extends PluginKey> = ReturnType<ConfigPlugin<Key>>

export const PRECONFIGURED_PLUGINS = {
    commonJS: PLUGINS_CONFIG.commonJS(DEFAULT_CONFIG.commonJS),
    json: PLUGINS_CONFIG.json(DEFAULT_CONFIG.json),
    nodeExternals: PLUGINS_CONFIG.nodeExternals(DEFAULT_CONFIG.nodeExternals),
    nodePolyfills: PLUGINS_CONFIG.nodePolyfills(DEFAULT_CONFIG.nodePolyfills),
    nodeResolve: PLUGINS_CONFIG.nodeResolve(DEFAULT_CONFIG.nodeResolve),
    terser: PLUGINS_CONFIG.terser(DEFAULT_CONFIG.terser),
    typescriptTS: PLUGINS_CONFIG.typescriptTS(DEFAULT_CONFIG.typescriptTS),
}
export const getPluginFunc = <Key extends PluginKey>(
    key: Key,
    config: PluginConfig = PLUGINS_CONFIG,
): ConfigPlugin<Key> | undefined => {
    const guardFunc = (__plugin: unknown): __plugin is ConfigPlugin<Key> => {
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
    const defaultGuardFunc = (
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
                options: __options,
                plugin,
                plugin_configured,
            }
            return RESULT_OBJECT
        }
    }
    return undefined
}
