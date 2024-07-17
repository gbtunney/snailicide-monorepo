import { describe, expect, test } from 'vitest'

import { isValidColor } from './index.js'

describe('chroma.ts', () => {
    test('validate color function', () => {
        expect(isValidColor('palegrjeen')).toBe(false)
        expect(isValidColor('palegreen')).toBe(true)
        expect(isValidColor('#ff0000')).toBe(true)
        expect(isValidColor([33, 222, 50])).toBe(true)
        expect(isValidColor('FFFFFFFF')).toBe(true)
        expect(isValidColor('SJWJKWK')).toBe(false)
        expect(isValidColor(0xff0000)).toBe(true)
        expect(isValidColor((0xff0000).toString())).toBe(true)
    })
})

export {}
