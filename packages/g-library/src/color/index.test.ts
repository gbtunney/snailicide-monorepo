import { describe, expect, test } from 'vitest'
import { Chroma, isChromaColor, validate } from './index.js'

describe('chroma.ts | validate', () => {
    test('validate function', () => {
        expect(validate('palegrjeen')).toBe(false)
        expect(validate('palegreen')).toBe(true)

        if (isChromaColor('red')) {
            const color = Chroma.color('red').hex()
            expect(Chroma.color('red').hex()).toBe('#ff0000')
        }
    })
})
export {}
