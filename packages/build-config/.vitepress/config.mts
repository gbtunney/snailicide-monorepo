import url from 'node:url'
import { importJSON, vitepress, VitepressSidebar } from './../types/index.js'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url))

const defineConfiguration = async (
    _dirname: string,
): Promise<ReturnType<typeof vitepress>> => {
    const sidebar_result = await importJSON(
        `${_dirname}/../docs/typedoc-sidebar.json`,
    )
    const typedocSidebar = sidebar_result as VitepressSidebar
    //console.log("GBT :: Sidebar file is:: ", sidebar_result)
    const vitepressConfig: ReturnType<typeof vitepress> = vitepress(
        typedocSidebar,
        {
            themeConfig: {
                aside: false,
                nav: [
                    { link: '/', text: 'Home' },
                    { link: '/docs/', text: 'Documentation' },
                ],
                // https://vitepress.dev/reference/default-theme-config
                search: {
                    provider: 'local',
                },
                socialLinks: [
                    {
                        icon: 'github',
                        link: 'https://github.com/gbtunney/snailicide-monorepo.git#README.md',
                    },
                    {
                        icon: 'instagram',
                        link: 'http://instagram.com/snailicide',
                    },
                    {
                        icon: 'youtube',
                        link: 'http://youtube.com/gbtunney',
                    },
                ],
            },
        },
    )
    return vitepressConfig
}

// https://vitepress.dev/reference/site-config
export default defineConfiguration(__dirname)
