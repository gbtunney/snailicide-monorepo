import fs from 'fs'
import type {ReadonlyDeep} from 'type-fest';

interface JSONExportEntry<T = unknown> {
      data: T
     filename: string
}
export type JSONExportConfig = Array<JSONExportEntry>

export const exportJSON = (
    config: JSONExportConfig | ReadonlyDeep<JSONExportConfig>,
    outdir: string | undefined = undefined,
) => {
    config.forEach((entry) => {
        try {
            fs.writeFileSync(
                outdir === undefined
                    ? `./${addFileExtension(entry.filename)}`
                    : `./${outdir}/${addFileExtension(entry.filename)}`,
                getJSONString<typeof entry.data>(entry.data),
            )
        } catch (e) {
            console.error(e)
        }
    })
}
const getJSONString = <T = unknown>(value: T, indentSpaces = 4): string =>
    JSON.stringify(JSON.parse(JSON.stringify(value)), undefined, indentSpaces)

const addFileExtension = (value: string, extension = '.json') => {
    const _extension = String(extension).startsWith('.')
        ? extension
        : `.${extension}`
    return String(value).endsWith(`${_extension}`)
        ? value
        : `${value}${extension}`
}

export default {}
