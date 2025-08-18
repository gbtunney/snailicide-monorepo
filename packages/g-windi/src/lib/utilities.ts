import chalk from 'chalk'

import { inRange } from 'ramda-adjunct'
import {
    RANGE_DEGREE,
    RANGE_FLOAT,
    RANGE_PERCENT,
    RANGE_SCALE,
    ROUND_DECIMALS_DEFAULT,
} from './constants.js'
import { findOptimalPairMeta } from './contrast.js'
import { toColorHex, validateOklchColorJS } from './core.js'
import type {
    ColorJSInstance,
    Range,
    RangeType,
    ValidOklchColor,
} from './types.js'

export const printSwatchWithChalk = (
    text: string,
    bg_color: ValidOklchColor,
    fg_color: ValidOklchColor | undefined = undefined,
    dim: string | undefined = undefined,
    _log: boolean = true,
    options?: { verbose?: boolean },
): string => {
    /* Force truecolor mode */
    chalk.level = 3
    let textColor: ValidOklchColor
    try {
        /* Pick contrasting foreground if not provided */
        textColor =
            fg_color ??
            findOptimalPairMeta(bg_color, {
                verbose: options?.verbose ?? false,
            }).result.fg_color
    } catch (e) {
        if (options?.verbose) {
            console.log(
                'unable to find a contrast pair for ',
                toColorHex(bg_color),
            )
        }
        textColor = validateOklchColorJS('white')
    }

    const bgHex = toColorHex(bg_color)
    const fgHex = toColorHex(textColor)

    const block = chalk.bgHex(bgHex).hex(fgHex)(` ${text} `)
    const info = dim ? chalk.dim(dim) : ''
    const blockRev = chalk.bgHex(fgHex).hex(bgHex)(` ${text} `)

    const output = `${block} ${info} ${text}`

    if (_log) console.log(output)
    return output
}

export const clampInRange = (value: number, range: Range): number => {
    const { max, min } = range
    return Math.min(Math.max(value, min), max)
}

export const wrapInRange = (value: number, range: Range): number => {
    const { max, min } = range
    const width = max - min

    if (width <= 0) {
        throw new Error(
            `Invalid range: max (${max}) must be greater than min (${min})`,
        )
    }

    return ((((value - min) % width) + width) % width) + min
}

export const isInRange = (value: number, range: Range): boolean =>
    inRange(range.min, range.max, value)

export const mapRange = (
    value: number,
    input: Range = { max: 1, min: 0 },
    output: Range = { max: 1, min: -1 },
): number => {
    return (
        ((value - input.min) * (output.max - output.min)) /
            (input.max - input.min) +
        output.min
    )
}

export const getRange = <Omittedkeys extends RangeType | false = false>(
    key: RangeType<Omittedkeys>,
): Range => {
    return key === 'float'
        ? RANGE_FLOAT
        : key === 'deg'
          ? RANGE_DEGREE
          : key === 'percent'
            ? RANGE_PERCENT
            : key === 'scale'
              ? RANGE_SCALE
              : RANGE_FLOAT
}
const iii = getRange<'float'>('scale')
export const hasCss5OrVars = (str: string): boolean =>
    /\bfrom\b/i.test(str) || /\bvar\s*\(/i.test(str)

/** Rounds a number to the specified number of decimal places. */
export const roundToDecimals = (
    value: number,
    decimals: number = ROUND_DECIMALS_DEFAULT,
): number => {
    if (!Number.isFinite(value)) return value // avoid NaN/Infinity issues
    if (decimals <= 0) return Math.round(value)
    const factor = 10 ** decimals
    return Math.round(value * factor) / factor
}
export const roundOklchColorJS = (
    color: ColorJSInstance,
    round: boolean | number = false,
) => {
    const _decimal: number =
        round === false ? 0 : round === true ? ROUND_DECIMALS_DEFAULT : round
    return roundColor(color, _decimal)
}

/** NOTE: just use the buiild in presicion function in toStrng!!! */
export function roundColor(
    color: ColorJSInstance,
    decimals: number = 2,
): ColorJSInstance {
    const factor = 10 ** decimals
    const space = color.space
    /** Get the keys of the coords object */
    const coordKeys = Object.keys(space.coords)
    const newCoords = color.coords.map((val, idx) => {
        // if (typeof val !== 'number') return val;
        const key = coordKeys[idx]
        if (!key) {
            throw new Error(`Invalid coordinate index: ${idx}`)
        }

        /** Access metadata using the key */
        const coordMeta = space.coords[key]

        const min: number =
            coordMeta?.refRange?.[0] !== undefined ? coordMeta.refRange[0] : 0
        const max: number =
            coordMeta?.refRange?.[1] !== undefined ? coordMeta.refRange[1] : 1
        if (!coordMeta) {
            console.warn(
                `Missing metadata for coordinate at index ${idx}:`,
                key,
            )
            return val // Return the original value if metadata is missing
        }
        console.log('Coordinate metadata:', factor, val, coordMeta)
        // Clamp the value to the valid range
        const clampedValue = clampInRange(val, { max, min })
        //TODO: thiis was for percentages, but i dont think itts neeeded.
        // const _factor = ( clampedValue < 1 && clampedValue>0 && minRange ===0 && maxRange === 1) ?  1000 ** decimals : factor
        const _factor = factor
        const rounded = Math.round(clampedValue * _factor) / _factor
        return rounded
    })

    if (newCoords.length !== coordKeys.length) {
        throw new Error(
            `Invalid number of coordinates: expected ${coordKeys.length}, got ${newCoords.length}`,
        )
    }
    console.log('NEW COORDINATES', newCoords)

    return color
        .clone()
        .setAll(color.spaceId, newCoords as [number, number, number])
}
