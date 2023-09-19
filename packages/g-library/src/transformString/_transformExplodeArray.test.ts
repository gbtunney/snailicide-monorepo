import { transformExplodeArray } from './_transformExplodeArray.js'

describe('transformExplodeArray', () => {
    it('transformExplodeArray', () => {
        expect(
            transformExplodeArray({
                value: '!!hello_am_a_cat, g!llian_t ',
                trim: { pattern: ['!', ' ', '.'] },
            }),
        ).toStrictEqual(['hello_am_a_cat', 'g!llian_t'])

        expect(
            transformExplodeArray({
                value: ' .bg-red-500 flex text-white',
                trim: { pattern: [' ', '.'] },
                delimiter: ' ',
            }),
        ).toStrictEqual(['bg-red-500', 'flex', 'text-white'])

        expect(
            transformExplodeArray({
                value: ' .bg-red-500 flex text-white',
                trim: { pattern: [' ', '.'] },
                delimiter: ' ',
                prefix: 'hover:',
            }),
        ).toStrictEqual(['hover:bg-red-500', 'hover:flex', 'hover:text-white'])

        expect(
            transformExplodeArray({
                value: [' .bg-red-500 ', 'flex', ' text-white'],
                trim: { pattern: [' ', '.'] },
                prefix: 'hover:',
            }),
        ).toStrictEqual(['hover:bg-red-500', 'hover:flex', 'hover:text-white'])
    })
})
