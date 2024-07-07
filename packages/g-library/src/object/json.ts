import { Jsonifiable } from 'type-fest'
import { Json } from '../types/utility.js'
import { isJsonValue } from '../typeguard/json.typeguards.js'

/**
 * PrettyPrint a JSON object
 *
 * @param {T extends JsonArray|JsonObject} value - A parseable JSON object
 * @param {int} indentSpaces - (default 4) An integer representing the spaces to
 *   indent
 * @returns {string} - Formatted string
 */
export const prettyPrintJSON = <T extends Jsonifiable>(
    value: T,
    indentSpaces = 4,
): string => {
    return JSON.stringify(
        JSON.parse(JSON.stringify(value)),
        undefined,
        indentSpaces,
    )
}

export const safeSerializeJson = <T extends Json.Value>(
    data: T,
    prettyPrint: boolean = true,
): string =>
    isJsonValue<T>(data)
        ? prettyPrintJSON(data, prettyPrint === true ? 4 : 0)
        : `Error serializing JSON:: ${data}`

export const safeDeserializeJson = (data: string): Json.Value | undefined => {
    try {
        const json_value = JSON.parse(data)
        //   if (isJsonValue(json_value)) return json_value
    } catch (e) {
        console.error(e)
    }
    return undefined
}
