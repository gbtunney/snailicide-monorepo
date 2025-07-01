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
import path from 'path'

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

//sh,html,json,yaml,yml,graphql,md

/*
export type JSONExportEntry<Type extends Jsonifiable = JsonArray | JsonObject> =
    {
        data: Type
        filename: string
    }
export type JSONExportConfig<
    Type extends Jsonifiable = JsonArray | JsonObject,
> = Array<JSONExportEntry<Type>>

export const exportJSON = (
    config: ReadonlyDeep<JSONExportConfig> | JSONExportConfig,
    outdir: string | undefined = undefined,
): boolean => {
    const successMap: Array<boolean> = Array.from(config).map((entry) => {
        try {

          //  TODO:FIX
            fs.writeFileSync(
                outdir === undefined
                    ? `${addFileExtension(entry.filename)}`
                    : `${outdir}/${addFileExtension(entry.filename)}`,
                getJSONString<typeof entry.data>(entry.data),
            )
            return true
        } catch (e) {
            console.error(e)
        }
        return false
    })
    const hasSuccess = successMap.find((value: boolean) => {
        return value
    })
    return hasSuccess === true
}
const getJSONString = <Type = unknown>(value: Type, indentSpaces = 4): string =>
    JSON.stringify(JSON.parse(JSON.stringify(value)), undefined, indentSpaces)
*/

const addFileExtension = (value: string, extension = '.json'): string => {
    const _extension = String(extension).startsWith('.')
        ? extension
        : `.${extension}`
    return String(value).endsWith(_extension) ? value : `${value}${extension}`
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

export const safeDeserializeJSON = <Type = UnknownRecord>(
    data: any,
): JSONCompatible<Type> | undefined => {
    try {
        const str: string = JSON.stringify(data)
        const obj: JSONCompatible<Type> = JSON.parse(str)
        return obj
    } catch (e) {
        return undefined
    }
}
export const importJSON = async (
    filename: string,
    returnValue: unknown = undefined,
): Promise<undefined | JsonPrimitive | JsonArray | JsonObject> => {
    const _path = path.resolve(filename)
    if (!fs.existsSync(_path)) {
        console.warn(`File not found: ${_path}`)
        return undefined
    }
    const json: JsonObject = await import(_path, {
        assert: { type: 'json' },
    })
    if (isArray(json['default'])) {
        return json['default'] as JsonArray
    }
    if (RAisPlainObject(json['default'])) {
        return json['default'] as JsonObject
    }
    if (isPrimitive(json['default'])) {
        return json['default'] as JsonPrimitive
    }
    return undefined
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
