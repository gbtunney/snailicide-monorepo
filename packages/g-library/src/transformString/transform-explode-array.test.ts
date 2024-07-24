import { describe, expect, test } from 'vitest'

import { transformExplodeArray } from './transform-explode-array.js'

describe('transformExplodeArray', () => {
    test('transformExplodeArray', () => {
        expect(
            transformExplodeArray({
                delimiter: ' ',
                trim: { pattern: ['!', ' ', '.', ','] },
                value: '!!hello_am_a_cat, g!llian_t ',
            }),
        ).toStrictEqual(['hello_am_a_cat', 'g!llian_t'])

        expect(
            transformExplodeArray({
                delimiter: ' ',
                trim: { pattern: [' ', '.'] },
                value: ' .bg-red-500 flex text-white',
            }),
        ).toStrictEqual(['bg-red-500', 'flex', 'text-white'])

        expect(
            transformExplodeArray({
                delimiter: ' ',
                prefix: 'hover:',
                trim: { pattern: [' ', '.'] },
                value: ' .bg-red-500 flex text-white',
            }),
        ).toStrictEqual(['hover:bg-red-500', 'hover:flex', 'hover:text-white'])

        expect(
            transformExplodeArray({
                prefix: 'hover:',
                trim: { pattern: [' ', '.'] },
                value: [' .bg-red-500 ', 'flex', ' text-white'],
            }),
        ).toStrictEqual(['hover:bg-red-500', 'hover:flex', 'hover:text-white'])
    })
})
