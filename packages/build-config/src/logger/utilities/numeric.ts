import { fmt } from './../pretty.print.js'
// ==============================
// File: src/lib/units.ts
// ==============================
//export type Range = { min: number; max: number };
export type Range = [number, number]
//export const rangePercent: Range = { min: 0, max: 1 };
//export const rangeFloat100: Range = { min: 0, max: 100 };
//export const rangeDegrees: Range = { min: 0, max: 360 };
export const RANGE_PERCENT: Range = [0, 100]
export const RANGE_FLOAT: Range = [0, 1]
export const RANGE_RGB: Range = [0, 255]
export const RANGE_DEGREES: Range = [0, 360]

export const mapRange = (
    value: number,
    [fromMin, fromMax]: Range,
    [toMin, toMax]: Range,
): number => {
    const t = (value - fromMin) / (fromMax - fromMin)
    return toMin + t * (toMax - toMin)
}
export function wrapRange(value: number, [min, max]: Range): number {
    const span = max - min
    if (span <= 0)
        throw new Error(fmt`Invalid range: max(${max}) <= min(${min})`)
    return ((((value - min) % span) + span) % span) + min
}

export function clampRange(value: number, [min, max]: Range): number {
    return Math.min(max, Math.max(min, value))
}
export const roundToDecimals = (
    value: number,
    decimals: number,
    func: (value: number) => number = Math.round,
): number => {
    if (!Number.isFinite(value)) return value // avoid NaN/Infinity issues
    if (decimals <= 0) return func(value)
    const factor = 10 ** decimals
    return Math.round(value * factor) / factor
}
export const roundToDecimalsNoCarry = (
    value: number,
    decimals: number,
): number => roundToDecimals(value, decimals, Math.trunc)
