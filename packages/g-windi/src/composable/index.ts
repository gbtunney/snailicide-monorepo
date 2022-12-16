export { useChroma } from './useChroma'
export { useWindiCSS } from './useWindiCSS'
export { useColorScale } from './useColorScale'
export { useConfigDefaults } from './useConfigDefaults'
export { usePluginUtilities } from './usePluginUtilities'
export { useCustomPlugins } from './useCustomPlugins'

import type { Config, DefaultTheme } from 'windicss/types/interfaces'
export type { Chromable, Color as ChromaColor, Color } from 'chroma.ts'
export type WindiConfig = Config
export type WindiDefaultTheme = DefaultTheme
export type ThemeColors = WindiDefaultTheme['colors']
