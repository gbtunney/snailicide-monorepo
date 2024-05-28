import type { MomentBuiltinFormat, unitOfTime } from 'moment'
import moment from 'moment'

/** Moment uses ISO 8601 */
export const format_date_time_short = `MM-DD-YYYY, h:mm:ss a`
export const format_date_time_long = 'MMMM Do YYYY, h:mm:ss a'

export type ISO_8601 = 'ISO_8601'

/** Date input ISO 8601 format or leave empty for current */
export const formatIsoDate = (
    value: string = moment().toISOString(),
    format: ISO_8601 | string = format_date_time_short,
) =>
    isValidIsoDate(value) && format === 'ISO_8601'
        ? moment(value).toISOString()
        : moment(value).format(format)

/** DATE VALIDATORS */
export const isValidDate = (
    value: string,
    format: MomentBuiltinFormat | string = format_date_time_short,
) => moment(value, format, true).isValid()

export const isValidIsoDate = (value: string) =>
    isValidDate(value, moment.ISO_8601)

/** DURATION STUFF */
export const format_duration_long = 'HH:mm:ss.SS'
export const format_duration_truncated = 'mm:ss'

/** Milliseconds to ISO String */
export const msToIsoString = (ms_value: number): string =>
    moment.utc(ms_value).toISOString()

export const formatISOtoDuration = (
    iso_string: string,
    format: string = format_duration_long,
): string => moment(iso_string).format(format)

/** HIGH RES TIMESTAMP STUFF */

/** 1,000,000 nanoseconds/millisecond. */
export const ns_to_ms = (ns_value: number): number =>
    moment.utc(ns_value / 1000000).milliseconds() ///.format('HH:mm:ss.SS')

export const highresTimestamptoISOString = (ns: number): string => {
    return msToIsoString(ns_to_ms(ns))
}
const timestampIsoToDifference = (
    ns_in: string,
    ns_out: string,
    unit: unitOfTime.Diff = 'millisecond',
): number => moment(ns_in).diff(ns_out, unit)

export const getTimestampDuration = (
    ns_in: number,
    ns_out: number,
    format: string = format_duration_long,
) =>
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
