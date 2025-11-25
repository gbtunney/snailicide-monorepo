/** Utility functions (mainly for working with lintstaged,file extensions and JSON data) */

import micromatch from 'micromatch'
import {
    ensureArray,
    isArray,
    isNotUndefined,
    isPlainObject as RAisPlainObject,
    isPrimitive,
} from 'ramda-adjunct'
import type {
    ArrayValues,
    JsonArray,
    JsonObject,
    JsonPrimitive,
    JsonValue,
    ReadonlyDeep,
    UnknownRecord,
} from 'type-fest'
import fs from 'fs'
import { fileURLToPath } from 'node:url'
import path from 'path'
import { getLogger } from './logger/index.js'

export const JS_FILE_EXTENSIONS = ['js', 'mjs', 'cjs', 'jsx'] as const
export const TS_FILE_EXTENSIONS = ['ts', 'mts', 'cts', 'tsx'] as const
export const JSLIKE_FILE_EXTENSIONS = [
    ...JS_FILE_EXTENSIONS,
    ...TS_FILE_EXTENSIONS,
] as const
export const PRETTIER_FILE_EXTENSIONS = [
    'json',
    'xml',
    'php',
    'html',
    'css',
    'md',
    'sh',
    'yaml',
    'yml',
    'graphql',
] as const

export type JSFileExtensions = ArrayValues<typeof JS_FILE_EXTENSIONS>
export type TSFileExtensions = ArrayValues<typeof TS_FILE_EXTENSIONS>
export type JSLikeFileExtensions = ArrayValues<typeof JSLIKE_FILE_EXTENSIONS>
export type PrettierFileExtensions = ArrayValues<
    typeof PRETTIER_FILE_EXTENSIONS
>
export type AllowedExtensions<
    IncludePrettierExtentions extends boolean = false,
> = IncludePrettierExtentions extends true
    ?
          | Array<PrettierFileExtensions>
          | ReadonlyDeep<Array<PrettierFileExtensions>>
    : Array<JSLikeFileExtensions> | ReadonlyDeep<Array<JSLikeFileExtensions>>
export type LintStagedConfig = Record<string, string | Array<string>>

export const getFileExtensionList = <
    IncludePrettierExtentions extends boolean = false,
>(
    extensions: AllowedExtensions<IncludePrettierExtentions>,
    joined: boolean = true,
    prefix: string = '',
): Array<string> => {
    const list = extensions.map((value: string): string => {
        return `${prefix}${value}`
    })
    return ensureArray(joined ? list.join(',') : list)
}

export const globFileFilter = (
    files: string | Array<string>,
    globs: string | Array<string>,
): Array<string> => {
    const globArr = ensureArray(globs)
    const result: Array<string> = ensureArray(files)
        .map<string>((file: string) => path.resolve(file))
        .filter((file: string): file is string =>
            globArr.every((glob: string) => micromatch.capture(glob, file)),
        )
    return result
}

const addFileExtension = (
    value: string,
    extension: string = '.json',
): string => {
    const _extension = extension.startsWith('.') ? extension : `.${extension}`
    return value.endsWith(_extension) ? value : `${value}${extension}`
}

export type NotAssignableToJson =
    | bigint
    | symbol
    /* eslint @typescript-eslint/no-unsafe-function-type:off  */
    | Function

export type JSONCompatible<Type> = unknown extends Type
    ? never
    : {
          [Property in keyof Type]: Type[Property] extends JsonValue
              ? Type[Property]
              : Type[Property] extends NotAssignableToJson
                ? never
                : JSONCompatible<Type[Property]>
      }

export const isPlainObject = <Type extends UnknownRecord = UnknownRecord>(
    value: unknown,
): value is Type => {
    return isNotUndefined(value) && RAisPlainObject(value)
}

export const safeDeserializeJSON = <Type extends JsonValue = JsonValue>(
    data: unknown,
): Type | undefined => {
    const LOGGER = getLogger().child('safeDeserializeJSON')
    try {
        // Only attempt to clone JSON-compatible values
        return JSON.parse(JSON.stringify(data)) as Type
    } catch {
        LOGGER.error('JSON deserialization failed for data:', data)
        return undefined
    }
}

export const importJSON = async (
    filename: string,
): Promise<JsonValue | undefined> => {
    const absolutePath = path.resolve(filename)
    const LOGGER = getLogger().child('importJSON')
    if (!fs.existsSync(absolutePath)) {
        LOGGER.error(`File not found: ${absolutePath}`)
        return undefined
    }
    try {
        LOGGER.info(`Trying to read file: ${absolutePath}`)
        const raw = await fs.promises.readFile(absolutePath, 'utf8')
        const parsed: unknown = JSON.parse(raw)

        if (isArray(parsed)) return parsed as JsonArray
        if (RAisPlainObject(parsed)) return parsed as JsonObject
        if (isPrimitive(parsed)) return parsed as JsonPrimitive
        // Fallback: still return (could be null)
        return parsed as JsonValue
    } catch (e) {
        LOGGER.error(`Failed to parse JSON file: ${absolutePath}`, e)
        return undefined
    }
}
/**
 * GetParentDirectoryPath
 *
 * @param {meta} - Please use import.meta to get the callers file path
 */
export const getFilePath = (meta: ImportMeta, file_path: string): string => {
    const __dirname = path.dirname(fileURLToPath(meta.url))
    if (!fs.existsSync(path.resolve(__dirname)))
        throw new Error(`Directory does not exist: ${path.resolve(__dirname)}`)
    return path.resolve(`${__dirname}/${file_path}`)
}
export default {}

/** TYPEFEST TYPES */
export type {
    Jsonifiable,
    Jsonify,
    LiteralToPrimitive,
    LiteralToPrimitiveDeep,
    LiteralUnion,
    Merge,
    MergeDeep,
    PartialDeep,
    Primitive,
    Simplify,
    SimplifyDeep,
    Stringified,
    ValueOf,
} from 'type-fest'
