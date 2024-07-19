import { zod } from '@snailicide/g-library/node'
import { z } from 'zod'

const plugin_theme_schema = zod.object({
    themeRoot: zod.fsPathTypeExists('directory').default('./theme'),
    sourceCodeDir: zod.fsPathTypeExists('directory').default('./src'),
    entryPoints: z.record(z.string()).default({
        'settings_schema.json': 'settings_schema.js',
    }),
})

export type ShopifyThemeSchemaOptions = z.input<typeof plugin_theme_schema>
export type ResolvedShopifyThemeSchemaOptions = z.infer<
    typeof plugin_theme_schema
>

export const resolveOptions = (
    options: ShopifyThemeSchemaOptions,
): ResolvedShopifyThemeSchemaOptions | undefined => {
    if (plugin_theme_schema.safeParse(options).success) {
        return plugin_theme_schema.parse(plugin_theme_schema.parse(options))
    } else {
        //report errors
        plugin_theme_schema.parse(options)
    }
    return undefined
}
