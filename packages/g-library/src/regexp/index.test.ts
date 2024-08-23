import { describe, expect, test } from 'vitest'
import {
    anyURLDomainExtension,
    anyURLScheme,
    urlDomainExtension,
    urlScheme,
} from './dictionary.js'
import { escapeStringRegexp } from './escape.js'
import {
    getRegExpEndOfString,
    getRegExpStartOfString,
} from './string-to-regexp.js'
import { isValidRegExp } from './validators.js'
describe('Regexp', () => {
    test('Regexp namespace: Test', () => {
        expect(anyURLDomainExtension().test('google.kkkkkk')).toBe(false)
        expect(anyURLDomainExtension().test('google.com')).toBe(true)

        const testURL = 'http://google.com'
        expect(
            anyURLDomainExtension().test(testURL) &&
                anyURLScheme().test(testURL),
        ).toBe(true)
        expect(
            urlDomainExtension(['com', 'net', 'org']).test(testURL) &&
                anyURLScheme().test(testURL),
        ).toBe(true)
        expect(
            urlDomainExtension(['net', 'org']).test(testURL) &&
                anyURLScheme().test(testURL),
        ).toBe(false)

        const testURL2 = 'rdar://1234'
        expect(urlScheme().test(testURL2)).toBe(false)
        expect(urlScheme('rdar').test(testURL2)).toBe(true)

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

        expect(isValidRegExp(new RegExp(escapeStringRegexp(goodString)))).toBe(
            true,
        )
        try {
            const regExp = new RegExp(goodString)
        } catch (exception) {
            console.log('Regexp parsing error:: ', goodString)
        }
    })
})

export {}
