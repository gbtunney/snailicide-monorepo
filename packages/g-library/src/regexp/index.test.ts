// @ts-expect-error no definitions
import { format } from 'format'
import { describe, expect, test } from 'vitest'

import { escapeStringRegexp } from './escape.js'
import {
    getRegExpEndOfString,
    getRegExpStartOfString,
} from './stringToRegexp.js'
import { isValidRegExp } from './validators.js'

describe('Regexp', () => {
    test('Regexp namespace: Test', () => {
        expect(getRegExpEndOfString(['svg', 'png']).test('myfile.jpg')).toBe(
            false,
        )

        expect(getRegExpEndOfString(['svg', 'png']).test('myfile.png')).toBe(
            true,
        )

        expect('myfile.svg'.replace(getRegExpEndOfString('svg'), 'png')).toBe(
            'myfile.png',
        )

        expect(
            getRegExpStartOfString(
                ['Gill', 'hill'],
                ['global', 'ignoreCase'],
            ).test('gillian'),
        ).toBe(true)
    })

    test('general : Testing', () => {
        const testcasebk = /^\+0x|^-0x|^0x/
        const badString = '^+0x|^-0x|^0x'
        const goodString = '^+0x|^-0x|^0x'
        const testcasenew = escapeStringRegexp('^+0x|^-0x|^0x')
        //todo: REJOIN THIS !!!
        //   const list = joinRegexList(['0x' ,'^rx'])
        console.log('IS REG VALUD', format(' hi %s jj %s', 'gill', 'var 2'))

        // expect(isValidRegExp(goodString)).toBe(true)
        // expect(isValidRegExp(badString)).toBe(true)
        expect(isValidRegExp(new RegExp(escapeStringRegexp(goodString)))).toBe(
            true,
        )

        try {
            const regExp = new RegExp(goodString)
        } catch (exception) {
            console.log('Regexp parsing error:: ', goodString)
        }
        //  expect(isValidRegExp(new RegExp(badString) )).toBe(false)

        //expect(isValidRegExp(badString)).toBe(true)

        //console.log("ESCAPE REGEXP", new RegExp(escapeStringRegexp('[a-z] [How  much $ for a 🦄?') ).test('a [How  much $ for a 🦄?'))
        //  const newExp =
    })
})

export {}
