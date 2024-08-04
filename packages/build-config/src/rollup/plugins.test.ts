import { describe, expect, test } from 'vitest'

import {
    CDN_PLUGINS_BUNDLED,
    ConfigOptions,
    getPluginNames,
    getPluginsConfiguration,
} from './plugins.js'

describe('CONFIG TESTS', () => {
    test('plugin:', () => {
        const PLUGIN_OPTIONS_TEST: ConfigOptions<'commonJS'> = {
            requireReturnsDefault: 'auto',
        }

        const PLUGIN_OPTIONS_TEST2: ConfigOptions<'nodeResolve'> = {
            // @ts-expect-error: this SHOULD fail
            requireReturnsDefault: 'auto',
        }

        expect(getPluginNames(getPluginsConfiguration())).toStrictEqual([
            'Typescript',
            'json',
            'polyfill-node',
            'node-externals',
            'node-resolve',
            'commonjs',
        ])

        expect(getPluginNames(CDN_PLUGINS_BUNDLED)).toStrictEqual([
            'Typescript',
            'json',
            'node-resolve',
            'commonjs',
        ])
    })
})
