import {SetRequired,TsConfigJson} from 'type-fest'
import {compilerOptions} from "./compiler-options.js";

export const tsConfigBase:SetRequired<TsConfigJson, "compilerOptions"> = {
    compilerOptions
}
