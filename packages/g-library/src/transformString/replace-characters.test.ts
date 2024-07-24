import { describe, expect, test } from 'vitest'

import { batchReplaceAll, replaceAllCharacters } from './replace-characters.js'

describe('Replace Characters', () => {
    test('replaceAllCharacters', () => {
        expect(
            replaceAllCharacters({
                pattern: ['!', '_'],
                replacement: '--',
                value: '!!hello_am_a_cat',
            }),
        ).toBe('----hello--am--a--cat')
    })

    test('BATCH replaceAllCharacters', () => {
        expect(
            batchReplaceAll({
                pattern: ['!', '_', ' '],
                replacement: '--',
                value: ['!!hello_am_a_cat', ' g!llian_t '],
            }),
        ).toStrictEqual(['----hello--am--a--cat', '--g--llian--t--'])

        expect(
            batchReplaceAll({
                pattern: '_',
                replacement: '-',
                value: 'bg_red_700',
            }),
        ).toBe('bg-red-700')

        expect(
            batchReplaceAll({
                pattern: ['.', '_'],
                replacement: '-',
                value: ['.bg_red_700'],
            }),
        ).toStrictEqual(['-bg-red-700'])
    })
})
