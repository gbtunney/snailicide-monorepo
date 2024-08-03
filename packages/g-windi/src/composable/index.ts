export type WindiConfig = Config
export type WindiDefaultTheme = DefaultTheme
export type ThemeColors = WindiDefaultTheme['colors']
export { useChroma } from './use-chroma.js'
export { useColorScale } from './use-color-scale.js'
export { useConfigDefaults } from './use-config-defaults.js'

import type { Config, DefaultTheme } from 'windicss/types/interfaces'
export { useCustomPlugins } from './use-custom-plugins.js'
export { usePluginUtilities } from './use-plugin-utilities.js'
export { useWindiCss } from './use-windi-css.js'
export type { Chromable, Color as ChromaColor, Color } from 'chroma.ts'
