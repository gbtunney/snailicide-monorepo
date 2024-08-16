/* * EMPTY TYPES  * */

/** @group Empty Types */
export type EmptyObject = {
    [K in string]: never
}

/** @group Empty Types */
export type EmptyArray = readonly []

/** @group Empty Types */
export type EmptyString = ''

/** @group Empty Types */
export type Falsy = false | 0 | '' | null | undefined | 'Nan'

/** @group Empty Types */
export type NilOrEmpty = EmptyObject | [] | '' | null | undefined

/** @group Empty Types */
export type NilLike = '' | null | undefined //nullish but with empty string

/** @group Empty Types */
export type Nullish = null | undefined
