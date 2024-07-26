export type WindiConfig = Config
export type WindiDefaultTheme = DefaultTheme
export type ThemeColors = WindiDefaultTheme['colors']
export { useChroma } from './useChroma.js'
export { useColorScale } from './useColorScale.js'
export { useConfigDefaults } from './useConfigDefaults.js'

import type { Config, DefaultTheme } from 'windicss/types/interfaces'
export { useCustomPlugins } from './useCustomPlugins.js'
export { usePluginUtilities } from './usePluginUtilities.js'
export { useWindiCSS } from './useWindiCSS.js'
export type { Chromable, Color as ChromaColor, Color } from 'chroma.ts'
