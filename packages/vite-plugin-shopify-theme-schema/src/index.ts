import { tg } from '@snailicide/g-library'
import { node, zod } from '@snailicide/g-library/node'
import shell from 'shelljs'
import { Plugin, ResolvedConfig } from 'vite'
import fs from 'fs'
import path from 'path'

export default function shopifyModules(
    options: ShopifyThemeSchemaOptions = {},
): Plugin {
    const resolvedOptions = resolveOptions(options)
    let _config: ResolvedConfig
    if (tg.isNotUndefined(resolvedOptions)) {
        processModules(resolvedOptions as ResolvedShopifyThemeSchemaOptions)
    }
    return {
        name: 'vite-plugin-shopify-theme-schema',
    }
}

import {
    ResolvedShopifyThemeSchemaOptions,
    resolveOptions,
    ShopifyThemeSchemaOptions,
} from './options.js'

export type {
    ResolvedShopifyThemeSchemaOptions,
    resolveOptions,
    ShopifyThemeSchemaOptions,
} from './options.js'

const processModules = async ({
    entryPoints,
    sourceCodeDir,
    themeRoot,
}: ResolvedShopifyThemeSchemaOptions): Promise<true> => {
    const outConfigDir = path.resolve(themeRoot, './config')
    shell.mkdir('-p', outConfigDir)

    Object.entries(entryPoints).forEach(
        async ([entry_pt_out, entry_pt_source]) => {
            const full_entry_path = zod
                .filePath()
                .parse(`${sourceCodeDir}/${entry_pt_source}`)
            const full_out_path = zod
                .filePath()
                .parse(`${outConfigDir}/${entry_pt_out}`)
            return await compileFile(full_out_path, full_entry_path)
        },
    )

    return true
}
const compileFile = async (
    out_path: string,
    file_path: string,
): Promise<boolean> => {
    if (fs.existsSync(file_path)) {
        const { default: getSchema } = await import(file_path)
        const testSectionSchema = getSchema
        node.exportJSONFile([{ data: testSectionSchema, filename: out_path }])
        console.log(
            'Vite: ShopifyThemeSchemaOptions: Success! File written to ',
            out_path,
        )
        return true
    } else {
        console.warn(
            'Vite: ShopifyThemeSchemaOptions: Entry Point does not exist! No files output! ::',
            file_path,
        )
        return false
    }
}
