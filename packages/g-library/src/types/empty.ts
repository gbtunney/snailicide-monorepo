/* * EMPTY TYPES  * */
export type EmptyObject = {
    [K in string]: never
}
export type EmptyArray = {
    [K in number]: never
}
export type EmptyString = ''

export type Falsy = false | 0 | '' | null | undefined | 'Nan'

export type NilOrEmpty = EmptyObject | [] | '' | null | undefined

export type NilLike = '' | null | undefined //nullish but with empty string

export type Nullish = null | undefined
