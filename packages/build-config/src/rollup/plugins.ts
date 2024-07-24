import commonjsPlugin from '@rollup/plugin-commonjs'
import jsonPlugin from '@rollup/plugin-json'
import { nodeResolve as nodeResolvePlugin } from '@rollup/plugin-node-resolve'
import terserPlugin from '@rollup/plugin-terser'
import { isNotBoolean } from 'ramda-adjunct'
import { Plugin } from 'rollup'
import { nodeExternals as nodeExternalsPlugin } from 'rollup-plugin-node-externals'
import nodePolyfillsPlugin from 'rollup-plugin-polyfill-node'
import tsPlugin from 'rollup-plugin-ts'

const PLUGINS_CONFIG = {
    commonJS: commonjsPlugin,
    json: jsonPlugin,
    nodeExternals: nodeExternalsPlugin,
    nodePolyfills: nodePolyfillsPlugin,
    nodeResolve: nodeResolvePlugin,
    terser: terserPlugin,
    typescriptTS: tsPlugin,
} as const

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
type ConfigReturn<Key extends PluginKey> = ReturnType<ConfigPlugin<Key>>

const PRECONFIGURED_PLUGINS = {
    commonJS: PLUGINS_CONFIG.commonJS(DEFAULT_CONFIG.commonJS),
    json: PLUGINS_CONFIG.json(DEFAULT_CONFIG.json),
    nodeExternals: PLUGINS_CONFIG.nodeExternals(DEFAULT_CONFIG.nodeExternals),
    nodePolyfills: PLUGINS_CONFIG.nodePolyfills(DEFAULT_CONFIG.nodePolyfills),
    nodeResolve: PLUGINS_CONFIG.nodeResolve(DEFAULT_CONFIG.nodeResolve),
    terser: PLUGINS_CONFIG.terser(DEFAULT_CONFIG.terser),
    typescriptTS: PLUGINS_CONFIG.typescriptTS(DEFAULT_CONFIG.typescriptTS),
} as const

export type PluginsConfiguration = {
    [Property in PluginKey]?: Property extends PluginKey
        ? ConfigOptions<Property> | boolean
        : never
}
/* eslint-disable sort/object-properties */
export const basePluginConfig: PluginsConfiguration = {
    typescriptTS: true,
    json: true,
    nodePolyfills: true,
    nodeExternals: true,
    nodeResolve: true,
    commonJS: true,
    terser: false,
}

export const getPlugin = <Key extends PluginKey>(
    key: Key,
    value: ConfigOptions<Key> | boolean,
): Plugin | undefined => {
    if (isNotBoolean(value)) {
        // @ts-expect-error: this is busted
        return PLUGINS_CONFIG[key](value)
    } else if (value === true) {
        return PRECONFIGURED_PLUGINS[key]
    }
    return undefined
}

export const getPluginsConfiguration = <Type extends PluginsConfiguration>(
    config: Type | undefined = undefined,
    _default = basePluginConfig,
): Array<Plugin> => {
    const _config: PluginsConfiguration =
        config !== undefined ? config : _default
    const merged: PluginsConfiguration = { ..._default, ...config }
    const result: Array<Plugin> = Object.entries(merged)
        .map(([key, value]) => getPlugin(key as PluginKey, value))
        .filter((plugin) => plugin) as Array<Plugin>
    return result
}
export const getPluginNames = (plugins: Array<Plugin>): Array<string> => {
    return plugins.map((plugin) => plugin.name)
}

export const DEFAULT_PLUGINS_BUNDLED = getPluginsConfiguration(basePluginConfig)

export const CDN_PLUGINS_BUNDLED = getPluginsConfiguration({
    nodePolyfills: false,
    nodeExternals: false,
    nodeResolve: { browser: true },
})
