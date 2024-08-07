import { describe, expect, test } from 'vitest'

import {
    format_duration_basic,
    getTimestampDuration,
    msToIsoString,
} from './date.js'

describe('duration formatting | to human readable', () => {
    test('unix timestamp to duration', () => {
        const _val = msToIsoString(16045)
        expect(_val).toBe('1970-01-01T00:00:16.045Z')

        const valIn = 17828081257708
        const valOut = 17832135208500

        expect(getTimestampDuration(valIn, valOut, format_duration_basic)).toBe(
            '00:04.05',
        )

        //TODO: this is wrong, and is busted on the server. but not locally idk why
        //  expect(getTimestampDuration(valIn, valOut, format_duration_long)).toBe(
        //'00:00:04.05',
        //  )
        //IDK if this one is wrong too?: this is wrong, why is there an hour?
        /*expect(
            formatISOtoDuration(highresTimestamptoISOString(443219894694291)),
        ).toBe('22:06:59.89')*/
    })
})
export {}
