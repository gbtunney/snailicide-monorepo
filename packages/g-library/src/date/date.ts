import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'
import type { LiteralUnion } from 'type-fest'

dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(duration)

/**
 * DURATION date / time
 *
 * @category Format
 */
export const format_date_time_short = 'MM-DD-YYYY, h:mm:ss a'
/**
 * DURATION date / time
 *
 * @category Format
 */
export /** Do -> D (Dayjs) */
const format_date_time_long = 'MMMM D YYYY, h:mm:ss a'

/** Dayjs uses ISO 8601 */
export type ISO_8601 = 'ISO_8601'

/** Format ISO date or custom If format === 'ISO_8601' returns canonical ISO string */
export const formatIsoDate = (
    value: string = dayjs().toISOString(),
    format: LiteralUnion<ISO_8601, string> = format_date_time_short,
): string =>
    isValidIsoDate(value) && format === 'ISO_8601'
        ? dayjs(value).toISOString()
        : dayjs(value).format(format)

/** Strict date validation against a format (customParseFormat strict mode) */
export const isValidDate = (
    value: string,
    format: string = format_date_time_short,
): boolean => {
    // Dayjs strict parse: second param format, third param true
    const parsed = dayjs(value, format, true)
    return parsed.isValid()
}

/** ISO 8601 validation */
export const isValidIsoDate = (value: string): boolean => dayjs(value).isValid()

/**
 * Duration format presets
 *
 * @category Duration
 */
export const format_duration_long = 'HH:mm:ss.SS'
export const format_duration_truncated = 'mm:ss'
export const format_duration_basic = 'mm:ss.SS'

/** Milliseconds to ISO String (UTC) Note: Represents a timestamp at epoch + ms, same as Moment.utc(ms).toISOString() */
export const msToIsoString = (ms_value: number): string =>
    dayjs.utc(ms_value).toISOString()

/** Format an ISO string into a duration-style pattern */
export const formatISOtoDuration = (
    iso_string: string,
    format: string = format_duration_long,
): string => {
    const d = dayjs(iso_string)
    return formatDateLikeDuration(d, format)
}

/** Nanoseconds to milliseconds */
export const nsToMs = (ns_value: number): number => ns_value / 1_000_000

/** High‑res timestamp (ns) to ISO (UTC) */
export const highresTimestamptoISOString = (ns: number): string =>
    msToIsoString(nsToMs(ns))

/** Internal diff helper */
const timestampIsoToDifference = (
    iso_in: string,
    iso_out: string,
    unit: DayjsDiffUnit = 'millisecond',
): number => dayjs(iso_in).diff(dayjs(iso_out), unit)

/** Allowed diff units */
export type DayjsDiffUnit =
    | 'millisecond'
    | 'second'
    | 'minute'
    | 'hour'
    | 'day'
    | 'week'
    | 'month'
    | 'year'

/** Get duration between two high‑res timestamps (ns) in formatted pattern */
export const getTimestampDuration = (
    ns_in: number,
    ns_out: number,
    format: string = format_duration_long,
): string => {
    const diffMs = Math.abs(
        timestampIsoToDifference(
            highresTimestamptoISOString(ns_in),
            highresTimestamptoISOString(ns_out),
            'millisecond',
        ),
    )
    return formatDurationFromMs(diffMs, format)
}

/* -------- Duration Formatting Helpers -------- */

/**
 * Format a millisecond count into your custom patterns (HH:mm:ss.SS, mm:ss, mm:ss.SS) Dayjs duration plugin does not
 * support pattern tokens directly, so we build manually.
 */
export const formatDurationFromMs = (
    ms: number,
    pattern: string = format_duration_long,
): string => {
    const totalSeconds = Math.floor(ms / 1000)
    const milliseconds = ms % 1000
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60
    const hundredths = Math.floor(milliseconds / 10)

    const pad = (value: number, length: number = 2): string =>
        String(value).padStart(length, '0')

    switch (pattern) {
        case format_duration_long:
            return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(hundredths)}`
        case format_duration_basic:
            return `${pad(minutes)}:${pad(seconds)}.${pad(hundredths)}`
        case format_duration_truncated:
            return `${pad(minutes)}:${pad(seconds)}`
        default:
            // Fallback: attempt naive Dayjs format treating ms as timestamp
            return dayjs.utc(ms).format(pattern)
    }
}

/** Format a Dayjs instance like a duration (hours/minutes/seconds/millis) */
const formatDateLikeDuration = (d: dayjs.Dayjs, pattern: string): string => {
    const ms = d.valueOf()
    return formatDurationFromMs(ms, pattern)
}

// Remove default export to satisfy import/no-default-export
// export default formatIsoDate
// Use named export already declared above
