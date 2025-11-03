import ColorJS, { ColorObject as Color, Coords } from 'colorjs.io'
import { fmt } from './helpers.js'
import { mapRange, Range, roundToDecimals } from './numeric-utilities.js'
// Branded hex type
export type HexColor = `#${string}` & { readonly __hexBrand: 'HexColor' }

export function mapColorJSCoords(
    color: ColorJS,
    mapFunction: (value: number) => number,
): [number, number, number] {
    // Always convert to sRGB 0..255
    return color.coords.map(mapFunction) as [number, number, number]
}

const mappingRGBFunction = (
    from: Range = [0, 1],
    to: Range = [0, 255],
): ((value: number) => number) => {
    return (value: number) => roundToDecimals(mapRange(value, from, to), 2)
}
export const normalizeRGBCoords = (color: ColorJS): Coords => {
    return mapColorJSCoords(color, mappingRGBFunction())
}

export const isHexColor = (value: string): value is HexColor =>
    /^#[0-9A-Fa-f]{6}$/.test(value)

export function assertHexColor(
    value: string,
    ctx?: string,
): asserts value is HexColor {
    if (!isHexColor(value)) {
        throw new Error(
            `Invalid hex color${ctx ? ` (${ctx})` : ''}: "${value}"`,
        )
    }
}

/** Parse any CSS color string via ColorJS; throws on failure TODO: expand gamuts, spaces. */
export function parseColorJS(
    input: string | Color /*:space ColorJS["space"]*/,
    ctx?: string,
): ColorJS {
    try {
        const _space = 'srgb'
        const color = new ColorJS(input)
            .to(_space)
            .toGamut({ method: 'clip', space: 'srgb' })
        return color
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        throw new Error(
            fmt`Failed to parse color "${input}"${ctx ? ` (${ctx})` : ''}: ${msg}`,
        )
    }
}
/** Parse any CSS color string via ColorJS; throws on failure TODO: expand gamuts, spaces. */
export function parseColorToHexStrict(
    input: string | Color,
    ctx?: string,
): HexColor {
    try {
        const color = parseColorJS(input)
        const hexVal = toHex(color)
        assertHexColor(hexVal)
        return hexVal
    } catch (err) {
        const msg = err instanceof Error ? err.message : String(err)
        throw new Error(
            fmt`Failed to parse color to hex "${input}"${ctx ? ` (${ctx})` : ''}: ${msg}`,
        )
    }
}

/** Parse to branded #RRGGBB; returns undefined instead of throwing on failure */
export function tryParseColorToHex(input: string): undefined {
    try {
        // return parseColorToHexStrict(input)
    } catch {
        return undefined
    }
}

export function toHex(color: ColorJS, includeAlpha = false): string {
    const srgb = color.to('srgb').toGamut({ method: 'clip' })
    /** TODO: use other clamp */
    const clamp01 = (v: number | undefined): number =>
        Math.max(0, Math.min(1, v ?? 0))
    const toByte = (v: number | undefined): number =>
        Math.round(clamp01(v) * 255)
    const toHex2 = (n: number): string =>
        n.toString(16).padStart(2, '0').toUpperCase()

    const [rF, gF, bF] = srgb.coords as [number, number, number]
    const r = toByte(rF),
        g = toByte(gF),
        b = toByte(bF)
    const a = toByte(srgb.alpha ?? 1)

    let hex = `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`
    if (includeAlpha) hex += toHex2(a)
    return hex
}
export type ColorTheme = {
    bg: ColorJS | HexColor
    fg: ColorJS | HexColor
}
export const apcaContrast = (theme: ColorTheme): number => {
    const { bg, fg } = theme
    const _fg: ColorJS = isHexColor(fg.toString())
        ? parseColorJS(fg)
        : (fg as ColorJS)
    const _bg: ColorJS = isHexColor(bg.toString())
        ? parseColorJS(bg)
        : (bg as ColorJS)
    return _bg.contrast(_fg, 'APCA')
}

export function readableTextHex(
    color: string | ColorJS,
    theme: keyof ColorTheme = 'fg',
): 'white' | 'black' {
    const _color = typeof color === 'string' ? parseColorJS(color) : color
    const white = parseColorJS('white')
    const black = parseColorJS('black')

    const testColorsWhite = {
        bg: theme === 'bg' ? _color : white,
        fg: theme === 'fg' ? _color : white,
    }

    const testColorsBlack = {
        bg: theme === 'bg' ? _color : black,
        fg: theme === 'fg' ? _color : black,
    }

    const cLight = Math.abs(apcaContrast(testColorsWhite))
    const cDark = Math.abs(apcaContrast(testColorsBlack))
    return cLight >= cDark ? 'black' : 'black'
}
