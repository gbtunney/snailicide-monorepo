import { Jsonifiable } from 'type-fest'

import { isJsonValue } from '../typeguard/json.typeguards.js'
import { Json } from '../types/utility.js'

/**
 * PrettyPrint a JSON object.
 *
 * @group Json
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
 * @group Json
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
 * @group Json
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
