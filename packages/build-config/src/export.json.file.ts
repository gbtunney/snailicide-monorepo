/** TODO: Move this file BACK TO g-LIBRARY someday */
import {
    JsonArray,
    Jsonifiable,
    JsonObject,
    JsonPrimitive,
    JsonValue,
} from 'type-fest'
import fs from 'fs'
import path from 'path'
export namespace Json {
    export type Object = JsonObject
    export type Array = JsonArray
    export type Primitive = JsonPrimitive
    export type Value = Exclude<JsonValue, null>
}

/**
 * PrettyPrint a JSON object.
 * @category Json
 */
export const prettyPrintJSON = <Type extends Jsonifiable>(
    value: Type,
    indentSpaces = 4,
): string => {
    return JSON.stringify(
        JSON.parse(JSON.stringify(value)),
        undefined,
        indentSpaces,
    )
}

export type JSONExportEntry<
    Type = Json.Value,
    DataType = Type extends Jsonifiable ? Type : never,
> = {
    data: DataType
    filename: string
}

export type JSONExportConfig = Array<JSONExportEntry>

/** Throws error if file save fails */
export const exportJSONFile = (
    config: JSONExportConfig,
    outdir: string | undefined = undefined,
    /** File overwrite mode if exists */
    overwrite: boolean = true,
    logData: boolean = false,
): boolean => {
    const result_status = config.reduce<Record<string, true | string>>(
        (acc, entry: JSONExportEntry) => {
            let success: true | string = true
            const file_name =
                entry.filename.endsWith('.json') ||
                entry.filename.endsWith('json')
                    ? entry.filename
                    : `${entry.filename}.json`
            const file_path = outdir
                ? path.resolve(outdir, file_name)
                : path.resolve(file_name)

            const writeFile = (path: string = file_path): void => {
                fs.writeFileSync(path, prettyPrintJSON(entry.data))
            }
            const logObject = logData
                ? `\n${prettyPrintJSON(entry.data, 12)}`
                : ''

            /** Write file regardless */
            if (overwrite) {
                writeFile() ///write the file return success.
                console.log(
                    `Writing file to (${fs.existsSync(file_path) ? 'existing' : 'empty'}) path: ${file_path}`,
                    logObject,
                )
            }
            //** if the FILE DOES NOT EXIST ALREADY, then write. */
            else if (!overwrite && !fs.existsSync(file_path)) {
                /* is set to warn or error, write the file if no file ALREADY exists. */
                writeFile()
                console.log(
                    `Writing file to (empty) path: ${file_path}`,
                    logObject,
                )
            } //**  FILE ALREADY EXISTS, THROW ERROR */
            else if (!overwrite && fs.existsSync(file_path)) {
                const errorMessage = `FILE WRITE ERROR: ${file_path}, file already exists`
                console.error(errorMessage, logObject)
                success = errorMessage
            } else {
                const errorMessage = `UNKNOWN ERROR: write to ${fs.existsSync(file_path) ? 'EXISTING' : 'EMPTY'} path ${file_path} failed`
                console.error(errorMessage, logObject)
                success = errorMessage
            }
            return {
                ...acc,
                [file_path]: success,
            }
        },
        {},
    )

    /* log status object */
    if (logData)
        console.log(
            'Status::::\n',
            prettyPrintJSON(Object.values(result_status)),
        )

    const success = Array.from(Object.entries(result_status)).reduce<boolean>(
        (status, [key, value]) =>
            !status ? false : value !== true ? false : true,
        true,
    )
    if (!success) throw new Error(prettyPrintJSON(Object.values(result_status)))

    return success
}
