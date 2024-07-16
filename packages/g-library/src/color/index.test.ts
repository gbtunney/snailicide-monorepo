import { describe, expect, test } from 'vitest'

import { isValidColor } from './index.js'

describe('chroma.ts | validate', () => {
    test('validate function', () => {
        expect(isValidColor('palegrjeen')).toBe(false)
        expect(isValidColor('palegreen')).toBe(true)
        expect(isValidColor((0xff0000).toString())).toBe(true)

        console.log(
            'jkjkjkjkjjk',
            typeof 0xff0000,
            (0xff0000).toString(),
            // "color"  , i('ffff00')
        )

        // if (isChromaColor('red')) {
        //   const color = Chroma.color('red').hex()
        //  expect(Chroma.color('red').hex()).toBe('#ff0000')
        //  }
    })
})

export {}
