/**
 * Vitepress Configuration
 *
 * @see [VitePress | Vite & Vue Powered Static Site Generator](https://vitepress.dev/)
 */
import { merge as deepmerge } from 'ts-deepmerge'
import { DefaultTheme, defineConfig, UserConfig } from 'vitepress'
//import typedocSidebar from "../docs/typedoc-sidebar.json";

export type VitepressSidebarMulti = DefaultTheme.SidebarMulti
export type VitepressSidebar = Array<DefaultTheme.SidebarItem>
export type DefaultVitepressConfig = UserConfig<DefaultTheme.Config>

/** https://vitepress.dev/reference/site-config */
export const vitepress = (
    sidebarItems: VitepressSidebar,
    _options?: DefaultVitepressConfig,
): DefaultVitepressConfig => {
    const options_to_merge: DefaultVitepressConfig =
        _options !== undefined ? _options : {}

    const _userConfig = deepmerge(
        {
            themeConfig: {
                // https://vitepress.dev/reference/default-theme-config

                sidebar: sidebarItems,
            },
        },
        options_to_merge,
    ) as UserConfig

    const userConfig: DefaultVitepressConfig = defineConfig(_userConfig)
    return userConfig
}
