import type {
    JsonArray,
    Jsonifiable,
    JsonObject,
    ReadonlyDeep,
} from 'type-fest'
import fs from 'fs'

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

const addFileExtension = (value: string, extension = '.json'): string => {
    const _extension = String(extension).startsWith('.')
        ? extension
        : `.${extension}`
    return String(value).endsWith(_extension) ? value : `${value}${extension}`
}

export default {}
