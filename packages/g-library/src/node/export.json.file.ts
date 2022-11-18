import fs from 'fs'
import path from 'path'
import { getJSONString, Jsonifiable, JSON } from './../object/json.js'

type JSONExportEntry<T = JSON.Value, V = T extends Jsonifiable ? T : never> = {
    data: V
    filename: string
}

export type JSONExportConfig = JSONExportEntry[]

/**
 * ExportJSON
 *
 * @param {JSONExportConfig} config - Configuration array
 * @param {string | undefined} outdir - Outdir [d=undefined]
 * @param {'ON' | 'ERROR' | 'WARN'} overwrite - [d="ON"] file overwrite mode if
 *   excists.
 * @returns {void}
 */
export const exportJSONFile = <T extends Jsonifiable>(
    config: JSONExportConfig,
    outdir: string | undefined = undefined,
    overwrite: 'ON' | 'ERROR' | 'WARN' = 'ON'
): void => {
    config.forEach((entry) => {
        const file_name =
            entry.filename.endsWith('.json') || entry.filename.endsWith('json')
                ? entry.filename
                : `${entry.filename}.json`
        const file_path = outdir
            ? path.resolve(outdir, file_name)
            : path.resolve(file_name)

        const writeFile = (path: string = file_path) => {
            fs.writeFileSync(path, getJSONString(entry.data))
        }
        if (overwrite === 'ON') {
            writeFile() ///write the file return success.
        } else if (!fs.existsSync(file_path)) {
            //is set to warn or error, but no file excists.
            writeFile() ///write the file return success.
        } else if (overwrite === 'WARN' || fs.existsSync(file_path)) {
            console.warn('FILE PATH ALREADY EXCISTS::: ', file_path, entry)
            writeFile() ///write the file return success.
        } else if (overwrite === 'ERROR' || fs.existsSync(file_path)) {
            console.error(
                `Cannot write ${file_path}, file already excists`,
                file_path,
                entry
            )
            ////throw eror??'
            throw new Error(`Cannot write ${file_path}, file already excists`)
        }
    })
}
