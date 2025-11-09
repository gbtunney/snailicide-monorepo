import chalk, {
    BackgroundColorName,
    ChalkInstance,
    type ColorName,
    colorNames,
    type ForegroundColorName,
    type ModifierName,
    modifierNames,
} from 'chalk'
import {
    type ColorJS,
    HexColor,
    parseColorJS,
    parseColorToHexStrict,
    readableTextHex,
} from './color.js'
import { lowerCaseFirstLetter, upperCaseFirstLetter } from './string.js'

export type ChalkForegroundColor = ForegroundColorName
export type ChalkBackgroundColor = BackgroundColorName
export type ChalkColorPreset = ColorName
export type ChalkColor = ChalkColorPreset | HexColor // LoggerRecord< ChalkInstance|ChalkColor|HexColor>

/** Replace the guard to use Chalk's canonical list */
export const isChalkColorPreset = (
    value: string,
): value is ChalkColorPreset => {
    return (colorNames as ReadonlyArray<string>).includes(value)
}

/** Throwing assertion */
export function assertChalkColorPreset(
    value: string,
    ctx?: string,
): asserts value is ChalkColorPreset {
    if (!isChalkColorPreset(value)) {
        throw new Error(
            `Invalid Chalk color${ctx ? ` (${ctx})` : ''}: "${value}"`,
        )
    }
}

/** Returns true if the color is a background color */
export const isBackground = (value: ChalkColorPreset): boolean => {
    return value.startsWith('bg')
}

/** Returns true if the color is a foreground color */
export const isForeground = (value: ChalkColorPreset): boolean => {
    return !value.startsWith('bg')
}

/** Returns true if the color is bright */
export function isBright(value: ChalkColorPreset): boolean {
    return value.endsWith('Bright')
}

/** BgRed -> red (lowercase first letter after bg) */
const stripBg = (color: string): string =>
    color.startsWith('bg') ? color.slice(2) : color
/** Red|redBright -> bgRed|bgRedBright (capitalize first letter, keep rest) */
const addBg = (color: string): string => `bg${upperCaseFirstLetter(color)}`

/** Converts any color to bright form */

export const toBright = (
    color: ChalkColorPreset,
    strip = false,
): ChalkColorPreset => {
    if (strip) {
        const next = color.replace(/Bright$/, '')
        assertChalkColorPreset(next, 'toBright(strip)')
        return next
    }
    const next = color.endsWith('Bright') ? color : `${color}Bright`
    assertChalkColorPreset(next, 'toBright')
    return next
}

export const stripBright = (color: ChalkColorPreset): ChalkColorPreset =>
    toBright(color, true)

/** Converts any color to its foreground variant (strips bg + optional Bright) */
export function toForeground(
    color: ChalkColorPreset,
    removeBright = false,
): ChalkColorPreset {
    const _color: string = lowerCaseFirstLetter(
        isBackground(color) ? stripBg(color) : color,
    )
    assertChalkColorPreset(_color, 'toForeground')
    return removeBright ? stripBright(_color) : _color
}

/** Converts any color to its background variant (adds bg + preserves/removes Bright) */
export function toBackground(
    color: ChalkColorPreset,
    removeBright = false,
): ChalkColorPreset {
    // normalize to foreground base first
    const _color: string = addBg(
        lowerCaseFirstLetter(isBackground(color) ? stripBg(color) : color),
    )
    assertChalkColorPreset(_color, 'toBackground')
    return removeBright ? stripBright(_color) : _color
}

/** Inverts a foreground ↔ background color, preserving brightness */
export const invertChalkColor = (color: ChalkColorPreset): ChalkColorPreset =>
    isBackground(color) ? toForeground(color) : toBackground(color)

/** Toggles the bright suffix on/off */
export const toggleBright = (color: ChalkColorPreset): ChalkColorPreset =>
    isBright(color) ? stripBright(color) : toBright(color)

/** WIP */
const getModifiers = (): Record<ModifierName, ChalkInstance> => {
    const inner = modifierNames.map<[ModifierName, ChalkInstance]>(
        (key: ModifierName): [ModifierName, ChalkInstance] => {
            return [key, chalk[key]]
        },
    )
    return Object.fromEntries<ChalkInstance>(inner) as Record<
        ModifierName,
        ChalkInstance
    >
}

export const toChalkColorPresetInstance = (
    value: ChalkColorPreset,
): ChalkInstance => {
    if (isChalkColorPreset(value) && chalk[value]) {
        return chalk[value]
    }
    throw new Error(`Invalid Chalk color preset: ${value}`)
}
/** This converts a chalk color to hex so it can be used in browser */
export const chalkPresetToHex = (color: ChalkColorPreset): HexColor => {
    const _processValue = stripBright(toForeground(color))
    return parseColorToHexStrict(_processValue)
}

export const chalkPresetToColorJS = (color: ChalkColorPreset): ColorJS => {
    const _processValue = stripBright(toForeground(color))
    return parseColorJS(_processValue)
}
export const wrapColorChalkInstanceText = (
    value: string,
    color: ChalkColor,
    theme: 'fg' | 'bg' = 'fg',
): string => {
    const _chalkInstance = getColorChalkInstance(color, theme)
    return _chalkInstance(value)
    throw new Error('Invalid logger configuration')
}

export const getColorChalkInstance = (
    color: ChalkColor,
    theme: 'bg' | 'fg' = 'fg',
): ChalkInstance => {
    if (isChalkColorPreset(color)) {
        assertChalkColorPreset(color)
        const chalkColor: ChalkColor = color
        const _chalkColor =
            theme === 'bg' ? toBackground(chalkColor) : toForeground(chalkColor)
        // : invertChalkColor(chalkColor)

        const readableColor = readableTextHex(stripBright(color), theme)
        const _resultContrast: ChalkColorPreset =
            theme === 'bg'
                ? toForeground(readableColor)
                : toBackground(readableColor)

        return toChalkColorPresetInstance(_chalkColor)
    } else {
        /** ChalkToHex(color) */
        const hexColor: string = parseColorToHexStrict(color).toString()

        /* TODO: reenable contrast color calc */
        const _resultContrast: ChalkColorPreset =
            theme === 'bg'
                ? toForeground(readableTextHex(color, theme))
                : toBackground(readableTextHex(color, theme))

        return theme === 'fg' ? chalk.hex(hexColor) : chalk.bgHex(hexColor)
    }
    throw new Error('Invalid logger configuration')
}
