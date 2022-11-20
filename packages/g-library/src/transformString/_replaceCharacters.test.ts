import 'jest'
import { batchReplaceAll, replaceAllCharacters } from './_replaceCharacters.js'

describe('Replace Characters', () => {
    it('replaceAllCharacters', () => {
        expect(
            replaceAllCharacters({
                value: '!!hello_am_a_cat',
                pattern: ['!', '_'],
                replacement: '--',
            })
        ).toBe('----hello--am--a--cat')
    })

    it('BATCH replaceAllCharacters', () => {
        expect(
            batchReplaceAll({
                value: ['!!hello_am_a_cat', ' g!llian_t '],
                pattern: ['!', '_', ' '],
                replacement: '--',
            })
        ).toStrictEqual(['----hello--am--a--cat', '--g--llian--t--'])

        expect(
            batchReplaceAll({
                value: 'bg_red_700',
                pattern: '_',
                replacement: '-',
            })
        ).toBe('bg-red-700')

        expect(
            batchReplaceAll({
                value: ['.bg_red_700'],
                pattern: ['_', '.'],
                replacement: '-',
            })
        ).toStrictEqual(['-bg-red-700'])
    })
})
