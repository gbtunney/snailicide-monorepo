import fs from 'fs'
import path from 'path'

import { prettyPrintJSON } from './../object/json.js'
import { Json, Jsonifiable } from './../types/utility.js'
export type JSONExportEntry<
    Type = Json.Value,
    DataType = Type extends Jsonifiable ? Type : never,
> = {
    data: DataType
    filename: string
}

export type JSONExportConfig = Array<JSONExportEntry>

/**
 * Throws error if file save fail
 *
 * @param {'ON' | 'ERROR' | 'WARN'} overwrite - [d="ON"] file overwrite mode if
 *   exists.
 */
export const exportJSONFile = (
    config: JSONExportConfig,
    outdir: string | undefined = undefined,
    overwrite: 'ON' | 'ERROR' | 'WARN' = 'ON',
): void => {
    config.forEach((entry) => {
        const file_name =
            entry.filename.endsWith('.json') || entry.filename.endsWith('json')
                ? entry.filename
                : `${entry.filename}.json`
        const file_path = outdir
            ? path.resolve(outdir, file_name)
            : path.resolve(file_name)

        const writeFile = (path: string = file_path): void => {
            fs.writeFileSync(path, prettyPrintJSON(entry.data))
        }
        if (overwrite === 'ON') {
            writeFile() ///write the file return success.
        } else if (!fs.existsSync(file_path)) {
            //is set to warn or error, but no file exists.
            writeFile() ///write the file return success.
        } else if (overwrite === 'WARN' || fs.existsSync(file_path)) {
            console.warn('FILE PATH ALREADY EXCISTS::: ', file_path, entry)
            writeFile() ///write the file return success.
        } else if (overwrite === 'ERROR' || fs.existsSync(file_path)) {
            console.error(
                `Cannot write ${file_path}, file already excists`,
                file_path,
                entry,
            )
            ////throw eror??'
            throw new Error(`Cannot write ${file_path}, file already excists`)
        }
    })
}
