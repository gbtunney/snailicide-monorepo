/** @group Empty Types */
import type {
    UnknownArray,
    UnknownRecord,
    EmptyObject,
    NonEmptyString,
} from 'type-fest'

export type { EmptyObject } from 'type-fest'

/* * EMPTY TYPES  * */
/** @group Empty Types */
export type EmptyArray = readonly []
/** @group Empty Types */
export type EmptyString = ''

/** @group Empty Types */
export type Falsy = false | 0 | EmptyString | null | undefined | 'Nan'

/** @group Empty Types */
export type Nullish = null | undefined

/** @group Empty Types */
export type NilOrEmpty = EmptyObject | EmptyArray | EmptyString | Nullish

/** @group Empty Types */
export type NilLike = EmptyString | Nullish //nullish but with empty string
