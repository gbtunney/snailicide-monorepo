import { isNotUndefined, isPlainObject as RAisPlainObject } from "ramda-adjunct"
import type {
    JsonArray,
    Jsonifiable,
    JsonObject,
    JsonValue,
    ReadonlyDeep,
    UnknownRecord,
} from "type-fest"

import fs from "fs"

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
            fs.writeFileSync(
                outdir === undefined
                    ? `./${addFileExtension(entry.filename)}`
                    : `./${outdir}/${addFileExtension(entry.filename)}`,
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

const addFileExtension = (value: string, extension = ".json"): string => {
    const _extension = String(extension).startsWith(".")
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
} from "type-fest"
