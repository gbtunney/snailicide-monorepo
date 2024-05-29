export type BatchBaseValue = {
    value: string | string[]
}
export type BaseValue = {
    value: string
}

export type Pattern = string | RegExp

export type TrimCharacters = {
    trimStart?: boolean ///default is true.
    trimEnd?: boolean ///default is true.
}
export type ReplaceCharacters = {
    replacement: string ///default is empty string
}
