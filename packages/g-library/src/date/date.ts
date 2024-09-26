import type { MomentBuiltinFormat, unitOfTime } from 'moment'
import moment from 'moment'

import type { LiteralUnion } from 'type-fest'

/**
 * DURATION date / time
 * @category Format
 */
export const format_date_time_short = `MM-DD-YYYY, h:mm:ss a`
/**
 * DURATION date / time
 * @category Format
 */
export const format_date_time_long = 'MMMM Do YYYY, h:mm:ss a'

/** Moment uses ISO 8601 */
export type ISO_8601 = 'ISO_8601'

/**
 * Date input ISO 8601 format or leave empty for current
 * @category Format
 */
export const formatIsoDate = (
    value: string = moment().toISOString(),
    format: LiteralUnion<ISO_8601, string> = format_date_time_short,
): string =>
    isValidIsoDate(value) && format === 'ISO_8601'
        ? moment(value).toISOString()
        : moment(value).format(format)

/** @category Validators */
export const isValidDate = (
    value: string,
    format: MomentBuiltinFormat | string = format_date_time_short,
): boolean => moment(value, format, true).isValid()

/** @category Validators */
export const isValidIsoDate = (value: string): boolean =>
    isValidDate(value, moment.ISO_8601)

/**
 * DURATION Presets
 * @category Duration
 * @category Format
 */
export const format_duration_long = 'HH:mm:ss.SS'
/**
 * DURATION Presets
 * @category Duration
 * @category Format
 */
export const format_duration_truncated = 'mm:ss'
/**
 * DURATION Presets
 * @category Duration
 * @category Format
 */
export /** Because otherwise the hour is busted? */
const format_duration_basic = 'mm:ss.SS'

/**
 * Milliseconds to ISO String
 * @category Duration
 */
export const msToIsoString = (ms_value: number): string =>
    moment.utc(ms_value).toISOString()

/** @category Duration */
export const formatISOtoDuration = (
    iso_string: string,
    format: string = format_duration_long,
): string => moment(iso_string).format(format)

/**
 * HIGH RES TIMESTAMP STUFF convert nano seconds to milliseconds (1,000,000 nanoseconds/millisecond.)
 * @category Duration
 */
export const nsToMs = (ns_value: number): number => ns_value / 1000000
//TODO: LITERALLY NO IDEA WHY THIS MILLISECOND FUNCTION IS BUSTED ;; it says 53ms = 4 sec
// moment.utc(ns_value / 1000000).milliseconds() ///.format('HH:mm:ss.SS')

/** @category Duration */
export const highresTimestamptoISOString = (ns: number): string => {
    return msToIsoString(nsToMs(ns))
}
const timestampIsoToDifference = (
    iso_in: string,
    iso_out: string,
    unit: unitOfTime.Diff = 'millisecond',
): number => moment(iso_in).diff(iso_out, unit)

/** @category Duration */
export const getTimestampDuration = (
    ns_in: number,
    ns_out: number,
    format: string = format_duration_long,
): string =>
    formatISOtoDuration(
        msToIsoString(
            Math.abs(
                timestampIsoToDifference(
                    highresTimestamptoISOString(ns_in),
                    highresTimestamptoISOString(ns_out),
                ),
            ),
        ),
        format,
    )

export default formatIsoDate
