export { useChroma } from './useChroma.js'
export { useWindiCSS } from './useWindiCSS.js'
export { useColorScale } from './useColorScale.js'
export { useConfigDefaults } from './useConfigDefaults.js'
export { usePluginUtilities } from './usePluginUtilities.js'
export { useCustomPlugins } from './useCustomPlugins.js'

import type { Config, DefaultTheme } from 'windicss/types/interfaces'
export type { Chromable, Color as ChromaColor, Color } from 'chroma.ts'
export type WindiConfig = Config
export type WindiDefaultTheme = DefaultTheme
export type ThemeColors = WindiDefaultTheme['colors']
