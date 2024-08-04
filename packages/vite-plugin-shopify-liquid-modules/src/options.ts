import { zod } from '@snailicide/g-library/node'
import { z } from 'zod'

/**
 * Plugin Options Schema
 *
 * @param {string} themeRoot ['./theme'] - file path to shopify theme root.
 * @param {string} modulesDir ['./modules'] - description
 */
export const plugin_options_schema = zod.object({
    //zod.filePath.default('./theme'),
    modulesDir: zod.fsPathTypeExists('directory').default('./modules'),
    sections: z
        .object({
            // todo: 'g-%dir%'
            copy: zod.boolean().default(false),
            file_name: zod.string().default('section'),
            prefix: zod.string().default('g-'),
        })
        .default({ copy: false, file_name: 'section', prefix: 'g-' }),
    snippets: z
        .object({
            // todo: 'g-%dir%'
            copy: zod.boolean().default(false),
            file_name: zod.string().default('*'),
            prefix: zod.string().default('g-'),
        })
        .default({ copy: false, file_name: '*', prefix: 'g-' }),
    themeRoot: zod.fsPathTypeExists('directory').default('./theme'),
})
/*
const resolved_plugin_options_schema = zod.object({
    themeRoot: zod.filePath,
    modulesDir: zod.filePath,
    sections: z.object({
        prefix: zod.string(),
        copy: zod.boolean(),
        file_name: zod.string(),
    }),
    snippets: z.object({
        prefix: zod.string(),
        copy: zod.boolean(),
        file_name: zod.string(),
    }),
})*/

export type ShopifyLiquidModulesOptions = z.input<typeof plugin_options_schema>
export type ResolvedShopifyLiquidModulesOptions = z.infer<
    typeof plugin_options_schema
>

export const resolveOptions = (
    options: ShopifyLiquidModulesOptions,
): ResolvedShopifyLiquidModulesOptions | undefined => {
    if (plugin_options_schema.safeParse(options).success) {
        return plugin_options_schema.parse(plugin_options_schema.parse(options))
    } else {
        //report error
        plugin_options_schema.parse(options)
    }
    return undefined
}
