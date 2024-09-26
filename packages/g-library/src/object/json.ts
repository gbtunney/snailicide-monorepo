import { GetTagMetadata, Jsonifiable, Tagged } from 'type-fest'

import { isJsonValue } from '../typeguard/json.typeguards.js'
import { Json } from '../types/utility.js'

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

/**
 * Safely serializes a JSON object, with an option for pretty printing.
 * @category Json
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

/** @internal */
export const demoDeserializeJSON = <Type extends JsonOf<unknown>>(
    value: Type,
): GetTagMetadata<Type, 'JSON'> => {
    const json_value = JSON.parse(value)
    return json_value as GetTagMetadata<Type, 'JSON'>
}

/** @internal */
export const demosafeSerializeJson = <Type extends Json.Value>(
    value: Type,
    prettyPrint: boolean = false,
    indentSpaces: number = 4,
): JsonOf<Type> | 'ERROR' => {
    if (isJsonValue<Type>(value)) {
        return prettyPrint
            ? (JSON.stringify(value, undefined, indentSpaces) as JsonOf<Type>)
            : (JSON.stringify(value) as JsonOf<Type>)
    } else {
        console.log(`Error serializing JSON:: ${value}`)
        return 'ERROR' // data as JsonErrorOf<Type>
    }
}

/** @internal */
export const testprettyPrintJSON = <Type extends JsonOf<unknown>>(
    value: Type,
    indentSpaces: number = 4,
): string => {
    const _parsedResult /** To object , restringify */ =
        demoDeserializeJSON<Type>(value)
    return JSON.stringify(
        _parsedResult,
        undefined,
        indentSpaces,
    ) as JsonOf<Type>
}
