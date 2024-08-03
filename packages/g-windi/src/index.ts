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
    useWindiCss,
} from './composable/index.js'
export type {
    ColorScaleConfig,
    ColorScaleConfigCollection,
} from './composable/use-color-scale.js'
export type { windiCSS } from './composable/use-windi-css.js'

export {
    tg_isCSSColorSpecial,
    tg_isNotCSSColorSpecial,
} from './css.color.special.js'
export type { CSSColorSpecialProp } from './css.color.special.js'
