import { Jsonifiable, Tagged } from 'type-fest'

import { z } from 'zod'
import { isJsonifiable, isJsonValue } from '../typeguard/json.typeguards.js'
import { Json } from '../types/utility.js'

//TODO: integrate with stringified stuff
type THeValue = z.infer<ReturnType<typeof z.json>>
/**
 * PrettyPrint a JSON object.
 *
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

/**
 * Safely serializes a JSON object, with an option for pretty printing.
 *
 * @category Json
 */
export const safeSerializeJson = <Type extends Jsonifiable>(
    data: Type,
    prettyPrint: boolean = true,
): string =>
    isJsonifiable<Type>(data)
        ? prettyPrintJSON<Type>(data, prettyPrint ? 4 : 0)
        : /* eslint  @typescript-eslint/restrict-template-expressions:"warn",@typescript-eslint/no-base-to-string:"warn" */
          `Error serializing JSON:: ${data}`

/**
 * Safely deserializes a JSON string.
 *
 * @category Json
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
//todo: finish these functions
export type JsonOf<Type> = Tagged<string, 'JSON', Type>
