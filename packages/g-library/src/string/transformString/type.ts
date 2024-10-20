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
    /** Default is true. */
    doTrimStart?: boolean
    /** Default is true. */
    doTrimEnd?: boolean
}
/** @internal */
export type ReplaceCharacters = {
    /** Default is is empty string */
    replacement: string
}
