/**
 * Special CSS color value properties (that are not colors)
 * @group CSS
 */
export type CSSColorSpecial =
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset'
    | 'currentColor'
    | 'transparent'

/**
 * @group CSS
 * @group Typeguard
 * @see {@link isNotCSSColorSpecial}
 */
export const isCSSColorSpecial = <Type = unknown>(
    value: Type | CSSColorSpecial,
): value is CSSColorSpecial =>
    value === 'inherit' ||
    value === 'initial' ||
    value === 'revert' ||
    value === 'unset' ||
    value === 'currentColor' ||
    value === 'transparent'

/**
 * @group CSS
 * @group Typeguard
 * @see {@link isCSSColorSpecial}
 */
export const isNotCSSColorSpecial = <Type = unknown>(
    value: Type | CSSColorSpecial,
): value is Type =>
    !(
        value === 'inherit' ||
        value === 'initial' ||
        value === 'revert' ||
        value === 'unset'
    )

export default isCSSColorSpecial
