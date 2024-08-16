/**
 * Special CSS color value properties (that are not colors)
 *
 * @category CSS
 */
export type CSSColorSpecial =
    | 'inherit'
    | 'initial'
    | 'revert'
    | 'unset'
    | 'currentColor'
    | 'transparent'

/**
 * @category CSS
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
 * @category CSS
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
