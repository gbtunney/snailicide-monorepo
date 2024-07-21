import type { ReadonlyDeep } from 'type-fest'
import fs from 'fs'

interface JSONExportEntry<T = unknown> {
    data: T
    filename: string
}
export type JSONExportConfig = Array<JSONExportEntry>

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
    const success = successMap.find((value: boolean) => {
        return value === true
    })
    return success === true
}
const getJSONString = <T = unknown>(value: T, indentSpaces = 4): string =>
    JSON.stringify(JSON.parse(JSON.stringify(value)), undefined, indentSpaces)

const addFileExtension = (value: string, extension = '.json'): string => {
    const _extension = String(extension).startsWith('.')
        ? extension
        : `.${extension}`
    return String(value).endsWith(`${_extension}`)
        ? value
        : `${value}${extension}`
}

export default {}
