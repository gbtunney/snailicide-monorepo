import { describe, expect, test } from 'vitest'
import { trimCharacters } from './_trimCharacters.js'
describe('trimCharacters', () => {
    test('returns `true` trimCharacters', () => {
        expect(trimCharacters({ value: '     -7.5', pattern: ' ' })).toBe(
            '-7.5',
        )
    })
    test('returns `true` trimCharacters', () => {
        expect(
            trimCharacters({ value: '..-7.5', pattern: '..', trimEnd: true }),
        ).toBe('-7.5')
    })
    test('returns `true` trimCharacters', () => {
        expect(
            trimCharacters({
                value: '..-7.5...',
                pattern: '..',
                trimEnd: true,
            }),
        ).toBe('-7.5.')
    })
})
