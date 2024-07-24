import { describe, expect, test } from 'vitest'

import { trimCharacters } from './trim-characters.js'
describe('trimCharacters', () => {
    test('returns `true` trimCharacters', () => {
        expect(trimCharacters({ pattern: ' ', value: '     -7.5' })).toBe(
            '-7.5',
        )
        expect(
            trimCharacters({ doTrimEnd: true, pattern: '..', value: '..-7.5' }),
        ).toBe('-7.5')

        expect(
            trimCharacters({
                doTrimEnd: true,
                pattern: '..',
                value: '..-7.5...',
            }),
        ).toBe('-7.5.')
    })
})
