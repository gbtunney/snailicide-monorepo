export type {
    Chromable,
    ChromaColor,
    Color,
    ThemeColors,
    WindiConfig,
    WindiDefaultTheme,
} from './composable/index.js'
export {
    useChroma,
    useColorScale,
    useConfigDefaults,
    useCustomPlugins,
    usePluginUtilities,
    useWindiCSS,
} from './composable/index.js'
export type {
    ColorScaleConfig,
    ColorScaleConfigCollection,
} from './composable/useColorScale.js'
export type { windiCSS } from './composable/useWindiCSS.js'

export {
    tg_isCSSColorSpecial,
    tg_isNotCSSColorSpecial,
} from './css.color.special.js'
export type { CSSColorSpecialProp } from './css.color.special.js'
