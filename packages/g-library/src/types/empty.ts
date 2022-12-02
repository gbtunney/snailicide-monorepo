/* * EMPTY TYPES  * */

/** @typedef {EmptyObject} THIS IS A TEST */
export type EmptyObject = {
    [K in string]: never
}

/* * EmptyArray * */
export type EmptyArray = {
    [K in number]: never
}

/* * @type EmptyArray * */
export type EmptyString = ''

/* * @type Falsy * */
export type Falsy = false | 0 | '' | null | undefined | 'Nan'

export type NilOrEmpty = EmptyObject | [] | '' | null | undefined

export type NilLike = '' | null | undefined //nullish but with empty string

export type Nullish = null | undefined
