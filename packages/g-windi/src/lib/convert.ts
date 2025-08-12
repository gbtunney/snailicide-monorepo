import type {
    ColorJSObject,
    CuloriColor,
    CuloriHSL,
    CuloriLab,
    CuloriLch,
    CuloriOKLAB,
    CuloriP3,
    CuloriRGB,
} from './types.js'

export const isCuloriColor = (x: unknown): x is CuloriColor =>
    typeof x === 'object' &&
    x !== null &&
    'mode' in x &&
    typeof (x as { mode: unknown }).mode === 'string'

export const culoriToColorObject = (c: CuloriColor): ColorJSObject => {
    const a = c.alpha ?? 1

    switch (c.mode) {
        case 'oklch': {
            const h = ('h' in c ? c.h : null) ?? null
            return {
                alpha: a,
                coords: [c.l, c.c, h === null ? 0 : h],
                space: 'oklch',
            }
        }
        case 'oklab': {
            return {
                alpha: a,
                coords: [c.l, (c as CuloriOKLAB).a, (c as CuloriOKLAB).b],
                space: 'oklab',
            }
        }
        case 'lab': {
            return {
                alpha: a,
                coords: [c.l, (c as CuloriLab).a, (c as CuloriLab).b],
                space: 'lab',
            }
        }
        case 'lch': {
            const h = ('h' in c ? (c as CuloriLch).h : null) ?? null
            return {
                alpha: a,
                coords: [c.l, (c as CuloriLch).c, h === null ? 0 : h],
                space: 'lch',
            }
        }
        case 'rgb':
        case 'srgb': {
            const { b, g, r } = c as CuloriRGB
            // Culori rgb are 0..1; Color.js srgb expects 0..1 too
            return { alpha: a, coords: [r, g, b], space: 'srgb' }
        }
        case 'hsl': {
            /** S,l are 0..1 in Culori */
            const { h, l, s } = c as CuloriHSL
            return {
                alpha: a,
                coords: [h === undefined ? 0 : h, s, l],
                space: 'hsl',
            }
        }
        case 'p3':
        case 'display-p3': {
            const { b, g, r } = c as CuloriP3
            // Color.js space id is "p3" (alias of display-p3)
            return { alpha: a, coords: [r, g, b], space: 'p3' }
        }
        default: {
            // Last-resort: try feeding Culori’s css() string to Color
            // If you have Culori’s format utility you could use it; otherwise throw:
            throw new Error(`Unsupported Culori mode: ${c.mode}`)
        }
    }
}
