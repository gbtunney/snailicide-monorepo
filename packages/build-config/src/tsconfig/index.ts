import { Jsonify, JsonObject, SetRequired, TsConfigJson } from 'type-fest'
import { compilerOptions } from './compiler-options.js'

export const tsConfig = (
    _tsconfig: SetRequired<TsConfigJson, 'compilerOptions'>,
): JsonObject => {
    const parsedConfig: Jsonify<SetRequired<TsConfigJson, 'compilerOptions'>> =
        JSON.parse(JSON.stringify(_tsconfig))
    return parsedConfig
}
export const tsConfigBase: JsonObject = tsConfig({
    compilerOptions,
})
