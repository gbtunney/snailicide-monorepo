/* * CSS COLOR VALUE PROPERTIES * */

export type CSSColorSpecialProp =
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset'
    | 'currentColor'
    | 'transparent'

export const isCSSColorSpecial = <Type = unknown>(
    value: Type | CSSColorSpecialProp,
): value is CSSColorSpecialProp =>
    value === 'inherit' ||
    value === 'initial' ||
    value === 'revert' ||
    value === 'unset' ||
    value === 'currentColor' ||
    value === 'transparent'

export const isNotCSSColorSpecial = <Type = unknown>(
    value: Type | CSSColorSpecialProp,
): value is Type =>
    !(
        value === 'inherit' ||
        value === 'initial' ||
        value === 'revert' ||
        value === 'unset'
    )

export default isCSSColorSpecial
