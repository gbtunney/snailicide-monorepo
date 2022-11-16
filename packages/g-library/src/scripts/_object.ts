import R from 'ramda'
import type { PlainObject } from './../_types/utilities/index'

export const mergeOptions = function (
    base_options: PlainObject = {},
    override_options: PlainObject = {},
    remove_false = true
) {
    const relevant_override_options = R.pick(
        Array.from(Object.keys(base_options)),
        override_options
    )
    const merged_options = {
        ...base_options,
        ...relevant_override_options,
    }
    const result = !remove_false
        ? R.filter((n) => n !== false, merged_options)
        : merged_options
    return result
}
