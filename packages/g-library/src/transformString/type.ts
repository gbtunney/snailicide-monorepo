export interface TransformCharacters {
    value: string
    pattern: string | RegExp | (string | RegExp)[] //default is " "
}

export interface TrimCharacters extends TransformCharacters {
    trimStart?: boolean ///default is true.
    trimEnd?: boolean ///default is true.
}

export interface ReplaceCharacters extends TransformCharacters {
    replacement: string ///default is empty string
}

//narrow the pattern to
export type TransformSinglePattern<T = TrimCharacters> = Omit<
    T extends TransformCharacters ? T : never,
    'pattern'
> & {
    pattern: string | RegExp
}

export type TransformBatch<T = TrimCharacters> = Omit<
    T extends TransformCharacters ? T : never,
    'value'
> & {
    value: string | string[]
}

export interface ExplodeArray
    extends Omit<TransformBatch<TransformCharacters>, 'pattern'> {
    delimiter?: string | RegExp | undefined /// split delimiter. - default is ","
    prefix?: string | undefined //appended to the start of string
    trim?: Omit<TransformBatch<TrimCharacters>, 'value'> //SetOptional<TrimCharacters,'value'>
}

export type TrimSinglePatternCharacters = TransformSinglePattern<TrimCharacters>
export type ReplaceSinglePatternCharacters =
    TransformSinglePattern<ReplaceCharacters>
