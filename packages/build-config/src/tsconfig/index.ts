import { JsonObject, SetRequired, TsConfigJson } from 'type-fest'
import { compilerOptions } from './compiler-options.js'
import { safeDeserializeJSON } from '../utilities.js'

export const tsConfig = (
    _tsconfig: SetRequired<TsConfigJson, 'compilerOptions'>,
): JsonObject => {
    const __value: JsonObject | undefined = safeDeserializeJSON(_tsconfig)
    if (__value !== undefined) return __value
    return {}
}
export const tsConfigBase: JsonObject = tsConfig({
    compilerOptions,
})
