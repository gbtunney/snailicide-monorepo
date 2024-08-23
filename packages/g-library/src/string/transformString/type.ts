/** @internal */
export type BatchBaseValue = {
    value: string | Array<string>
}
/** @internal */
export type BaseValue = {
    value: string
}
/** @internal */
export type Pattern = string | RegExp

/** @internal */
export type TrimCharacters = {
    doTrimStart?: boolean ///default is true.
    doTrimEnd?: boolean ///default is true.
}
/** @internal */
export type ReplaceCharacters = {
    replacement: string ///default is empty string
}
