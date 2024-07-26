import { Jsonifiable } from 'type-fest'

import { isJsonValue } from '../typeguard/json.typeguards.js'
import { Json } from '../types/utility.js'

/**
 * PrettyPrint a JSON object.
 *
 * @memberof ObjectUtils
 * @template {T extends Jsonifiable} T
 * @function prettyPrintJSON
 * @param {T} value - A parseable JSON object.
 * @param {int} [indentSpaces=4] - An integer representing the spaces to indent.
 *   Default is `4`
 * @returns {string} - Formatted string.
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

/**
 * Safely serializes a JSON object, with an option for pretty printing.
 *
 * @memberof ObjectUtils
 * @template {T extends Json.Value} T
 * @function safeSerializeJson
 * @param {T} data - The data to serialize.
 * @param {boolean} [prettyPrint=true] - Whether to pretty print the JSON.
 *   Default is `true`
 * @returns {string} - The serialized JSON string or an error message.
 */
export const safeSerializeJson = <Type extends Json.Value>(
    data: Type,
    prettyPrint: boolean = true,
): string =>
    isJsonValue<Type>(data)
        ? prettyPrintJSON(data, prettyPrint ? 4 : 0)
        : /* eslint  @typescript-eslint/restrict-template-expressions:"warn",@typescript-eslint/no-base-to-string:"warn" */
          `Error serializing JSON:: ${data}`

/**
 * Safely deserializes a JSON string.
 *
 * @memberof ObjectUtils
 * @function safeDeserializeJson
 * @param {string} data - The JSON string to deserialize.
 * @returns {Json.Value | undefined} - The deserialized JSON object, or
 *   undefined if deserialization fails.
 */
export const safeDeserializeJson = (data: string): Json.Value | undefined => {
    try {
        const json_value = JSON.parse(data)
        if (isJsonValue<Json.Value>(json_value)) {
            return json_value
        }
    } catch (e) {
        console.error(e)
    }
    return undefined
}
