import { objectUtils, tg } from '@snailicide/g-library'
import { node, zod } from '@snailicide/g-library/node'
import shell from 'shelljs'
import { Plugin } from 'vite'
import z from 'zod'
import fs from 'fs'
import path from 'path'
import {
    plugin_options_schema,
    ResolvedShopifyLiquidModulesOptions,
    resolveOptions,
    ShopifyLiquidModulesOptions,
} from './options.js'

export default function shopifyModules(
    options: ShopifyLiquidModulesOptions = {},
): Plugin {
    const resolvedOptions = resolveOptions(options)
    if (tg.isNotUndefined<ResolvedShopifyLiquidModulesOptions>(resolvedOptions))
        processModules(resolvedOptions)

    return {
        name: 'vite-plugin-shopify-liquid-modules',
    }
}

type PluginSchema = typeof plugin_options_schema
const _dummy: PluginSchema = plugin_options_schema
const processModules = <
    Schema extends z.AnyZodObject = typeof plugin_options_schema,
>(
    _value: z.infer<typeof plugin_options_schema>,
): void => {
    const {
        modulesDir,
        sections,
        snippets,
        themeRoot,
    }: z.infer<typeof plugin_options_schema> = _value
    const outSectionsDir = path.resolve(themeRoot, './sections')
    const outSnippetsDir = path.resolve(themeRoot, './snippets')
    shell.mkdir('-p', outSectionsDir, outSnippetsDir)

    if (sections.copy) {
        ///get list of potential modules with section files.
        const sectionFileArr = node.getFilePathArr(
            `${modulesDir.toString()}/**/${sections.file_name.toString()}.liquid`,
        )
        sectionFileArr.forEach((section_file) => {
            const true_module_name = section_file.parentdirname
            const module_path = zod
                .filePath()
                .parse(`${modulesDir}/${true_module_name}`)
            //LOAD SECTION FILE TO CHECK
            const section_file_content = fs.readFileSync(
                section_file.absolute,
                'utf8',
            )
            //  todo:  %dir%
            const _prefix: string =
                sections.prefix === undefined ? '' : sections.prefix
            const result_path = `${outSectionsDir}/${_prefix}${true_module_name}.liquid`
            const newSection = replaceSchemaTags(
                section_file_content,
                module_path,
                result_path,
            )
        })
    }
    if (snippets.copy) {
        const snippetFileArr = node
            .getFilePathArr(`${modulesDir}/**/${snippets.file_name}.liquid`)
            .filter((snippet_file) => {
                return snippet_file.filename !== sections.file_name
            })
        snippetFileArr.forEach((file) => {
            const result_path = path.resolve(
                `${outSnippetsDir}/${snippets.prefix}${file.basename}`,
            )
            const the_snippet_file = fs.readFileSync(file.absolute, 'utf8')
            fs.writeFileSync(result_path, the_snippet_file)
        })
    }
}

/**
 * Thanks and credit for this function goes to author, i cannot regex this well.
 *
 * @author David Warrington
 * @function replaceSchemaTags
 * @see {@link https://github.com/davidwarrington/liquid-schema-plugin |Liquid Schema Plugin}
 * @see {@link https://github.com/davidwarrington/liquid-schema-plugin/blob/master/plugin/index.js#L105 | source function}
 */
const replaceSchemaTags = async (
    fileContents: string,
    module_path: string,
    result_path: string,
) => {
    const replaceableSchemaRegex =
        /{%-?\s*schema\s*('.*'|".*")\s*-?%}(([\s\S]*){%-?\s*endschema\s*-?%})?/
    const fileContainsReplaceableSchemaRegex =
        replaceableSchemaRegex.test(fileContents)
    if (!fileContainsReplaceableSchemaRegex) {
        fs.writeFileSync(path.resolve(result_path), fileContents)
        return fileContents
    }
    const result = fileContents.match(replaceableSchemaRegex)
    if (result !== null) {
        const [match, importableFilePath, , contents] = result
        if (tg.isNotUndefined<string>(importableFilePath)) {
            const _importableFilePath: string = importableFilePath.replace(
                /(^('|"))|(('|")$)/g,
                '',
            )
            if (
                fs.existsSync(
                    path.resolve(`${module_path}/${_importableFilePath}`),
                )
            ) {
                const { default: getSchema } = await import(
                    path.resolve(`${module_path}/${_importableFilePath}`)
                )
                const endfile = fileContents.replace(
                    replaceableSchemaRegex,
                    `{% schema %}\n${objectUtils.prettyPrintJSON(getSchema)}\n{% endschema %}`,
                )
                fs.writeFileSync(path.resolve(result_path), endfile)
                return endfile
            }
        }
    }
    return
}

export type {
    ResolvedShopifyLiquidModulesOptions,
    resolveOptions,
    ShopifyLiquidModulesOptions,
} from './options.js'
