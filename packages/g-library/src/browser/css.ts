/* * CSS COLOR VALUE PROPERTIES * */

export type CSSColorSpecialProp =
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset'
    | 'currentColor'
    | 'transparent'

export const isCSSColorSpecial = <T = unknown>(
    value: T | CSSColorSpecialProp,
): value is CSSColorSpecialProp =>
    value === 'inherit' ||
    value === 'initial' ||
    value === 'revert' ||
    value === 'unset' ||
    value === 'currentColor' ||
    value === 'transparent'

export const isNotCSSColorSpecial = <T = unknown>(
    value: T | CSSColorSpecialProp,
): value is T =>
    !(
        value === 'inherit' ||
        value === 'initial' ||
        value === 'revert' ||
        value === 'unset'
    )

export default isCSSColorSpecial
