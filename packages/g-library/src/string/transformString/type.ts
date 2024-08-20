export type BatchBaseValue = {
    value: string | Array<string>
}
export type BaseValue = {
    value: string
}

export type Pattern = string | RegExp

export type TrimCharacters = {
    doTrimStart?: boolean ///default is true.
    doTrimEnd?: boolean ///default is true.
}
export type ReplaceCharacters = {
    replacement: string ///default is empty string
}
